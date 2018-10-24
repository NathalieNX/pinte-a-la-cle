import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Item } from '../item/item';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items: Item[] = [
        {id : 0,
            title : "item 0",
            photo : 0,
            contact : "me 0",
            description : "here 0",
            date : "now 0",
        },
        {id : 1,
            title : "item 1",
            photo : 1,
            contact : "me 1",
            description : "here 1",
            date : "now 1",
        },
        {id : 2,
            title : "item 2",
            photo : 2,
            contact : "me 2",
            description : "here 2",
            date : "now 2",
        },
        
    ];
    return {items};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty, the method below returns the initial number (11).
  // If the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 11;
  }
}