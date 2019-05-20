export class HistoryModel {
  constructor(
    public transId: string,
    public senderEmail: string,
    public reciverEmail: string,
    public giftId: string,
    public transTime: string,
  ) {}
}
