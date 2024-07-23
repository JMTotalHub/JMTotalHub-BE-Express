import * as AuthService from '../services/auth.service';

export async function userSingUp(req, res) {
  const bodyData = req.body;
  const createdUser = await AuthService.signUpUser(bodyData);
  res.status(201).json(createdUser);
}

export async function userSingIn(req, res) {
  const bodyData = req.body;
  const certifiedUser = await AuthService.signInUser(bodyData);
  res.status(200).json(certifiedUser);
}

export async function NewAccessTokenGenerate(req, res) {
  const headerData = req.headers
  const newAccessToken = await AuthService.generateNewAccessToken(headerData);
  res.status(200).json(newAccessToken);
}