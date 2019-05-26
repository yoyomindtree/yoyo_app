import { GetSearchedGiftDetails, GetReceivedGiftDetails } from './../actions/gift.actions';
import { GiftsService } from './../../../gift/services/gifts.service';
import { GiftModel } from 'src/app/shared/model/gift.model';
import { GiftActionsEnum, GetGiftsDetails, GetGiftsDetailsSuccess } from '../actions/gift.actions';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../state/app.state';
import { selectGiftList } from '../selectors/gift.selector';

@Injectable()
export class GiftEffects {

    @Effect()
    getGifts$ = this._actions$.pipe(
        ofType<GetGiftsDetails>(GiftActionsEnum.GetGiftsDetails),
        switchMap(() => this._giftsService.getAllGifts()
        .pipe(
            map(gifts => new GetGiftsDetailsSuccess(gifts)))
    ));

    @Effect()
    getSeachedGifts$ = this._actions$.pipe(
        ofType<GetSearchedGiftDetails>(GiftActionsEnum.GetSearchedGiftDetails),
        switchMap((action) => this._giftsService.getSearchedGifts(action.payload)
        .pipe(
            map(gifts => new GetGiftsDetailsSuccess(gifts)))
    ));

    @Effect()
    getReceivedGifts$ = this._actions$.pipe(
        ofType<GetReceivedGiftDetails>(GiftActionsEnum.GetReceivedGiftDetails),
        switchMap(() => this._giftsService.getAllRecievedGifts()
        .pipe(
            map(gifts => new GetGiftsDetailsSuccess(gifts)))
    ));

    constructor(
        private _giftsService: GiftsService,
        private _actions$: Actions,
        private _store: Store<AppState>
    ) { }
}
