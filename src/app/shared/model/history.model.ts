export class HistoryModel {
  constructor(
    public transId: string,
    public senderEmail: string,
    public reciverEmail: string,
    public giftId: string,
    public transTime: string,
    public reedemed: boolean,
    public giftName: string,
    public description: string,
    public giftCode: string,
    public rating: number,
    public category: string,
    public vendor: string
  ) {}
}
