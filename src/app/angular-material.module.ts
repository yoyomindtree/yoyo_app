import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatOptionModule, MatSelectModule, MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';

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
      MatTabsModule
    ]
})
export class AngularMaterialModule {}
