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

  addItems(newItems: Item[]){
    this.items = newItems;
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }
}
