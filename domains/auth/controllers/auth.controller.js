import getExpirationInSeconds from '../../../common/utils/expireTime';
import * as AuthService from '../services/auth.service';

export async function userSingUp(req, res) {
  const bodyData = req.body;
  console.log(bodyData);
  const createdUser = await AuthService.signUpUser(bodyData);
  res.status(201).json(createdUser);
}

export async function userSingIn(req, res) {
  const bodyData = req.body;
  const {accessToken, certifiedUser} = await AuthService.signInUser(bodyData);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    // secure: true, // https 연결에만 쿠키가 전송되는 옵션
    maxAge: getExpirationInSeconds(process.env.JWT_ACCESS_TOKEN_EXPIRATION) * 1000 // 밀리초 단위여서
  })
  res.status(200).json(certifiedUser);
}

export async function NewAccessTokenGenerate(req, res) {
  const headerData = req.headers
  const newAccessToken = await AuthService.generateNewAccessToken(headerData);
  res.status(200).json(newAccessToken);
}