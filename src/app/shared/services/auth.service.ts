import { Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Subscription, tap } from 'rxjs';

import { ApiService } from './api.service';
import { AuthUser, User } from '@core/inrefaces';
import { NotificationMessageMapper } from '../notifications';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthSig$ = signal<boolean>(false);
  public isAuthSig = this.isAuthSig$.asReadonly();

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {
    const token = localStorage.getItem('token');
    this.isAuthSig$.set(!!token);
  }

  public signUp(userData: AuthUser): void {
    this.apiService
      .post(`users`, userData)
      .pipe(
        tap(() => {
          this.login(userData);
          this.apiService.throwCustomSuccessNotification(
            NotificationMessageMapper.CREATED
          );
        }),
        catchError((err: HttpErrorResponse) => {
          return this.apiService.throwCustomErrorNotification(err);
        })
      )
      .subscribe();
  }

  public login(userData: AuthUser): void {
    this.apiService
      .post<User>(`login`, userData)
      .pipe(
        tap((res: User) => {
          localStorage.setItem('token', res.accessToken);
          this.isAuthSig$.set(true);
          this.router.navigate(['']);
          this.apiService.throwCustomSuccessNotification(
            NotificationMessageMapper.LOGGED_IN
          );
        }),
        catchError((err: HttpErrorResponse) => {
          return this.apiService.throwCustomErrorNotification(err);
        })
      )
      .subscribe();
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.isAuthSig$.set(false);
    this.router.navigate(['/login']);
    this.apiService.throwCustomSuccessNotification(
      NotificationMessageMapper.LOGGED_OUT
    );
  }
}
