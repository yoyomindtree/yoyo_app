import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { GiftModel } from 'src/app/shared/model/gift.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UserFeedbackComponent } from '../user-feedback/user-feedback.component';
import { ReviewModel } from 'src/app/shared/model/review.model';
import { UserMailComponent } from '../user-mail/user-mail.component';

@Component({
  selector: 'app-user-gift-order',
  templateUrl: './user-gift-order.component.html',
  styleUrls: ['./user-gift-order.component.css'],
})
export class UserGiftOrderComponent implements OnInit, OnDestroy {
  // gets or sets the gift model
  public gift: GiftModel;
  // property subscription used for cleanup.
  private subscription: Subscription;
  // quantity
  public quantity = 1;
  // gets or sets the reviews list.
  public reviewList: ReviewModel[];
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
  ) {
    this.activatedRoute.data.pipe(map((data: any) => data.gift[0])).subscribe((res) => {
      this.gift = res;
    });
  }

  ngOnInit() {
    this.getGiftReviews();
  }
  // method will get called after clciking on the + icon
  public addFeedback(): void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '350px';
    dialogConfig.width = '500px';
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      giftId: this.gift.giftId,
    };
    // method for opening the dialog
    const dialogRef = this.dialog.open(UserFeedbackComponent, dialogConfig);
    this.subscription = dialogRef.afterClosed().subscribe((result) => {});
  }
  /**
   * method to get the reviews of the gift
   */
  private getGiftReviews() {
    this.subscription = this.firebaseService.getGiftReviews(this.gift.giftId).subscribe((data) => {
      this.reviewList = data;
    });
  }
  /**
   * method to send mail
   */
  public sendMail(): void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '350px';
    dialogConfig.width = '500px';
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      giftId: this.gift,
    };
    const dialogRef = this.dialog.open(UserMailComponent, dialogConfig);
    this.subscription = dialogRef.afterClosed().subscribe((result) => {});
  }

  public ngOnDestroy(): void {
    // unsubscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
