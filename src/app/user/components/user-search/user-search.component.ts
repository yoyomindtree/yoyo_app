import { AppState } from './../../../shared/store/state/app.state';
import { GetSearchedGiftDetails } from './../../../shared/store/actions/gift.actions';
import { GiftModel } from 'src/app/shared/model/gift.model';
import { FirebaseService } from './../../../shared/services/firebase.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent implements OnInit {
  // form control
  giftControl = new FormControl();
  // filtered option for auto suggestion.
  filteredOptions: Observable<any[]>;
  // event emitter for sending the event.
  @Output() userSelect: EventEmitter<GiftModel[]> = new EventEmitter<GiftModel[]>();
  constructor(private fireBaseSerive: FirebaseService, private _store: Store<AppState>) {
    // providing debounce time.
    this.filteredOptions = this.giftControl.valueChanges.pipe(
      startWith(null),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.filter(val || '');
      }),
    );
  }

  ngOnInit() {}

  /**
   *
   * @param value :input value from input field
   * method will return the search result
   */
  public filter(value: string): Observable<any[]> {
    return this.fireBaseSerive.getGiftSearchResult().pipe(
      map((response) =>
        response.filter((option: GiftModel) => {
          return (
            option.name.toLowerCase().indexOf(value.toLowerCase()) === 0 ||
            option.vendor.toLowerCase().indexOf(value.toLowerCase()) === 0 ||
            option.category.toLowerCase().indexOf(value.toLowerCase()) === 0 ||
            option.points.toString().indexOf(value) === 0
          );
        }),
      ),
    );
  }

  /**
   * method will get execute when user submitted the search.
   */
  public onSubmit(): void {
    this._store.dispatch(new GetSearchedGiftDetails(this.giftControl.value));
  }
}
