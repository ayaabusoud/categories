import { Injectable } from '@angular/core';
import { Categories } from '../../interfaces/categories';

@Injectable({
  providedIn: 'root',
})

export class CategoriesService {
  private categories: Categories[] = [];

  constructor() {}

  getCategories(): Categories[] {
    return this.categories;
  }

  addCategory(newCategory: Categories) {
    const existingIndex = this.categories.findIndex(
      (category) => category.id === newCategory.id || category.name === newCategory.name
    );

    if (existingIndex !== -1) {
      this.categories[existingIndex] = newCategory;
    } else {
      this.categories.push(newCategory);
    }
  }

  addCategories(categoriesData: Categories[]) {
    for (const category of categoriesData) {
      this.categories.push(category);
    }
  }

  removeCategory(index: number) {
    this.categories.splice(index, 1);
  }

  removeAllCategories() {
    this.categories = []
  }
}
