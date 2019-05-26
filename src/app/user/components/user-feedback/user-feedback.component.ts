import { FirebaseService } from './../../../shared/services/firebase.service';
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
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
  ) {
    this.feedbackForm = this.formBuilder.group({
      comment: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  /**
   * On click of form submit it will submit the record in db.
   */
  public onSubmit(): void {
    this.ratingByUser = new ReviewModel(
      this.data.giftId,
      sessionStorage.getItem('email'),
      this.feedbackForm.get('comment').value,
      this.cssRate,
      new Date().toString(),
      sessionStorage.getItem('displayName'),
    );
    debugger;
    console.log(this.ratingByUser);
    alert('Thnaks !..');
    this.firebaseService.addGiftReview(this.ratingByUser);
    this.feedbackForm.reset();
    this.cssRate = 0;
  }
}
