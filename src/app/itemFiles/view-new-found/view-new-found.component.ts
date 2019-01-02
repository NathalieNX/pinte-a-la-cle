import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemFound } from '../item/item-found';
import { ItemService } from '../../item.service';
import { FormNewItemFoundComponent } from '../form-new-item-found/form-new-item-found.component';

@Component({
  selector: 'app-view-new-found',
  templateUrl: './view-new-found.component.html',
  styleUrls: ['./view-new-found.component.css']
})

export class ViewNewFoundComponent implements OnInit {
  
  newItemFound : ItemFound;
  formNewItemFound : FormNewItemFoundComponent;

  /* identify class ItemsComponent as a ItemService injection site */
  constructor(
    protected route : ActivatedRoute,
    protected itemService : ItemService,
    protected location : Location
  ) { }

  ngOnInit() { 
    this.newItemFound = new ItemFound;
    console.log("view new found : itemFound", this.newItemFound);
    this.newItemFound = {
      id : 88,
      title : "itemFound88",
      photo : 0,
      contact : "contact",
      description : "description",
      date : "now",
      user : 88,
    }
    this.formNewItemFound = new FormNewItemFoundComponent(this.route, this.itemService, this.location);
  }

  onSubmit(): void {
    console.log(this.formNewItemFound.model.title);
    this.newItemFound = this.formNewItemFound.model;
    this.itemService.addItemFound(this.newItemFound).subscribe( () => this.goBack());
  }

  goBack() : void {
    // load previous URL in history
    this.location.back();
  }
}
