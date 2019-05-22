import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css'],
})
export class AdminUserListComponent implements OnInit {
  constructor(private fireService: FirebaseService) {}
  users = new MatTableDataSource(null);
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
