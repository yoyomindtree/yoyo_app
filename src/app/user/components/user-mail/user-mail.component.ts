import { Guid } from 'guid-typescript';
import { HistoryModel } from './../../../shared/model/history.model';
import { FirebaseService } from './../../../shared/services/firebase.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as emailjs from 'emailjs-com';
import { MAT_DIALOG_DATA } from '@angular/material';
import { config } from 'rxjs';
@Component({
  selector: 'app-user-mail',
  templateUrl: './user-mail.component.html',
  styleUrls: ['./user-mail.component.css'],
})
export class UserMailComponent implements OnInit {
  // gets or sets the mailform.
  public mailForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
  ) {
    this.mailForm = this.formBuilder.group({
      to: ['', [Validators.required, Validators.email]],
      toName: ['', [Validators.required]],
      messgae: ['', [Validators.required]],
    });
  }

  ngOnInit() {}
  /**
   * method will get execute once user submits the form
   */
  public onSubmit(): void {
    const templateParams = {
      from_name: sessionStorage.getItem('displayName'),
      to_name: this.mailForm.get('toName'),
      message_html: this.mailForm.get('message'),
      from_email: sessionStorage.getItem('email'),
      to_email: this.mailForm.get('to').value,
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
    let transaction: HistoryModel = null;
    this.firebaseService.getSingleUser(sessionStorage.getItem('email')).subscribe((userdeatil) => {
      transaction = new HistoryModel(
        Guid.create().toString(),
        sessionStorage.getItem('eamil'),
        this.mailForm.get('to').value,
        new Date().toString(),
        false,
        Guid.create().toString(),
        this.data.gift,
        userdeatil,
      );
      this.firebaseService.addGiftHistory(transaction);
    });
  }
}
