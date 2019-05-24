import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class GiftResolverService implements Resolve<any> {

  constructor(private firebaseService: FirebaseService) { }

  /**
   * This is the method which will worker as a resolver for routing queryParams time.
   * @param route : Object of Activated route snapshot
   * @param rstate : Object of Router State Snapshot
   */
  public resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
    return Observable.create((observer: any) => {
      this.firebaseService.getGiftByKey(route.queryParams['giftKey']).subscribe((giftDetail) => {
        observer.next(giftDetail);
        observer.complete();
      });
    });
  }
}
