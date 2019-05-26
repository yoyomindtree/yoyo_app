import { map } from 'rxjs/internal/operators/map';
import { FirebaseService } from './../../shared/services/firebase.service';
import { GiftModel } from 'src/app/shared/model/gift.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiftsService {

  constructor(private firebaseService: FirebaseService) { }

  public getAllGifts(): Observable<GiftModel[]> {
    return Observable.create((observer: any) => {
      this.firebaseService
        .getAllGifts()
        .snapshotChanges()
        .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
        .subscribe((data: GiftModel[]) => {
          observer.next(data);
          observer.complete();
        });
    });
  }

  public getAllRecievedGifts(): Observable<GiftModel[]> {
    return Observable.create((observer: any) => {
      this.firebaseService
        .getHistoryForReciever(sessionStorage.getItem('email'))
        .subscribe((data: GiftModel[]) => {
          observer.next(data);
          observer.complete();
        });
    });
  }

  public getSearchedGifts(searchKey: string): Observable<GiftModel[]> {
    return Observable.create((observer: any) => {
      const subcription = this.firebaseService.getGiftSearchResult().pipe(
        map((response) =>
          response.filter((option: GiftModel) => {
            return (
              option.name.toLowerCase().indexOf(searchKey.toLowerCase()) === 0 ||
              option.vendor.toLowerCase().indexOf(searchKey.toLowerCase()) === 0 ||
              option.category.toLowerCase().indexOf(searchKey.toLowerCase()) === 0 ||
              option.points.toString().indexOf(searchKey) === 0
            );
          }),
        ),
      );
      subcription.subscribe((data) => {
        observer.next(data);
        observer.complete();
      });
    });
  }
}
