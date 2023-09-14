import { Injectable } from '@angular/core';
import { Item } from '../../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private items: Item[] = [];

  constructor() {}

  getItems(): Item[] {
    return this.items;
  }

  addItem(newItem: Item) {
    const existingIdIndex = this.items.findIndex((item) => item.id === newItem.id);

    if (existingIdIndex !== -1) {
      this.items[existingIdIndex] = newItem;
    } else {
      this.items.push(newItem);
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  removeAllItems(){
    this.items = [];
  }

}
