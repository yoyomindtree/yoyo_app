import { UserModel } from 'src/app/shared/model/user.model';
import { Guid } from 'guid-typescript';
import { HistoryModel } from './../../../shared/model/history.model';
import { FirebaseService } from './../../../shared/services/firebase.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as emailjs from 'emailjs-com';
import { MAT_DIALOG_DATA } from '@angular/material';
import { config, Subscription } from 'rxjs';
import { database } from 'firebase';
@Component({
  selector: 'app-user-mail',
  templateUrl: './user-mail.component.html',
  styleUrls: ['./user-mail.component.css'],
})
export class UserMailComponent implements OnInit, OnDestroy {
  // gets or sets the mailform.
  public mailForm: FormGroup;
  // gets or sets the subscription.
  private subscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
  ) {
    this.mailForm = this.formBuilder.group({
      to: ['', [Validators.required, Validators.email]],
      toName: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  ngOnInit() {}
  /**
   * method will get execute once user submits the form
   */
  public onSubmit(): void {
    const templateParams = {
      from_name: sessionStorage.getItem('displayName'),
      to_name: this.mailForm.get('toName').value,
      message_html: this.mailForm.get('message').value,
      from_email: sessionStorage.getItem('email'),
      to_email: this.mailForm.get('to').value,
      points: this.data.gift.points * this.data.copies,
    };
    // mail send method.
    emailjs.send('yoyo', 'template_5bhTnqFg', templateParams, 'user_LqyB0x9nwHbehnc2Fp7G1').then(
      function(response) {
        alert('Mail sent successfully!..');
      },
      function(err) {
        alert('Ooops Something went wrong. Please Contact yoyomindtree@gmail.com  ');
      },
    );
    // transaction history.
    let transaction: HistoryModel = null;
    transaction = new HistoryModel(
      Guid.create().toString(),
      sessionStorage.getItem('email'),
      this.mailForm.get('to').value,
      new Date().toString(),
      false,
      Guid.create().toString(),
      this.data.gift,
      this.data.user,
      this.data.gift.points * this.data.copies,
    );
    this.firebaseService.addGiftHistory(transaction);
    this.data.user.balance.forSending -= this.data.gift.points * this.data.copies;
    this.updateUser(this.data.user.key, this.data.user);
    this.subscription = this.firebaseService
      .getSingleUser(this.mailForm.get('to').value)
      .subscribe((userdeatil: any) => {
        if (userdeatil) {
          userdeatil[0].balance.forRedeem += templateParams.points;
          this.updateUser(userdeatil[0].key, userdeatil[0]);
        }
      });
    this.reset();
  }

  /**
   * method to reset the form once user submits the form.
   */
  public reset(): void {
    for (const name in this.mailForm.controls) {
      if (this.mailForm.controls.hasOwnProperty(name)) {
        this.mailForm.controls[name].setValue('');
        this.mailForm.controls[name].setErrors(null);
      }
    }
  }
  /**
   *method to update the user
   * @param key -- key in firebase
   * @param value -- userdeatil
   */
  public updateUser(key: string, value: any): void {
    this.firebaseService.updateUser(key, value);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
