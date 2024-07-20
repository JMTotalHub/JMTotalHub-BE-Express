import * as AuthRepository from '../repositories/auth.repository';

import bcrypt from 'bcryptjs';

export async function signUpUser(bodyData) {
  // ��й�ȣ �ؽ�ȭ (���⵵ 10~12�� �ǰ�)
  const { password } = bodyData;
  const hashedPassword = await bcrypt.hash(password, 10);
  bodyData.password = hashedPassword;

  return await AuthRepository.insertUser(bodyData);
}

export async function signInUser(bodyData) {
  // ��й�ȣ �ؽ�ȭ (���⵵ 10~12�� �ǰ�)
  const { email, password } = bodyData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = AuthRepository.findUserByEmail(email);

  bodyData.password = hashedPassword;

  return await AuthRepository.findUserByEmail(email);
}
