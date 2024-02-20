import { Injectable, signal } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { ApiService } from '@shared/services';
import { Category } from '../intervaces';
import { NotificationMessageMapper } from '@shared/notifications';

@Injectable()
export class CategoryService {
  private categoriesSig$ = signal<Category[]>([]);
  public categoriesSig = this.categoriesSig$.asReadonly();

  constructor(private apiService: ApiService) {}

  public findAll(): void {
    this.apiService
      .get<Category[]>(`categories`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return this.apiService.throwCustomErrorNotification(err);
        })
      )
      .subscribe((categories: Category[]) => {
        this.categoriesSig$.set(categories);
      });
  }

  public create(title: string): void {
    this.apiService
      .post<Category>(`categories`, { title })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return this.apiService.throwCustomErrorNotification(err);
        })
      )
      .subscribe((newCategory: Category) => {
        this.categoriesSig$.update((categories: Category[]) => [
          ...categories,
          newCategory,
        ]);
        this.apiService.throwCustomSuccessNotification(
          NotificationMessageMapper.CATEGORY_CREATED
        );
      });
  }

  public update(id: number, title: string): void {
    this.apiService
      .patch<Category>(`categories/${id}`, { title })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return this.apiService.throwCustomErrorNotification(err);
        })
      )
      .subscribe(() => {
        this.categoriesSig$.update((categories: Category[]) =>
          categories.map((category: Category) =>
            category.id === id ? { ...category, title } : category
          )
        );
        this.apiService.throwCustomSuccessNotification(
          NotificationMessageMapper.CATEGORY_UPDATED
        );
      });
  }

  public delete(id: number): void {
    this.apiService
      .delete(`categories/${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return this.apiService.throwCustomErrorNotification(err);
        })
      )
      .subscribe(() => {
        this.categoriesSig$.update((categories: Category[]) =>
          categories.filter((category: Category) => category.id !== id)
        );
        this.apiService.throwCustomWarningNotification(
          NotificationMessageMapper.CATEGORY_DELETED
        );
      });
  }
}
