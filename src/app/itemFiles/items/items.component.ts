import { Component, OnInit } from '@angular/core';
import { Item } from '../item/item';
import { ItemLost } from '../item/item-lost';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items : Item[];
  itemsLost : ItemLost[];

  /* identify class ItemsComponent as a ItemService injection site */
  constructor(private itemService : ItemService) { }

  ngOnInit() {
    this.getItems();
    //this.getItemsLost();
  }

  getItems(): void {
    /* wait until Observable getItems() is successful
    *  then execute function passed in callback : given items, assign items to this.items  */
    this.itemService.getItems().subscribe(items => this.items = items);
  }

  getItemsLost(): void {
    /* wait until Observable getItems() is successful
    *  then execute function passed in callback : given items, assign items to this.items  */
    this.itemService.getItemsLost().subscribe(itemsLost => this.itemsLost = itemsLost);
  }

  addItem(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.itemService.addItem({ title } as Item)
      // When addItem saves successfully, subscribe callback receives new item and pushes it into to items list for display
      .subscribe(item => {      
        this.items.push(item);
      });
  }

  addItemLost(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.itemService.addItemLost({ title } as ItemLost)
      // When addItemLost saves successfully, subscribe callback receives new item and pushes it into to items list for display
      .subscribe(itemLost => {      
        this.itemsLost.push(itemLost);
      });
  }

  deleteItem(item: Item): void {
    this.items = this.items.filter(h => h !== item);
    // If you neglect to subscribe(), the service will not send the delete request to the server! As a rule, an Observable does nothing until something subscribes!
    this.itemService.deleteItem(item).subscribe();
  }

  deleteItemLost(itemLost: ItemLost): void {
    this.itemsLost = this.itemsLost.filter(h => h !== itemLost);
    // If you neglect to subscribe(), the service will not send the delete request to the server! As a rule, an Observable does nothing until something subscribes!
    this.itemService.deleteItemLost(itemLost).subscribe();
  }

}
