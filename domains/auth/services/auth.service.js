import * as AuthRepository from '../repositories/auth.repository';

import redisClient from '../../../common/utils/redisClient';
import getExpirationInSeconds from '../../../common/utils/expireTime';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function signUpUser(bodyData) {
  const { password } = bodyData;
  const hashedPassword = await bcrypt.hash(password, 10);
  bodyData.password = hashedPassword;

  return await AuthRepository.insertUser(bodyData);
}

export async function signInUser(bodyData) {
  const { email, password } = bodyData;

  const user = await AuthRepository.findUserByEmail(email);
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // expiresIn 기준 https://github.com/vercel/ms

  // prettier-ignore
  const accessToken = jwt.sign(
    { id: user.id, email: user.email }, 
    process.env.JWT_SECRET, 
    {expiresIn: process.env.JWT_EXPIRATION,
  });

  // prettier-ignore
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email }, 
    process.env.JWT_SECRET, 
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,}
  );

  await redisClient.set(
    `refreshToken:${user.id}`,
    refreshToken,
    'EX',
    getExpirationInSeconds(process.env.REFRESH_TOKEN_EXPIRATION)
  );

  return {
    accessToken,
    user: {
      email: user.email,
      roleType: user.roleType,
    },
  };
}
