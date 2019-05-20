import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
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
      // { type: 'areEqual', message: 'Password mismatch' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' },
    ],
    phone: [
      { type: 'required', message: 'Your contact number is required.' },
      { type: 'pattern', message: 'Your number should contain only digits.' },
    ],
  };
  constructor() { }
}