import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';

@NgModule({
  declarations: [LoginComponent, FooterComponent, HeaderComponent, EditUserDialogComponent],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  exports: [LoginComponent, HeaderComponent, FooterComponent],
  entryComponents: [EditUserDialogComponent],
})
export class SharedModule {}
