import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule }from '@angular/common/http';

// In memory http client
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './itemFiles/itemList/in-memory-data-service';

import { AppComponent } from './app.component';

import { ItemsComponent } from './itemFiles/items/items.component';
import { ItemDetailComponent } from './itemFiles/item-detail/item-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemSearchComponent } from './itemFiles/item-search/item-search.component';
import { ItemDetailLostComponent } from './itemFiles/item-detail-lost/item-detail-lost.component';
import { ViewLoginComponent } from './authFiles/view-login/view-login.component';
import { ViewItemsLostComponent } from './itemFiles/view-items-lost/view-items-lost.component';
import { ViewNewLostComponent } from './itemFiles/view-new-lost/view-new-lost.component';
import { FormNewItemLostComponent } from './itemFiles/form-new-item-lost/form-new-item-lost.component';
import { FormModifyItemLostComponent } from './itemFiles/form-modify-item-lost/form-modify-item-lost.component';
import { ViewModifyLostComponent } from './itemFiles/view-modify-lost/view-modify-lost.component';
import { ImageUploadComponent } from './uploadFiles/image-upload/image-upload.component';
import { FormModifyItemFoundComponent } from './itemFiles/form-modify-item-found/form-modify-item-found.component';
import { FormNewItemFoundComponent } from './itemFiles/form-new-item-found/form-new-item-found.component';
import { ItemDetailFoundComponent } from './itemFiles/item-detail-found/item-detail-found.component';
import { ViewItemsFoundComponent } from './itemFiles/view-items-found/view-items-found.component';
import { ViewModifyFoundComponent } from './itemFiles/view-modify-found/view-modify-found.component';
import { ViewNewFoundComponent } from './itemFiles/view-new-found/view-new-found.component';
import { ViewUploadsComponent } from './uploadFiles/view-uploads/view-uploads.component';
import { ViewRegisterComponent } from './authFiles/view-register/view-register.component';
import { ViewProfileComponent } from './authFiles/view-profile/view-profile.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailComponent,
    MessagesComponent,
    DashboardComponent,
    ItemSearchComponent,
    ItemDetailLostComponent,
    ViewLoginComponent,
    ViewItemsLostComponent,
    ViewNewLostComponent,
    FormNewItemLostComponent,
    FormModifyItemLostComponent,
    ViewModifyLostComponent,
    ImageUploadComponent,
    FormModifyItemFoundComponent,
    FormNewItemFoundComponent,
    ItemDetailFoundComponent,
    ViewItemsFoundComponent,
    ViewModifyFoundComponent,
    ViewNewFoundComponent,
    ViewUploadsComponent,
    ViewRegisterComponent,
    ViewProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot( 
      InMemoryDataService, { dataEncapsulation: false }
    )

  ],
  providers: [
    AuthenticationService, 
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
