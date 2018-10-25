import { Component, OnInit } from '@angular/core';
import { Item } from '../item/item';
import { ItemLost } from '../item/item-lost';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items : Item[] = [];
  itemsLost : ItemLost[] = [];

  constructor(private itemService : ItemService) { }

  ngOnInit() {
    this.getItems();
    this.getItemsLost();
  }

  getItems() : void {
    this.itemService.getItems().subscribe(items => this.items = items.slice(1,5));
  }

  getItemsLost() : void {
    this.itemService.getItemsLost().subscribe(itemsLost => this.itemsLost = itemsLost.slice(1,5));
  }
}

