import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemLost } from '../item/item-lost';
import { ItemService } from '../../item.service';


@Component({
  selector: 'app-form-new-item-lost',
  templateUrl: './form-new-item-lost.component.html',
  styleUrls: ['./form-new-item-lost.component.css']
})
export class FormNewItemLostComponent implements OnInit {

  model : ItemLost;
  submitted = false;

  constructor(
    protected route : ActivatedRoute,
    protected itemService : ItemService,
    protected location : Location
  ) { }


  ngOnInit() {
    this.model = new ItemLost;
    this.model = {
      id : 88,
      title : "itemLost88",
      photo : 0,
      contact : "contact",
      description : "description",
      date : "now",
      user : 88,
      palc : "palc"
    }
  }  

  onSubmit(): void {
    this.submitted = true;
    console.log(this.model.title);
    this.itemService.addItemLost(this.model).subscribe( () => this.goBack());
  }

  goBack() : void {
    // load previous URL in history
    this.location.back();
  }
  // TODO : pass submitted status + result into calling component for adding / updating 


  // TODO : Remove this when we're done
  // get diagnostic() { return JSON.stringify(this.model); }
}
