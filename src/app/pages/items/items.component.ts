import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CategoriesService } from '../../services/categories/categories-service.service';
import { Categories } from '../../interfaces/categories';
import { Item } from '../../interfaces/item';
import { ItemsService } from '../../services/items/items.service';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { hideSuccessMessage, showSuccessMessage } from 'src/app/utlis/alertMessage';
import { idValidator } from 'src/app/utlis/validators';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {
  ItemsForm: FormGroup;
  message: string = '';
  categoriesData: Categories[] = [];
  arrowDownIcon = faChevronDown;
  constructor(private _formBuilder: FormBuilder, private _categoriesService: CategoriesService, private _itemsService: ItemsService) {
    this.ItemsForm = this._formBuilder.group({
      dynamic_field: this._formBuilder.array([]),
    });
  }

  ngOnInit() {
    this.categoriesData = this._categoriesService.getCategories();

    const ItemsData = this._itemsService.getItems();
    if (ItemsData.length > 0) {
      ItemsData.forEach((item) => {
        this.addField(item);
      });
    } else {
      this.addField();
    }
  }

  get dynamic_field(): FormArray {
    return this.ItemsForm.get('dynamic_field') as FormArray;
  }

  addField(itemdData?: Item) {
    const index = this.dynamic_field.length;
    const itemFormGroup = new FormGroup({
      id: new FormControl(itemdData ? itemdData.id : '', { validators: [Validators.required, this.uniqueIdValidator(index), Validators.min(1)] }),
      name: new FormControl(itemdData ? itemdData.name : '', { validators: [Validators.required] }),
      price: new FormControl(itemdData ? itemdData.price : '', { validators: [Validators.required, Validators.min(0)] }),
      category: new FormControl(itemdData ? itemdData.category : ''),
    });
    this.dynamic_field.push(itemFormGroup);
  }

  removeField(i: number) {
    this.dynamic_field.removeAt(i);
    this._itemsService.removeItem(i);
  }


  saveItems() {
    const itemsData = this.dynamic_field.value;

    this._itemsService.removeAllItems();

    for (const item of itemsData) {
      this._itemsService.addItem(item);
    }

    showSuccessMessage();

    setTimeout(() => {
      hideSuccessMessage();
    }, 3000);
  }

  uniqueIdValidator(index: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const fields = this.dynamic_field.value

      return idValidator(fields, index, value);

    }
  }

  hasError(index: number, controlName: string, errorType: string) {
    const control = this.dynamic_field.at(index).get(controlName);
    return control?.hasError(errorType) && control.touched;
  }
}
