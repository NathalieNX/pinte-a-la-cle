import { Component, OnInit } from '@angular/core';
import { Item } from '../item/item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items : Item[];

  /* identify class ItemsComponent as a ItemService injection site */
  constructor(private itemService : ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    /* wait until Observable getItems() is successful
    *  then execute function passed in callback : given items, assign items to this.items  */
    this.itemService.getItems().subscribe(items => this.items = items);
  }

}
