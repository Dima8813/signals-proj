import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { baseHref } from '../../constants';

interface HttpClientGetOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] } | undefined;
  params?: HttpParams;
  responseType?: any;
  observe?: any;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public get hostUrl(): string {
    return baseHref;
  }

  constructor(
    private readonly httpService: HttpClient,
    private readonly toaster: ToastrService
  ) {}

  public get<T>(subUrl: string, params?: HttpClientGetOptions): Observable<T> {
    const url = this.getFullUrl(subUrl);

    return this.httpService.get<T>(url, params);
  }

  public post<T>(subUrl: string, data?: unknown): Observable<T> {
    const url = this.getFullUrl(subUrl);

    return this.httpService.post<T>(url, data);
  }

  public patch<T>(subUrl: string, data?: unknown): Observable<T> {
    const url = this.getFullUrl(subUrl);

    return this.httpService.patch<T>(url, data);
  }

  public put<T>(subUrl: string, data: unknown): Observable<T> {
    const url = this.getFullUrl(subUrl);

    return this.httpService.put<T>(url, data);
  }

  public delete<T>(subUrl: string, params?: any): any {
    const url = this.getFullUrl(subUrl);

    return this.httpService.delete<T>(url, params);
  }

  public throwCustomSuccessNotification(
    successMessage?: string
  ): Observable<never> {
    this.toaster.success(successMessage || 'Successfully');
    return EMPTY;
  }

  public throwCustomWarningNotification(
    successMessage?: string
  ): Observable<never> {
    this.toaster.warning(successMessage || 'Warning');
    return EMPTY;
  }

  public throwCustomErrorNotification(
    error: HttpErrorResponse | string
  ): Observable<never> {
    this.toaster.error(
      (typeof error === 'string' ? error : error?.message) ||
        'Some other error occurred'
    );
    return throwError(
      () =>
        new Error(
          (typeof error === 'string' ? error : error.message) ||
            'Some other error occurred'
        )
    );
  }

  private getFullUrl(subUrl: string): string {
    return `${this.hostUrl}${subUrl}`;
  }
}
