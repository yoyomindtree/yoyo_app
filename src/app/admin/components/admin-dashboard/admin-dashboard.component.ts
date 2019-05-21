import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AdminAddgiftpopupComponent } from '../admin-addgiftpopup/admin-addgiftpopup.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}
  onGiftAddClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';

    const dialogRef = this.dialog.open(AdminAddgiftpopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
