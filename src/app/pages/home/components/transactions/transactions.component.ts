import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CategoryService, TransactionService } from '../../services';
import { Category } from '../../intervaces';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent {
  public transactionForm: FormGroup;
  public categoriesSig = this.categoryService.categoriesSig;

  constructor(
    public categoryService: CategoryService,
    public transactionService: TransactionService
  ) {
    this.transactionForm = new FormGroup({
      title: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    } as any) as any;
  }

  public onSubmit(): void {
    if (!this.transactionForm.valid) {
      return;
    }

    const category = this.categoriesSig().find(
      (category: Category) =>
        category.id === +this.transactionForm.value.category
    );

    const transactionFormValue = {
      ...this.transactionForm.value,
      amount: +this.transactionForm.value.amount,
      category,
    };

    this.transactionService.create(transactionFormValue);
    this.transactionForm.reset();
  }
}
