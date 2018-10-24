import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemsComponent } from "./items/items.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

const routes : Routes = [
  { path : '', redirectTo : '/dashboard', pathMatch : 'full' },
  { path : 'items', component : ItemsComponent },
  { path : 'dashboard', component : DashboardComponent },
  { path : 'detail/:id', component : ItemDetailComponent }
];

@NgModule({
  /* configure router at root level : init and start listening for browser location */
  imports : [ RouterModule.forRoot(routes)],
  /* make router directives available for use in all AppModule components requiring them */
  exports : [ RouterModule ],
})

export class AppRoutingModule { }
