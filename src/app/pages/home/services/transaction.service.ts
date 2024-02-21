import { Injectable, signal } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { ApiService } from '@shared/services';
import { NotificationMessageMapper } from '@shared/notifications';
import { CategoryService } from './category.service';
import { Category, Transaction } from '../intervaces';

@Injectable()
export class TransactionService {
  public transactionSig$ = signal<Transaction[]>([]);
  public transactionSig = this.transactionSig$.asReadonly();

  constructor(
    public apiService: ApiService,
    public categoryService: CategoryService
  ) {}

  public findAll(): void {
    this.apiService
      .get<Transaction[]>('transactions')
      .pipe(
        tap((transaction: Transaction[]) =>
          this.transactionSig$.set(transaction)
        ),
        catchError((err: HttpErrorResponse) => {
          return this.apiService.throwCustomErrorNotification(err);
        })
      )
      .subscribe();
  }

  public create(data: Transaction): void {
    this.apiService
      .post<Transaction>('transactions', data)
      .pipe(
        tap((newTransaction: Transaction) => {
          this.transactionSig$.update((oldState: Transaction[]) => [
            ...oldState,
            newTransaction,
          ]);
          this.apiService.throwCustomSuccessNotification(
            NotificationMessageMapper.TRANSACTION_CREATED
          );
        }),
        catchError((err: HttpErrorResponse) => {
          return this.apiService.throwCustomErrorNotification(err);
        })
      )
      .subscribe();
  }

  public delete(id: number): void {
    this.apiService
      .delete(`transactions/${id}`)
      .pipe(
        tap(() => {
          this.transactionSig$.update((transactions: Transaction[]) =>
            transactions.filter(
              (transaction: Transaction) => transaction.id !== id
            )
          );
          this.apiService.throwCustomWarningNotification(
            NotificationMessageMapper.TRANSACTION_DELETED
          );
        }),
        catchError((err: HttpErrorResponse) => {
          return this.apiService.throwCustomErrorNotification(err);
        })
      )
      .subscribe();
  }
}
