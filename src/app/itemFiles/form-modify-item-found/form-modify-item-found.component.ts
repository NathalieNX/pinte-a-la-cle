import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemFound } from '../item/item-found';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-form-modify-item-found',
  templateUrl: './form-modify-item-found.component.html',
  styleUrls: ['./form-modify-item-found.component.css']
})
export class FormModifyItemFoundComponent implements OnInit {

  @Input() itemFound : ItemFound;
  submitted = false;

  constructor(
    protected route : ActivatedRoute,
    protected itemService : ItemService,
    protected location : Location
  ) { }


  ngOnInit() {
    this.getItemFound();
  }  

  getItemFound() : void {
    /* route.snapshot is a static image of route info
    *  paramMap is dict of route parameter values
    *  the key id returns the id */
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItemFound(id).subscribe(itemFound => this.itemFound = itemFound);
    console.log(this.itemFound)
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.itemFound.title);
    this.itemService.updateItemFound(this.itemFound).subscribe( () => this.goBack());
  }

  goBack() : void {
    // load previous URL in history
    this.location.back();
  }

}
