import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-addgiftpopup',
  templateUrl: './admin-addgiftpopup.component.html',
  styleUrls: ['./admin-addgiftpopup.component.css'],
})
export class AdminAddgiftpopupComponent implements OnInit {
  giftForm = this.formBuilder.group({
    giftName: ['', Validators.required],
    discription: ['', Validators.required],
    category: ['', Validators.required],
    vendor: [' ', Validators.required],
    discount: ['', Validators.required],
    quantity: ['', [Validators.min(1), Validators.required]],
    imagePath: ['', [Validators.required]],
  });
  constructor(
    public dialogRef: MatDialogRef<AdminAddgiftpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {}
  onSubmit() {
    console.log(this.giftForm);
  }
}
