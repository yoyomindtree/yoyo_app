import { GiftModel } from 'src/app/shared/model/gift.model';
import { FirebaseService } from './../../../shared/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

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
  constructor(private fireBaseSerive: FirebaseService) {
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
   * @param val :input value from input field
   * method will return the search result
   */
  public filter(val: string): Observable<any[]> {
    return this.fireBaseSerive.getGiftSearchResult(val).pipe(
      map((response) =>
        response.filter((option: GiftModel) => {
          return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
        }),
      ),
    );
  }
}
