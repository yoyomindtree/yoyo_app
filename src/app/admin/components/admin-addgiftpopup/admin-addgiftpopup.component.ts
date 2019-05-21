import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-admin-addgiftpopup',
  templateUrl: './admin-addgiftpopup.component.html',
  styleUrls: ['./admin-addgiftpopup.component.css'],
})
export class AdminAddgiftpopupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AdminAddgiftpopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
}
