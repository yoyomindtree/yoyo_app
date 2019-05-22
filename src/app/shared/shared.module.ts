import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [LoginComponent, FooterComponent, HeaderComponent, SearchComponent, TableComponent],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule, FormsModule],
  exports: [LoginComponent, HeaderComponent, FooterComponent, TableComponent],
})
export class SharedModule {}
