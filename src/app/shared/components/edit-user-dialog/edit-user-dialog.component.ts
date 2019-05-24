import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  public getCurrentUserEmail;
  public getCurrentUserDetails;
  constructor(private dialogRef: MatDialogRef<EditUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fbService: FirebaseService) {
                  this.getCurrentUserEmail = sessionStorage.getItem('email');
               }

  ngOnInit() {
    this.fbService.getSingleUser(this.getCurrentUserEmail).subscribe(data => {
      console.log('currently logged in user details :::::: ', data);
    });
  }


}
