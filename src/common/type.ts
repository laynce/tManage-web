export interface useResponse {
  UserId: number;
  UserName: string;
  Token: string;
}

export type LoginParams = {
  UserName: string,
  Password: string
  Captcha: string
}