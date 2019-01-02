import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Item } from '../item/item';
import { ItemLost } from '../item/item-lost';
import { ItemFound } from '../item/item-found';
import { User } from '../../user/user';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items: Item[] = [
        {id : 10,
            title : "item 0",
            photo : 0,
            contact : "me 0",
            description : "here 0",
            date : "now 0",
            user : 110,
        },
        {id : 11,
            title : "item 1test",
            photo : 1,
            contact : "me 1",
            description : "here 1",
            date : "now 1",
            user : 111,
        },
        {id : 12,
            title : "item 2",
            photo : 2,
            contact : "me 2",
            description : "here 2",
            date : "now 2",
            user : 112,
        },
        
    ];

    const itemsLost: ItemLost[] = [
        {id : 20,
            title : "lost item 0",
            photo : 0,
            contact : "me 0",
            description : "here 0",
            date : "now 0",
            user : 110,
            palc : "grim0",
        },
        {id : 21,
            title : "lost item 1",
            photo : 1,
            contact : "me 1",
            description : "here 1",
            date : "now 1",
            user : 111,
            palc : "grim1",
        },
        {id : 22,
            title : "lost item 2",
            photo : 2,
            contact : "me 2",
            description : "here 2",
            date : "now 2",
            user : 112,
            palc : "grim2",
        },
        
    ];

    const itemsFound: ItemFound[] = [
        {id : 30,
            title : "found item 0",
            photo : 0,
            contact : "me 0",
            description : "here 0",
            date : "now 0",
            user : 110,
        },
        {id : 31,
            title : "found item 1",
            photo : 1,
            contact : "me 1",
            description : "here 1",
            date : "now 1",
            user : 111,
        },
        {id : 32,
            title : "found item 2",
            photo : 2,
            contact : "me 2",
            description : "here 2",
            date : "now 2",
            user : 112,
        },
        
    ];

    const users: User[] = [
        {username : "no user",
            pwHash : "no user",
        },
        {username : "user0",
            pwHash : "a0",
        },
        {username : "user1",
            pwHash : "a1",
        },
        {username : "user2",
            pwHash : "a2",
        },
        
    ];

    return {items, itemsLost, itemsFound, users};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty, the method below returns the initial number (11).
  // If the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 11;
  }
}