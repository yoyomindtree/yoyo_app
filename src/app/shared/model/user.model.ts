export class UserModel {
  constructor(
    public userId: string,
    public userName: string,
    public password: string,
    public role: string,
    public refId: string,
    public balance: IBalance,
    public token: string,
  ) {}
}
export interface IBalance {
  forRedeem: number;
  forSending: number;
}
