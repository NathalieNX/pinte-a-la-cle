import { Component, OnInit } from '@angular/core';
import { ItemLost } from '../item/item-lost';

@Component({
  selector: 'app-form-item-lost',
  templateUrl: './form-item-lost.component.html',
  styleUrls: ['./form-item-lost.component.css']
})
export class FormItemLostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // TODO : make model an input and reuse this template for editing as well as making new
  model = new ItemLost;

  submitted = false;

  // TODO : pass submitted status + result into calling component for adding / updating 
  onSubmit() { this.submitted = true; }

  // TODO : Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
