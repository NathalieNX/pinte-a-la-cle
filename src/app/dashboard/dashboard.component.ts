import { Component, OnInit } from '@angular/core';
import { Item } from '../itemFiles/item/item';
import { ItemLost } from '../itemFiles/item/item-lost';
import { ItemFound } from '../itemFiles/item/item-found';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items : Item[] = [];
  itemsLost : ItemLost[] = [];
  itemsFound : ItemFound[] = [];

  constructor(private itemService : ItemService) { }

  ngOnInit() {
    this.getItems();
    this.getItemsLost();
    this.getItemsFound();
  }

  getItems() : void {
    this.itemService.getItems().subscribe(items => this.items = items.slice(1,5));
  }

  getItemsLost() : void {
    this.itemService.getItemsLost().subscribe(itemsLost => this.itemsLost = itemsLost.slice(1,5));
  }

  getItemsFound() : void {
    this.itemService.getItemsFound().subscribe(itemsFound => this.itemsFound = itemsFound.slice(1,5));
  }
}

