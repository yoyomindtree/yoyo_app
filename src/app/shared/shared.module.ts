import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
  declarations: [LoginComponent, FooterComponent, HeaderComponent, SearchComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [LoginComponent, AngularMaterialModule],
})
export class SharedModule {}
