import { AdminFireService } from './../../services/admin-fire.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Guid } from 'guid-typescript';
import { GiftModel } from 'src/app/shared/model/gift.model';

@Component({
  selector: 'app-admin-addgiftpopup',
  templateUrl: './admin-addgiftpopup.component.html',
  styleUrls: ['./admin-addgiftpopup.component.css'],
})
export class AdminAddgiftpopupComponent implements OnInit, OnDestroy {
  // property subscription
  private subscription: Subscription;
  // property points
  private points: number;
  // giftform formgroup.
  public giftForm: FormGroup;
  // giftDiscount
  private giftDiscount: number;
  constructor(
    public dialogRef: MatDialogRef<AdminAddgiftpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private adminFireSerive: AdminFireService,
  ) {
    /**
     * Form builder
     */
    this.giftForm = this.formBuilder.group({
      giftName: ['', [Validators.required]],
      discription: ['', [Validators.required]],
      category: ['', [Validators.required]],
      vendor: ['', [Validators.required]],
      points: ['', [Validators.required, Validators.min(0), this.validatePoints.bind(this)]],
      discount: ['', [Validators.required, Validators.min(0), this.validateDiscount.bind(this)]],
      quantity: ['', [Validators.min(1), Validators.required]],
      imagePath: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // subscription to get the property whenever the input point filed will change.
    this.subscription = this.giftForm.get('points').valueChanges.subscribe((formValue) => {
      this.points = formValue;
    });
    this.subscription = this.giftForm.get('discount').valueChanges.subscribe((value) => {
      this.giftDiscount = value;
    });
  }
  ngOnDestroy(): void {
    // unsubscription.
    this.subscription.unsubscribe();
  }
  /**
   * Method will get called once admin submits form
   */
  public onSubmit() {
    let pointvalue = this.giftForm.get('points').value;
    const dicountValue = this.giftForm.get('discount').value;
    pointvalue = pointvalue - dicountValue;
    const gift = new GiftModel(
      Guid.create().toString(),
      this.giftForm.get('giftName').value,
      this.giftForm.get('discription').value,
      '0',
      pointvalue,
      this.giftForm.get('quantity').value,
      this.giftForm.get('vendor').value,
      this.giftForm.get('category').value,
      0,
      this.giftForm.get('discount').value,
      this.giftForm.get('imagePath').value,
      true,
      Guid.create().toString(),
      0,
    );
    this.adminFireSerive.addGift(gift);
    alert('Gift added Sucessfully');
    this.reset();
  }
  /**
   *
   * @param control -FormControl.
   * Custome validator method.
   */
  public validateDiscount(control: FormControl): { [s: string]: boolean } {
    if (this.points < control.value) {
      return { isSmaller: true };
    } else {
      return null;
    }
  }
  /**
   * method top validate the user input points.
   * @param control :formcontrol.
   */
  public validatePoints(control: FormControl): { [s: string]: boolean } {
    if (this.giftDiscount > control.value) {
      return { isGreater: true };
    } else {
      return null;
    }
  }
  /**
   * reset method for gift form
   */
  public reset(): void {
    for (const name in this.giftForm.controls) {
      if (this.giftForm.controls.hasOwnProperty(name)) {
        this.giftForm.controls[name].setValue('');
        this.giftForm.controls[name].setErrors(null);
      }
    }
  }
}
