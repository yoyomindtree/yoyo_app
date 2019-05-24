import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/shared/model/user.model';
import { ColumnConfig } from 'material-dynamic-table';
import { AdminFireService } from '../../services/admin-fire.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css'],
})
export class AdminUserListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private fireService: AdminFireService) {}
  // users list
  users = new MatTableDataSource(null);
  // colums config for the userlist table
  displayedColumns = ['userName', 'role', 'balance', 'action'];
  // param to get or sets the paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // param to gets or sets the sort
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getUsers();
  }
  /**
   * method to get the user list
   */
  public getUsers(): void {
    this.fireService
      .getUserList()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data: UserModel[]) => {
        this.users = new MatTableDataSource(data);
        this.users.sort = this.sort;
        this.users.paginator = this.paginator;
      });
  }
  /**
   * method to update the balence of the user.
   * @param key key of user in firebase.
   * @param value updating value.
   */
  public onUpdateBalence(key: string, value: number): void {
    this.fireService.updateUser(key, value);
    alert('Balence Updated!!!.');
  }
}
