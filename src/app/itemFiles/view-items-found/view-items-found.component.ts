import { Component, OnInit } from '@angular/core';
import { ItemFound } from '../item/item-found';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-view-items-found',
  templateUrl: './view-items-found.component.html',
  styleUrls: ['./view-items-found.component.css']
})
export class ViewItemsFoundComponent implements OnInit {
  
  itemsFound : ItemFound[];

  /* identify class ItemsComponent as a ItemService injection site */
  constructor(private itemService : ItemService) { }

  ngOnInit() {
    this.getItemsFound();
  }

  getItemsFound(): void {
    /* wait until Observable getItems() is successful
    *  then execute function passed in callback : given items, assign items to this.items  */
    this.itemService.getItemsFound().subscribe(itemsFound => this.itemsFound = itemsFound);
  }

  /*
  addItemFound(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.itemService.addItemFound({ title } as ItemFound)
      // When addItemFound saves successfully, subscribe callback receives new item and pushes it into to items list for display
      .subscribe(itemFound => {      
        this.itemsFound.push(itemFound);
      });
  }
  */

  modifyItemFound(itemFound: ItemFound): void {
    this.itemsFound = this.itemsFound.filter(h => h !== itemFound);
    // If you neglect to subscribe(), the service will not send the modify request to the server! As a rule, an Observable does nothing until something subscribes!
    // When updateItemFound saves successfully, subscribe callback receives new item and pushes it into to items list for display
    this.itemService.updateItemFound(itemFound).subscribe(itemFound => {this.itemsFound.push(itemFound);
    });
  }

  deleteItemFound(itemFound: ItemFound): void {
    this.itemsFound = this.itemsFound.filter(h => h !== itemFound);
    // If you neglect to subscribe(), the service will not send the delete request to the server! As a rule, an Observable does nothing until something subscribes!
    this.itemService.deleteItemFound(itemFound).subscribe();
  }

}

