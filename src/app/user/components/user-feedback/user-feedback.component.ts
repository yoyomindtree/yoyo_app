import { MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ReviewModel } from 'src/app/shared/model/review.model';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.css'],
})
export class UserFeedbackComponent implements OnInit {
  public feedbackForm: FormGroup;
  public cssRate;
  public ratingByUser: ReviewModel;
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.feedbackForm = this.formBuilder.group({
      rating: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  /**
   * On click of form submit it will submit the record in db.
   */
  public onSubmit(): void {
    this.ratingByUser = new ReviewModel(
      sessionStorage.getItem('email'),
      this.data.giftId,
      this.feedbackForm.get('rating').value,
      this.feedbackForm.get('comment').value,
      Date.now().toString(),
    );
    console.log(this.ratingByUser);
  }
}
