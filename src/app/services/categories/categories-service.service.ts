import { Injectable } from '@angular/core';
import { Categories } from '../../interfaces/categories';

@Injectable({
  providedIn: 'root',
})

export class CategoriesService {
  private categories: Categories[] = [];

  constructor() { }

  getCategories(): Categories[] {
    return this.categories;
  }

  addCategories(categoriesData: Categories[]) {
    this.categories = categoriesData;
  }

  removeCategory(index: number) {
    this.categories.splice(index, 1);
  }

}
