import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemFound } from '../item/item-found';
import { ItemService } from '../../item.service';
import {ItemDetailComponent } from '../item-detail/item-detail.component';

@Component({
  selector: 'app-item-detail-found',
  templateUrl: './item-detail-found.component.html',
  styleUrls: ['./item-detail-found.component.css']
})
export class ItemDetailFoundComponent extends ItemDetailComponent implements OnInit {

  @Input() itemFound : ItemFound;

  constructor(
    protected route : ActivatedRoute,
    protected itemService : ItemService,
    protected location : Location
  ) {
    super(route, itemService, location)
   }

  ngOnInit() : void {
    this.getItemFound();
  }

  getItemFound() : void {
    /* route.snapshot is a static image of route info
    *  paramMap is dict of route parameter values
    *  the key id returns the id */
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItemFound(id).subscribe(itemFound => this.itemFound = itemFound);
  }

  save(): void {
    this.itemService.updateItemFound(this.itemFound).subscribe( () => this.goBack());
  }

  modify(): void {
    // TODO go to modify form
    
  }

  goBack() : void {
    // load previous URL in history
    this.location.back();
  }

}
