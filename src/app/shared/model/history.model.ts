import { UserModel } from './user.model';
import { GiftModel } from './gift.model';
export class HistoryModel {
  constructor(
    public transId: string,
    public senderEmail: string,
    public reciverEmail: string,
    public transTime: string,
    public reedemed: boolean,
    public giftCode: string,
    public gift: GiftModel,
    public user: UserModel,
    public totalPoints: number,
  ) {}
}
