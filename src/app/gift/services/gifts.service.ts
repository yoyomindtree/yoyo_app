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

  public getSearchedGifts(searchKey: string): Observable<GiftModel[]> {
    console.log('searchKey:- ', searchKey);
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
}
