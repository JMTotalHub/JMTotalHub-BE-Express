import * as AuthRepository from '../repositories/auth.repository'

import bcrypt from 'bcryptjs'

export async function signUpUser(bodyData) {

    // 비밀번호 해쉬화 (복잡도 10~12이 권고)
    const { password } = bodyData;
    const hashedPassword = await bcrypt.hash(password, 10);
    bodyData.password = hashedPassword;

    return await AuthRepository.insertUser(bodyData);
}

export async function signInUser(bodyData) {

    // 비밀번호 해쉬화 (복잡도 10~12이 권고)
    const { email, password } = bodyData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = AuthRepository.findUserByEmail(email);

    bodyData.password = hashedPassword;

    return await AuthRepository.findUserByEmail(email);
}