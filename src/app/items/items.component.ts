import { Component, OnInit } from '@angular/core';
import { Item } from '../item/item';
import { ITEMS } from '../itemList/itemList';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items = ITEMS;

  item : Item = {
    title : 'My item'
    photo : 1,
    email : 'a@b.c',
    phoneNumber : 33605040302,
    where : 0,
    whereDescript : 'here'
  };
  
  constructor() { }

  ngOnInit() {
  }

}
