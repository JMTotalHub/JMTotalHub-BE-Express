import * as AuthService from '../services/auth.service';

export async function userSingUp(req, res) {
  const bodyData = req.body;
  console.log(bodyData);
  const createdUser = await AuthService.signUpUser(bodyData);
  res.status(201).json(createdUser);
}

export async function userSingIn(req, res) {
  const bodyData = req.body;
  const { accessToken, certifiedUser } = await AuthService.signInUser(bodyData);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
  });
  res.status(200).json(certifiedUser);
}

export async function NewAccessTokenGenerate(req, res) {
  const headerData = req.headers;
  const newAccessToken = await AuthService.generateNewAccessToken(headerData);

  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
  });
  res.status(200).json('새로운 토큰 생성');
}
