export class ReviewModel {
  constructor(
    public giftId: string,
    public userName: string,
    public comment: string,
    public rating: number,
    public reviewTime: string,
    public displayName: string,
  ) {}
}
