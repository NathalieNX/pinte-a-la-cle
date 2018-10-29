import { Component, OnInit } from '@angular/core';
import { ItemLost } from '../item/item-lost';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-view-items-lost',
  templateUrl: './view-items-lost.component.html',
  styleUrls: ['./view-items-lost.component.css']
})
export class ViewItemsLostComponent implements OnInit {
  
  itemsLost : ItemLost[];

  /* identify class ItemsComponent as a ItemService injection site */
  constructor(private itemService : ItemService) { }

  ngOnInit() {
    this.getItemsLost();
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

  deleteItemLost(itemLost: ItemLost): void {
    this.itemsLost = this.itemsLost.filter(h => h !== itemLost);
    // If you neglect to subscribe(), the service will not send the delete request to the server! As a rule, an Observable does nothing until something subscribes!
    this.itemService.deleteItemLost(itemLost).subscribe();
  }

}

