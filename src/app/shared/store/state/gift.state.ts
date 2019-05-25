import { GiftModel } from 'src/app/shared/model/gift.model';
/**
 * Define application state
 */
export class GiftState {
    public gifts: GiftModel[];
  constructor(gifts: GiftModel[]) {
    this.gifts = gifts;
  }
}

export const initialGiftState = new GiftState([]);
