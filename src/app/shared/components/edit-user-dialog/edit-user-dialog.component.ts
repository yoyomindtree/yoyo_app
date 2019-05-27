import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FirebaseService } from '../../services/firebase.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { UserModel } from '../../model/user.model';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
})
export class EditUserDialogComponent implements OnInit, OnDestroy {
  // property subscription
  subscription: Subscription;
  // property getCurrentUserEmail to get the currently logged in user email.
  public getCurrentUserEmail;
  // property getCurrentUserDetails to get the currently logged in user details.
  public getCurrentUserDetails;
  public updatedUserDetails: any;
  public editDetailsForm: FormGroup;
  public pass: string;

  /**
   *   VALIDATION ERROR MESSAGES
   */
  public account_validation_messages = this.validService.account_validation_messages;

  /**
   * properties patterns
   */
  private emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
  private mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';

  constructor(
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fbService: FirebaseService,
    private formBuilder: FormBuilder,
    private validService: LoginService,
  ) {
    this.getCurrentUserEmail = sessionStorage.getItem('email');
    this.editDetailsForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      ),
      confirmPassword: new FormControl('', Validators.compose([Validators.required, this.mismatchPassword.bind(this)])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
    });
  }

  ngOnInit() {
    // subscription to get the property whenever the input point filed will change.
    this.subscription = this.fbService.getSingleUser(this.getCurrentUserEmail).subscribe((data) => {
      this.getCurrentUserDetails = data[0];
      // console.log("currentuser::::", this.getCurrentUserDetails);
      // to pre-populate the form
      this.editDetailsForm.patchValue({
        email: this.getCurrentUserDetails.userName,
        password: this.getCurrentUserDetails.password,
        confirmPassword: '******',
        phone: this.getCurrentUserDetails.mobNo,
      });
    });

    // to receive the changed value from the password form input field
    this.editDetailsForm.get('password').valueChanges.subscribe((value) => {
      this.pass = value;
    });
  }

  ngOnDestroy() {
    // unsubscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Custom validator function to validate the passwords
   */
  public mismatchPassword(control: FormControl): { [s: string]: boolean } {
    if (this.pass !== control.value) {
      return { areEqual: true };
    }
    return null;
  }

  public onEditSubmit(): void {
    this.updatedUserDetails = {
      userName: this.editDetailsForm.value.email,
      phone: this.editDetailsForm.value.phone,
    };
    // console.log("edited form:::::", this.editDetailsForm)
    this.fbService.updateUser(this.getCurrentUserDetails.key, this.updatedUserDetails);
    this.onCancel();
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
