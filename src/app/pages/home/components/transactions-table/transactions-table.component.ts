import { Component } from '@angular/core';
import { TransactionService } from '../../services';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TransactionType } from '../../enums';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
})
export class TransactionsTableComponent {
  public transactionSig = this.transactionService.transactionSig;
  public readonly trashIcon = faTrash;
  public readonly transactionType = TransactionType;

  constructor(private transactionService: TransactionService) {
    this.transactionService.findAll();
  }

  public handleDelete(id: number): void {
    this.transactionService.delete(id);
  }
}
