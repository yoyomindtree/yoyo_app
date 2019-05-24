import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AdminAddgiftpopupComponent } from '../admin-addgiftpopup/admin-addgiftpopup.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private dialog: MatDialog, private breakpointObserver: BreakpointObserver) {}
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));
  ngOnInit() {}
  /**
   * method will get called on click on gift add button
   */
  public onGiftAddClick() {
    // dialog configuration
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';
    // method for opening the dialog
    const dialogRef = this.dialog.open(AdminAddgiftpopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
