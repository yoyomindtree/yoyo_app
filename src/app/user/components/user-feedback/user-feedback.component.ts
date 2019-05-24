import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.css']
})
export class UserFeedbackComponent implements OnInit {
  public feedbackForm: FormGroup;
  public cssRate = 1;
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.feedbackForm = this.formBuilder.group({
      rating: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  /**
   * On click of form submit it will submit the record in db.
   */
  public onSubmit(): void {
    console.log('');
  }

}
