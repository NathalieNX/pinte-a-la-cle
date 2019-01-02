import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemFound } from '../item/item-found';
import { ItemService } from '../../item.service';


@Component({
  selector: 'app-form-new-item-found',
  templateUrl: './form-new-item-found.component.html',
  styleUrls: ['./form-new-item-found.component.css']
})
export class FormNewItemFoundComponent implements OnInit {

  model : ItemFound;
  submitted = false;

  constructor(
    protected route : ActivatedRoute,
    protected itemService : ItemService,
    protected location : Location
  ) { }


  ngOnInit() {
    this.model = new ItemFound;
    this.model = {
      id : 88,
      title : "itemFound88",
      photo : 0,
      contact : "contact",
      description : "description",
      date : "now",
      user : 88,
    }
  }  

  onSubmit(): void {
    this.submitted = true;
    console.log(this.model.title);
    this.itemService.addItemFound(this.model).subscribe( () => this.goBack());
  }

  goBack() : void {
    // load previous URL in history
    this.location.back();
  }
  // TODO : pass submitted status + result into calling component for adding / updating 


  // TODO : Remove this when we're done
  // get diagnostic() { return JSON.stringify(this.model); }
}
