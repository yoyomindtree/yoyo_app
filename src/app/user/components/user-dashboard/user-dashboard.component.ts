import { GiftModel } from './../../../shared/model/gift.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  public giftsForSending: GiftModel[];
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.getGifts();
  }
  /**
   * method to get the gifts.
   */
  public getGifts(): void {
    this.firebaseService
      .getAllGifts()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data: GiftModel[]) => {
        this.giftsForSending = data;
      });
  }
  public onUserSelect(): void {}

  public onClickActivateSend() {
    
  }
  public onClickActivateReceived() {

  }
}
