import { GiftModel } from 'src/app/shared/model/gift.model';
import { Action } from '@ngrx/store';

export enum GiftActionsEnum {
    GetGiftsDetails = '[Gift] Get Gifts',
    GetGiftsDetailsSuccess = '[Gift] Get Gifts Success',
    GetSearchedGiftDetails = '[Gift]  Searched Gift',
    GetReceivedGiftDetails = '[Gift] Get Received Gift Success',
}

export class GetGiftsDetails implements Action {
    public readonly type = GiftActionsEnum.GetGiftsDetails;
}

export class GetGiftsDetailsSuccess implements Action {
    public readonly type = GiftActionsEnum.GetGiftsDetailsSuccess;
    constructor(public payload: GiftModel[]) { }
}

export class GetSearchedGiftDetails implements Action {
    public readonly type = GiftActionsEnum.GetSearchedGiftDetails;
    constructor(public payload: string) { }
}

export class GetReceivedGiftDetails implements Action {
    public readonly type = GiftActionsEnum.GetReceivedGiftDetails;
}

// export class GetGiftDetailsSuccess implements Action {
//     public readonly type = GiftActionsEnum.GetGiftDetailsSuccess;
//     constructor(public payload: GiftModel) { }
// }

export type GiftActions = GetGiftsDetails | GetGiftsDetailsSuccess | GetSearchedGiftDetails | GetReceivedGiftDetails;
