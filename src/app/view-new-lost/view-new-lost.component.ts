import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemLost } from '../item/item-lost';
import { ItemService } from '../item.service';
import { FormItemLostComponent } from '../form-item-lost/form-item-lost.component';

@Component({
  selector: 'app-view-new-lost',
  templateUrl: './view-new-lost.component.html',
  styleUrls: ['./view-new-lost.component.css']
})

export class ViewNewLostComponent implements OnInit {
  
  newItemLost : ItemLost;
  formItemLost : FormItemLostComponent;

  /* identify class ItemsComponent as a ItemService injection site */
  constructor(
    protected route : ActivatedRoute,
    protected itemService : ItemService,
    protected location : Location
  ) { }

  ngOnInit() { 
    this.newItemLost = new ItemLost;
    console.log("view new lost : itemLost", this.newItemLost);
    this.newItemLost = {
      id : 88,
      title : "itemLost88",
      photo : 0,
      contact : "contact",
      description : "description",
      date : "now",
      user : 88,
      palc : "palc"
    }
    this.formItemLost = new FormItemLostComponent(this.route, this.itemService, this.location);
  }

  onSubmit(): void {
    console.log(this.formItemLost.model.title);
    this.newItemLost = this.formItemLost.model;
    this.itemService.addItemLost(this.newItemLost).subscribe( () => this.goBack());
  }

  goBack() : void {
    // load previous URL in history
    this.location.back();
  }
}
