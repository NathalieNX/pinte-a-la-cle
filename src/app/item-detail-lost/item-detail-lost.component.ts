import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemLost } from '../item/item-lost';
import { ItemService } from '../item.service';
import {ItemDetailComponent } from '../item-detail/item-detail.component';

@Component({
  selector: 'app-item-detail-lost',
  templateUrl: './item-detail-lost.component.html',
  styleUrls: ['./item-detail-lost.component.css']
})
export class ItemDetailLostComponent extends ItemDetailComponent implements OnInit {

  @Input() itemLost : ItemLost;

  constructor(
    protected route : ActivatedRoute,
    protected itemService : ItemService,
    protected location : Location
  ) {
    super(route, itemService, location)
   }

  ngOnInit() : void {
    this.getItemLost();
  }

  getItemLost() : void {
    /* route.snapshot is a static image of route info
    *  paramMap is dict of route parameter values
    *  the key id returns the id */
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItemLost(id).subscribe(itemLost => this.itemLost = itemLost);
  }

  save(): void {
    this.itemService.updateItemLost(this.itemLost).subscribe( () => this.goBack());
  }

  modify(): void {
    // TODO go to modify form
    
  }

  goBack() : void {
    // load previous URL in history
    this.location.back();
  }

}
