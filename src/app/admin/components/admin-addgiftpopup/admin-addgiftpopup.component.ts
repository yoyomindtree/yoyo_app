import { AdminFireService } from './../../services/admin-fire.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GiftModel } from 'src/app/shared/model/gift.model';
@Component({
  selector: 'app-admin-addgiftpopup',
  templateUrl: './admin-addgiftpopup.component.html',
  styleUrls: ['./admin-addgiftpopup.component.css'],
})
export class AdminAddgiftpopupComponent implements OnInit, OnDestroy {
  // property subscription
  subscription: Subscription;
  // property points
  public points: number;

  /**
   * Form builder
   */
  giftForm = this.formBuilder.group({
    giftName: ['', [Validators.required]],
    discription: ['', [Validators.required]],
    category: ['', [Validators.required]],
    vendor: ['', [Validators.required]],
    points: ['', [Validators.required]],
    discount: ['', [Validators.required, Validators.min(0), this.validateDiscount.bind(this)]],
    quantity: ['', [Validators.min(1), Validators.required]],
    imagePath: ['', [Validators.required]],
  });
  constructor(
    public dialogRef: MatDialogRef<AdminAddgiftpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private adminFireSerive: AdminFireService,
  ) {}

  ngOnInit() {
    // subscription to get the property whenever the input point filed will change.
    this.subscription = this.giftForm.get('points').valueChanges.subscribe((formValue) => {
      this.points = formValue;
    });
  }
  ngOnDestroy(): void {
    // unsubscription.
    this.subscription.unsubscribe();
  }
  /**
   * Method will get called once admin submits form
   */
  onSubmit() {
    //const gift = new GiftModel();
  }
  /**
   *
   * @param control -FormControl
   * Custome validator method
   */
  validateDiscount(control: FormControl): { [s: string]: boolean } {
    if (this.points < control.value) {
      return { isSmaller: true };
    } else {
      return null;
    }
    // return { isSmaller: true };
  }
}
