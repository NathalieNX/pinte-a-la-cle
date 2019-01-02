import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemFound } from '../item/item-found';
import { ItemService } from '../../item.service';
import { FormModifyItemFoundComponent } from '../form-modify-item-found/form-modify-item-found.component';

@Component({
  selector: 'app-view-modify-found',
  templateUrl: './view-modify-found.component.html',
  styleUrls: ['./view-modify-found.component.css']
})

export class ViewModifyFoundComponent implements OnInit {
  
  oldItemFound : ItemFound;
  formModifyItemFound : FormModifyItemFoundComponent;

  /* identify class ItemsComponent as a ItemService injection site */
  constructor(
    protected route : ActivatedRoute,
    protected itemService : ItemService,
    protected location : Location
  ) { }

  ngOnInit() { 
    this.oldItemFound = new ItemFound;
    // TODO get old item found
    console.log("view new found : itemFound", this.oldItemFound);
    this.formModifyItemFound = new FormModifyItemFoundComponent(this.route, this.itemService, this.location);
  }

  onSubmit(): void {
    console.log(this.formModifyItemFound.itemFound.title);
    this.oldItemFound = this.formModifyItemFound.itemFound;
    this.itemService.updateItemFound(this.oldItemFound).subscribe( () => this.goBack());
  }

  goBack() : void {
    // load previous URL in history
    this.location.back();
  }
}
