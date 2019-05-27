import { GiftActionsEnum, GiftActions } from '../actions/gift.actions';
import { initialGiftState, GiftState } from '../state/gift.state';

export function giftReducers(state = initialGiftState, action: GiftActions): GiftState {
  switch (action.type) {
    case GiftActionsEnum.GetGiftsDetailsSuccess: {
      return {
        ...state,
        gifts: action.payload,
      };
    }
    // case GiftActionsEnum.GetGiftDetailsSuccess: {
    //   return {
    //     ...state,
    //     selectedGift: action.payload
    //   };
    // }

    default:
      return state;
  }
}
