import { GiftModel } from './../../../shared/model/gift.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { map } from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AdminFireService } from '../../services/admin-fire.service';

@Component({
  selector: 'app-admin-gift-list',
  templateUrl: './admin-gift-list.component.html',
  styleUrls: ['./admin-gift-list.component.css'],
})
export class AdminGiftListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  // columns of matrial table
  displayedColumns: string[] = ['name', 'rating', 'points', 'quantity', 'vendor', 'category', 'discount', 'image', 'Action'];
  // data source
  gifts = new MatTableDataSource();
  // filter -->Global filter
  globalFilter = '';
  // configuration for search bar
  filteredValues = {
    giftId: '',
    name: '',
    vendor: '',
    category: '',
  };
  constructor(private fireService: FirebaseService, private adminFireSerive: AdminFireService,) {}

  ngOnInit() {
    this.getGifts();
  }
  /**
   * method to get the gifts
   */
  getGifts() {
    this.fireService
      .getAllGifts()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data: GiftModel[]) => {
        this.gifts = new MatTableDataSource(data);
        this.gifts.filterPredicate = this.customFilterPredicate();
        this.gifts.paginator = this.paginator;
        this.gifts.sort = this.matSort;
      });
  }
  /**
   * Custom Filter Predicate
   */
  customFilterPredicate() {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      let globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch =
          data.name
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.category
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      const searchString = JSON.parse(filter);
      return (
        data.giftId
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.giftId.toLowerCase()) !== -1 &&
        data.name
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.name.toLowerCase()) !== -1 &&
        data.vendor
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.vendor.toLowerCase()) !== -1 &&
        data.category
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.category.toLowerCase()) !== -1
      );
    };
    return myFilterPredicate;
  }
  /** method for global filter serach F */
  applyFilter(filter) {
    this.globalFilter = filter;
    this.gifts.filter = JSON.stringify(this.filteredValues);
  }
  /**
   * onclick of deactive
   */
  onDeactivate(key, isActive ) {
    this.adminFireSerive.updateGift(key, {isActive: !isActive});
  }
}
