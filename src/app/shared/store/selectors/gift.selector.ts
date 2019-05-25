import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { GiftState } from '../state/gift.state';

const selectGifts = (state: AppState) => state.gifts;

export const selectGiftList = createSelector(
    selectGifts,
  (state: GiftState) => state.gifts
);
