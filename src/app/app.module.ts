import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule }from '@angular/common/http';

// In memory http client
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './itemList/in-memory-data-service';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';

import { ItemDetailComponent } from './item-detail/item-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemSearchComponent } from './item-search/item-search.component';
import { ItemDetailLostComponent } from './item-detail-lost/item-detail-lost.component';
import { ViewLoginComponent } from './view-login/view-login.component';
import { ViewItemsLostComponent } from './view-items-lost/view-items-lost.component';
import { ViewNewLostComponent } from './view-new-lost/view-new-lost.component';
import { FormNewItemLostComponent } from './form-new-item-lost/form-new-item-lost.component';
import { FormModifyItemLostComponent } from './form-modify-item-lost/form-modify-item-lost.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
