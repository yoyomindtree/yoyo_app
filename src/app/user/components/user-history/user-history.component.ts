import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { HistoryModel } from './../../../shared/model/history.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css'],
})
export class UserHistoryComponent implements OnInit, OnDestroy {
  // gets or sets the data source.
  public dataSource = new MatTableDataSource();
  // colums config for the userlist table
  public displayedColumns = ['giftName', 'points', 'category', 'vendor', 'dateofissue'];
  // param to get or sets the paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // param to gets or sets the sort
  @ViewChild(MatSort) sort: MatSort;
  // subscription variable
  private subscription: Subscription;
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.getHistory();
  }
  /**
   * get the history of the user.
   */
  public getHistory(): void {
    this.subscription = this.firebaseService
      .getHistory()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data: HistoryModel[]) => {
        this.dataSource = new MatTableDataSource(
          data.filter((value) => value.reciverEmail === sessionStorage.getItem('email')),
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
