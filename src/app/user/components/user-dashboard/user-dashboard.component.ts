import {
  GetGiftsDetails,
  GetSearchedGiftDetails,
  GetReceivedGiftDetails,
} from './../../../shared/store/actions/gift.actions';
import { GetGiftsDetailsSuccess } from '../../../shared/store/actions/gift.actions';
import { AppState } from './../../../shared/store/state/app.state';
import { GiftModel } from './../../../shared/model/gift.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Store, select } from '@ngrx/store';
import { selectGiftList } from 'src/app/shared/store/selectors/gift.selector';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  public gifts$ = this._store.pipe(select(selectGiftList));
  public giftsForSending: GiftModel[];
  constructor(private firebaseService: FirebaseService, private _store: Store<AppState>) {}

  ngOnInit() {
    this.getGifts();
  }

  /**
   * method to get the gifts.
   */
  public getGifts(): void {
    this._store.dispatch(new GetGiftsDetails());
  }

  /**
   * method to get the gifts.
   */
  public onToggle(key: string): void {
    if (key === 'R') {
      this._store.dispatch(new GetReceivedGiftDetails());
    } else {
      this._store.dispatch(new GetGiftsDetails());
    }
  }
  public onUserSelect(): void {}

  // public onClickActivateSend() {

  // }
  // public onClickActivateReceived() {

  // }
}
