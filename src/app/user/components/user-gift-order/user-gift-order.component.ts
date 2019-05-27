import { UserModel } from './../../../shared/model/user.model';
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
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

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
  // gets or sets the formcontrol.
  public copies = new FormControl();
  // gets or sets the gift send form.
  public giftSendForm: FormGroup;
  // gets or sets the user value
  public user: UserModel;
  // gets or sets the user entered value
  public points: number;
  // boolean value
  public sendmail = false;
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {
    this.activatedRoute.data.pipe(map((data: any) => data.gift[0])).subscribe((res) => {
      this.gift = res;
    });
    this.giftSendForm = formBuilder.group({
      copies: ['', [Validators.required, Validators.min(1), this.validateCopies.bind(this)]],
    });
  }

  ngOnInit() {
    this.getGiftReviews();

    this.subscription = this.giftSendForm.get('copies').valueChanges.subscribe((formValue) => {
      this.points = formValue;
    });
    this.firebaseService.getSingleUser(sessionStorage.getItem('email')).subscribe((userdeatil) => {
      this.user = userdeatil;
    });
  }
  // method will get called after clciking on the + icon
  public addFeedback(): void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
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
    this.spinner.show();
    this.subscription = this.firebaseService.getGiftReviews(this.gift.giftId).subscribe(
      (data) => {
        this.reviewList = data;
        this.spinner.hide();
      },
      (err) => this.spinner.hide(),
    );
  }
  /**
   * method will get called once user submits the form
   *
   */
  public onSubmit() {}
  /**
   * method to send mail
   */
  public sendMail(): void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      gift: this.gift,
      user: this.user[0],
      copies: this.giftSendForm.get('copies').value,
    };
    const dialogRef = this.dialog.open(UserMailComponent, dialogConfig);
    this.subscription = dialogRef.afterClosed().subscribe((result) => {});
  }
  public validateCopies(control: FormControl): { [s: string]: boolean } {
    if (!this.user) {
      return null;
    }
    if (this.points * this.gift.points > this.user[0].balance.forSending) {
      return { isSmaller: true };
    } else {
      return null;
    }
  }

  public ngOnDestroy(): void {
    // unsubscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
