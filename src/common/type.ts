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

export interface OrangzeParam {
  Type: number,
  OrgName: string,
  PageNum: number,
  PageSize: number,
   ChainMode: string
} 