import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LANG_PATH, JSONBINDING } from './constant/app.constant';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient): any {
  const labelAsset: string = LANG_PATH;
  const labelJson: string = JSONBINDING;
  return new TranslateHttpLoader(http, 'http://localhost:4200' + '/' + labelAsset, labelJson);
}

@NgModule({
  declarations: [LoginComponent, FooterComponent, HeaderComponent, EditUserDialogComponent],
  imports: [
    CommonModule, AngularMaterialModule, ReactiveFormsModule, FormsModule, HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })],
  exports: [LoginComponent, HeaderComponent, FooterComponent],
  entryComponents: [EditUserDialogComponent]
})
export class SharedModule {}
