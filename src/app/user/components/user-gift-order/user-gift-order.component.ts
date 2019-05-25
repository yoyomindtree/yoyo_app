import { MatDialogConfig, MatDialog } from '@angular/material';
import { GiftModel } from 'src/app/shared/model/gift.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UserFeedbackComponent } from '../user-feedback/user-feedback.component';

@Component({
  selector: 'app-user-gift-order',
  templateUrl: './user-gift-order.component.html',
  styleUrls: ['./user-gift-order.component.css'],
})
export class UserGiftOrderComponent implements OnInit, OnDestroy {
  public gift: GiftModel;
  private subscription: Subscription;
  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.pipe(map((data: any) => data.gift[0])).subscribe((res) => {
      this.gift = res;
    });
  }

  ngOnInit() {}

  public addFeedback(): void {
    // console.log('');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      giftId: this.gift.giftId,
    };
    // method for opening the dialog
    const dialogRef = this.dialog.open(UserFeedbackComponent, dialogConfig);
    this.subscription = dialogRef.afterClosed().subscribe((result) => {});
  }

  public ngOnDestroy(): void {
    // unsubscription
    this.subscription.unsubscribe();
  }
}
