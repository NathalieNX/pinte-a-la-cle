import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemLost } from '../item/item-lost';
import { ItemService } from '../item.service';
import { FormModifyItemLostComponent } from '../form-modify-item-lost/form-modify-item-lost.component';

@Component({
  selector: 'app-view-modify-lost',
  templateUrl: './view-modify-lost.component.html',
  styleUrls: ['./view-modify-lost.component.css']
})

export class ViewModifyLostComponent implements OnInit {
  
  oldItemLost : ItemLost;
  formModifyItemLost : FormModifyItemLostComponent;

  /* identify class ItemsComponent as a ItemService injection site */
  constructor(
    protected route : ActivatedRoute,
    protected itemService : ItemService,
    protected location : Location
  ) { }

  ngOnInit() { 
    this.oldItemLost = new ItemLost;
    // TODO get old item lost
    console.log("view new lost : itemLost", this.oldItemLost);
    this.formModifyItemLost = new FormModifyItemLostComponent(this.route, this.itemService, this.location);
  }

  onSubmit(): void {
    console.log(this.formModifyItemLost.itemLost.title);
    this.oldItemLost = this.formModifyItemLost.itemLost;
    this.itemService.updateItemLost(this.oldItemLost).subscribe( () => this.goBack());
  }

  goBack() : void {
    // load previous URL in history
    this.location.back();
  }
}
