export class GiftModel {
  constructor(
    public giftId: string,
    public name: string,
    public description: string,
    public rating: string,
    public points: number,
    public quantity: number,
    public vendor: string,
    public category: string,
    public frequency: number,
    public discount: number,
    public imagePath: string,
  ) {}
}
