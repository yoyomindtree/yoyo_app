import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule,
} from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  exports: [
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
})
export class AngularMaterialModule {}
