import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/shared/model/user.model';
import { ColumnConfig } from 'material-dynamic-table';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css'],
})
export class AdminUserListComponent implements OnInit {
  constructor(private fireService: FirebaseService) {}
  // users list
  users = new MatTableDataSource(null);
  // colums config for the userlist table
  displayedColumns = ['userName', 'role', 'balance'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.fireService
      .getUserList()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data: UserModel[]) => {
        this.users = new MatTableDataSource(data);
      });
  }
}
// columns: ColumnConfig[] = [
//   {
//     name: 'UserName',
//     displayName: 'userName',
//     type: 'string',
//   },
//   {
//     name: 'RefernceId',
//     displayName: 'refId',
//     type: 'string',
//   },
//   {
//     name: 'Role',
//     displayName: 'role',
//     type: 'string',
//   },
// ];
