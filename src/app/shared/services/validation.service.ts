import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  /**
   *   VALIDATION ERROR MESSAGES
   */
  public account_validation_messages = {
    username: [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      // { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    email: [{ type: 'required', message: 'Email is required.' }, { type: 'pattern', message: 'Enter a valid email.' }],
    confirmPassword: [
      { type: 'required', message: 'Confirm password is required.' },
      { type: 'areEqual', message: 'Password mismatch' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' },
    ],
    phone: [
      { type: 'required', message: 'Your contact number is required.' },
      { type: 'pattern', message: 'Your number should contain only 10 digits.' },
    ],
  };
  constructor() {}

  // mismatch(otherInputControl: AbstractControl): ValidatorFn {
  //   return (inputControl: AbstractControl): { [key: string]: boolean } | null => {
  //     if(inputControl.value !== undefined && inputControl.value != '' && inputControl.value !== otherInputControl.value) {
  //       return {'areEqual': true};
  //     }
  //     return null;
  //   };
  // }

  // mismatch(pass, confirmPass): { [s: string]: boolean } {
  //   if (pass !== undefined && pass !== '' && pass !== confirmPass) {
  //     return { 'areEqual': true };
  //   }
  //   return null;
  // }
}
