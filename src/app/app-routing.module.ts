import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
