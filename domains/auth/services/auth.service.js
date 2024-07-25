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
    process.env.JWT_SECRET_KEY, 
    {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
  });

  // prettier-ignore
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email }, 
    process.env.JWT_SECRET_KEY, 
    {expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,}
  );

  await redisClient.set(
    `refreshToken:${user.id}`,
    refreshToken,
    'EX',
    getExpirationInSeconds(process.env.JWT_REFRESH_TOKEN_EXPIRATION)
  );

  return {
    accessToken,
    user: {
      email: user.email,
      roleType: user.roleType,
    },
  };
}

export async function generateNewAccessToken(headerData) {
  let oldAccessToken = null;
  let oldPayload = null;

  try {
    // oldAccessToken = headerData['authorization'].split(' ')[1];
    // oldAccessToken = req.cookies['accessToken'];
    // console.log('oldAccessToken : ', oldAccessToken);
    console.log(req.headers.cookie);
  } catch (error) {
    throw new Error('Old Access token not found: ' + error.name);
  }

  try {
    jwt.verify(oldAccessToken, process.env.JWT_SECRET_KEY);
  } catch (error) {
    if (error.name == 'TokenExpiredError') {
      oldPayload = jwt.decode(oldAccessToken);
    } else {
      throw new Error('Invalid Access Token: ' + error.name);
    }
  }

  if (oldPayload == null) return;

  const refreshToken = await redisClient.get(`refreshToken:${oldPayload.id}`);

  if (!refreshToken) {
    throw new Error('Refresh token not found');
  }

  try {
    jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
  } catch (error) {
    throw new Error('Invalid refresh token: ' + error.name);
  }

  const newAccessToken = jwt.sign(
    { id: oldPayload.id, email: oldPayload.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION }
  );

  return newAccessToken;
}
