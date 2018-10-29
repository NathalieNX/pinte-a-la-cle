import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ViewLoginComponent} from './view-login/view-login.component';
import { ItemsComponent } from "./items/items.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemDetailLostComponent } from './item-detail-lost/item-detail-lost.component';
import { ViewItemsLostComponent } from './view-items-lost/view-items-lost.component';
import { ViewNewLostComponent } from './view-new-lost/view-new-lost.component';
import { FormItemLostComponent } from './form-item-lost/form-item-lost.component';

const routes : Routes = [
  { path : '', redirectTo : '/login', pathMatch : 'full' },
  { path : 'login', component : ViewLoginComponent },  
  { path : 'dashboard', component : DashboardComponent },
  //{ path : 'items', component : ItemsComponent },
  { path : 'itemsLost', component : ViewItemsLostComponent },
  { path : 'detail/:id', component : ItemDetailComponent },
  { path : 'detail-lost/:id', component : ItemDetailLostComponent },
  { path : 'newLost', component : FormItemLostComponent },

];

@NgModule({
  /* configure router at root level : init and start listening for browser location */
  imports : [ RouterModule.forRoot(routes)],
  /* make router directives available for use in all AppModule components requiring them */
  exports : [ RouterModule ],
})

export class AppRoutingModule { }
