import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Method } from '@core/enums';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../../services';

type CategoryControls = { ['title']: AbstractControl };
type CategoryFormGroup = FormGroup & {
  value: 'title';
  controls: CategoryControls;
};

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  public categoriesSig = this.categoryService.categoriesSig;
  public categoryId = 0;
  public categoryTitle = '';
  public method: Method = Method.Create;
  public categoryForm: FormGroup;

  public readonly methodEnum = Method;
  public readonly removeIcon = faRemove;
  public readonly editIcon = faEdit;

  constructor(private categoryService: CategoryService) {
    this.categoryForm = new FormGroup({
      title: new FormControl('', Validators.required),
    } as CategoryControls) as CategoryFormGroup;
    this.categoryService.findAll();
  }

  public onSubmit(): void {
    if (!this.categoryForm.valid) {
      return;
    }

    const currentTitle = this.categoryForm.value['title'];

    if (this.method === Method.Create) {
      this.categoryService.create(currentTitle);
    } else {
      this.categoryService.update(this.categoryId, currentTitle);
      this.method = Method.Create;
    }
    this.categoryForm.reset();
  }

  public handleDelete(id: number): void {
    this.categoryService.delete(id);
  }

  public handleEdit(id: number, title: string): void {
    this.categoryId = id;
    this.categoryTitle = title;
    this.categoryForm.setValue({ title });
    this.method = Method.Update;
  }
}
