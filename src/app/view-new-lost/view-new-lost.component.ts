import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemLost } from '../item/item-lost';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-view-new-lost',
  templateUrl: './view-new-lost.component.html',
  styleUrls: ['./view-new-lost.component.css']
})

export class ViewNewLostComponent implements OnInit {
  
  itemLost = new ItemLost();

  newItemLost = new FormGroup({
    title : new FormControl(''),
    photo : new FormControl(''),
    contact : new FormControl(''),
    description : new FormControl(''),
    date : new FormControl(''),
    palc : new FormControl(''),
  })
  
  ngOnInit() { 
    
  }
  

  /* identify class ItemsComponent as a ItemService injection site */
  constructor(
    protected route : ActivatedRoute,
    protected itemService : ItemService,
    protected location : Location
  ) { }

  

  save(): void {
    this.itemService.addItemLost(this.itemLost).subscribe( () => this.goBack());
  }

  goBack() : void {
    // load previous URL in history
    this.location.back();
  }
}
