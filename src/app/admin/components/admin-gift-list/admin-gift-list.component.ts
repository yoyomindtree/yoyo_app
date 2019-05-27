import { GiftModel } from './../../../shared/model/gift.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { map } from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { AdminFireService } from '../../services/admin-fire.service';
import { Subscription } from 'rxjs';
import { AdminAddgiftpopupComponent } from '../admin-addgiftpopup/admin-addgiftpopup.component';

@Component({
  selector: 'app-admin-gift-list',
  templateUrl: './admin-gift-list.component.html',
  styleUrls: ['./admin-gift-list.component.css'],
})
export class AdminGiftListComponent implements OnInit, OnDestroy {
  // sets or gets paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // gets or sets the sort
  @ViewChild(MatSort) matSort: MatSort;
  // columns of matrial table
  displayedColumns: string[] = [
    'name',
    'rating',
    'points',
    'quantity',
    'vendor',
    'category',
    'discount',
    'image',
    'Action',
  ];
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
  // param subscription for clean up
  private subscription: Subscription;
  constructor(
    private fireService: FirebaseService,
    private adminFireSerive: AdminFireService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getGifts();
  }
  /**
   * method will get called on click on gift add button
   */
  public onGiftAddClick(): void {
    // dialog configuration
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '600px';
    dialogConfig.width = '600px';
    // method for opening the dialog
    const dialogRef = this.dialog.open(AdminAddgiftpopupComponent, dialogConfig);
    this.subscription = dialogRef.afterClosed().subscribe((result) => {});
  }
  /**
   * method to get the gifts
   */
  public getGifts(): void {
    this.subscription = this.fireService
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
  public customFilterPredicate(): any {
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
            .indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.discount
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
  public applyFilter(filter): void {
    this.globalFilter = filter;
    this.gifts.filter = JSON.stringify(this.filteredValues);
  }
  /**
   * onclick of deactive
   */
  public onDeactivate(key: string, isActive: boolean): void {
    this.adminFireSerive.updateGift(key, { isActive: !isActive });
  }
  ngOnDestroy(): void {
    // unsubscription
    this.subscription.unsubscribe();
  }
}
