import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemLost } from '../item/item-lost';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-form-modify-item-lost',
  templateUrl: './form-modify-item-lost.component.html',
  styleUrls: ['./form-modify-item-lost.component.css']
})
export class FormModifyItemLostComponent implements OnInit {

  @Input() itemLost : ItemLost;
  submitted = false;

  constructor(
    protected route : ActivatedRoute,
    protected itemService : ItemService,
    protected location : Location
  ) { }


  ngOnInit() {
    this.getItemLost();
  }  

  getItemLost() : void {
    /* route.snapshot is a static image of route info
    *  paramMap is dict of route parameter values
    *  the key id returns the id */
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItemLost(id).subscribe(itemLost => this.itemLost = itemLost);
    console.log(this.itemLost)
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.itemLost.title);
    this.itemService.updateItemLost(this.itemLost).subscribe( () => this.goBack());
  }

  goBack() : void {
    // load previous URL in history
    this.location.back();
  }

}
