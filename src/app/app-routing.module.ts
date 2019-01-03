import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ViewLoginComponent} from './authFiles/view-login/view-login.component';
import {ViewRegisterComponent} from './authFiles/view-register/view-register.component';
import {ViewProfileComponent} from './authFiles/view-profile/view-profile.component';
//import { ItemsComponent } from "./itemFiles/items/items.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailComponent } from './itemFiles/item-detail/item-detail.component';
import { ItemDetailLostComponent } from './itemFiles/item-detail-lost/item-detail-lost.component';
import { ItemDetailFoundComponent } from './itemFiles/item-detail-found/item-detail-found.component';
import { ViewItemsLostComponent } from './itemFiles/view-items-lost/view-items-lost.component';
import { ViewItemsFoundComponent } from './itemFiles/view-items-found/view-items-found.component';
import { ViewNewLostComponent } from './itemFiles/view-new-lost/view-new-lost.component';
import { ViewNewFoundComponent } from './itemFiles/view-new-found/view-new-found.component';
import { FormNewItemLostComponent } from './itemFiles/form-new-item-lost/form-new-item-lost.component';
import { FormNewItemFoundComponent } from './itemFiles/form-new-item-found/form-new-item-found.component';
import { FormModifyItemLostComponent } from './itemFiles/form-modify-item-lost/form-modify-item-lost.component';
import { FormModifyItemFoundComponent } from './itemFiles/form-modify-item-found/form-modify-item-found.component';
import { ImageUploadComponent } from './uploadFiles/image-upload/image-upload.component';
import { ViewUploadsComponent } from './uploadFiles/view-uploads/view-uploads.component';

import { AuthGuardService } from './auth-guard.service';

const routes : Routes = [
  // TODO change home component
  { path: '', component: ViewLoginComponent },
  { path: 'login', component: ViewLoginComponent },
  { path: 'register', component: ViewRegisterComponent },
  { path: 'profile', component: ViewProfileComponent, canActivate: [AuthGuardService] },  
  { path : 'dashboard', component : DashboardComponent },
  //TODO delete
  //{ path : 'items', component : ItemsComponent },
  { path : 'items-lost', component : ViewItemsLostComponent },
  { path : 'items-found', component : ViewItemsFoundComponent },
  { path : 'detail/:id', component : ItemDetailComponent },
  { path : 'detail-lost/:id', component : ItemDetailLostComponent },
  { path : 'detail-found/:id', component : ItemDetailFoundComponent },
  { path : 'new-lost', component : FormNewItemLostComponent },
  { path : 'new-found', component : FormNewItemFoundComponent },
  { path : 'modify-lost/:id', component : FormModifyItemLostComponent },
  { path : 'modify-found/:id', component : FormModifyItemFoundComponent },
  { path : 'new-upload', component : ImageUploadComponent },
  { path : 'all-uploads', component : ViewUploadsComponent },
];

@NgModule({
  /* configure router at root level : init and start listening for browser location */
  imports : [ RouterModule.forRoot(routes)],
  /* make router directives available for use in all AppModule components requiring them */
  exports : [ RouterModule ],
})

export class AppRoutingModule { }
