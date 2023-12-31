import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CategoriesService } from '../../services/categories/categories-service.service';
import { Categories } from '../../interfaces/categories';
import {  showSuccessMessage } from 'src/app/utlis/alertMessage';
import { validator } from 'src/app/utlis/validators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoriesForm: FormGroup;
  message: string = '';

  constructor(private _formBuilder: FormBuilder, private _categoriesService: CategoriesService) {
    this.categoriesForm = this._formBuilder.group({
      dynamic_field: this._formBuilder.array([]),
    });
  }

  ngOnInit() {
    const categoriesData = this._categoriesService.getCategories();
    if (categoriesData.length > 0) {
      categoriesData.forEach((category) => {
        this.addField(category);
      });
    } else {
      this.addField();
    }
  }

  get dynamic_field(): FormArray {
    return this.categoriesForm.get('dynamic_field') as FormArray;
  }

  addField(categoryData?: Categories) {
    const index = this.dynamic_field.length;
    const categoryFormGroup = new FormGroup({
      id: new FormControl(categoryData?.id || '', {
        validators: [Validators.required, this.uniqueIdValidator(index),Validators.min(1)],
      }),
      name: new FormControl(categoryData?.name || '', {
        validators: [Validators.required, this.uniqueNameValidator(index)],
      }),
    });

    this.dynamic_field.push(categoryFormGroup);
  }

  removeField(i: number) {
    this.dynamic_field.removeAt(i);
    this._categoriesService.removeCategory(i);
    if(this.dynamic_field.length === 0){
      this.addField();
    }
  }

  saveCategories() {
    const categoriesData = this.dynamic_field.value;
    this._categoriesService.addCategories(categoriesData);

    this.showMessage(categoriesData);
  }

  uniqueIdValidator(index: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const fields = this.dynamic_field.value

      return validator(fields, index, value,"id");

    }
  }

  uniqueNameValidator(index: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const fields = this.dynamic_field.value

      return validator(fields, index, value,"name");
    }
  }

  hasError(index: number, controlName: string, errorName: string): boolean {
    const control = this.dynamic_field.at(index).get(controlName);
    return !!control?.hasError(errorName) && !!control.touched;
  }

  showMessage(categoriesData:Categories[]){
    if(categoriesData.length === 1){
      this.message="Category Saved Successfully";
    }else{
      this.message="Categories Saved Successfully";
    }

    showSuccessMessage();
  }
}
