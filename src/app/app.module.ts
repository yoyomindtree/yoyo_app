import { GlobalErrorHandlerService } from './shared/services/global-error-handler.service';
import { APP_ROUTING } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { appReducers } from './shared/store/reducers/app.reducers';
import { GiftEffects } from './shared/store/effects/gift.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // firebase configuration
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    SharedModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    APP_ROUTING,
    NgbModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([GiftEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ScrollingModule,
  ],
  providers: [
    AngularFireAuth,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
