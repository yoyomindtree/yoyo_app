export class UserModel {
  constructor(
    public userId: string,
    public userName: string,
    public passWord: string,
    public role: string,
    public refId: string,
    public balence: IBalance,
  ) {}
}
export interface IBalance {
  forRedeem: number;
  forSending: number;
}
