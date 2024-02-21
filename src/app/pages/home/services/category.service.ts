import { Injectable, signal } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationMessageMapper } from '@shared/notifications';
import { ApiService } from '@shared/services';
import { Category } from '../intervaces';

@Injectable()
export class CategoryService {
  private categoriesSig$ = signal<Category[]>([]);
  public categoriesSig = this.categoriesSig$.asReadonly();

  constructor(private apiService: ApiService) {}

  public findAll(): void {
    this.apiService
      .get<Category[]>(`categories`)
      .pipe(
        tap((categories: Category[]) => this.categoriesSig$.set(categories)),
        catchError((err: HttpErrorResponse) => {
          return this.apiService.throwCustomErrorNotification(err);
        })
      )
      .subscribe();
  }

  public create(title: string): void {
    this.apiService
      .post<Category>(`categories`, { title })
      .pipe(
        tap((newCategory: Category) => {
          this.categoriesSig$.update((categories: Category[]) => [
            ...categories,
            newCategory,
          ]);
          this.apiService.throwCustomSuccessNotification(
            NotificationMessageMapper.CATEGORY_CREATED
          );
        }),
        catchError((err: HttpErrorResponse) => {
          return this.apiService.throwCustomErrorNotification(err);
        })
      )
      .subscribe();
  }

  public update(id: number, title: string): void {
    this.apiService
      .patch<Category>(`categories/${id}`, { title })
      .pipe(
        tap(() => {
          this.categoriesSig$.update((categories: Category[]) =>
            categories.map((category: Category) =>
              category.id === id ? { ...category, title } : category
            )
          );
          this.apiService.throwCustomSuccessNotification(
            NotificationMessageMapper.CATEGORY_UPDATED
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
      .delete(`categories/${id}`)
      .pipe(
        tap(() => {
          this.categoriesSig$.update((categories: Category[]) =>
            categories.filter((category: Category) => category.id !== id)
          );
          this.apiService.throwCustomWarningNotification(
            NotificationMessageMapper.CATEGORY_DELETED
          );
        }),
        catchError((err: HttpErrorResponse) => {
          return this.apiService.throwCustomErrorNotification(err);
        })
      )
      .subscribe();
  }
}
