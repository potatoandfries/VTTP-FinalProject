import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../store/auth/auth.actions';
import { TokenService } from './token.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private store: Store<fromApp.AppState>, 
    private tokenService: TokenService, 
    private router: Router
  ) {}

  addTokenToHeader(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
    // Ensuring a token is provided; otherwise, fallback to existing token
    const authToken = token ? `Bearer ${token}` : `Bearer ${this.tokenService.getToken()}`;
    return request.clone({ setHeaders: { Authorization: authToken } });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    if (!request.url.includes('/public/') && !request.url.includes('oauth')) {
      return next.handle(this.addTokenToHeader(request, null)).pipe(
        catchError(error => {
          if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            this.store.dispatch(AuthActions.signOut());
          }

          if (error && error.status === 401 && error.error && error.error.error === 'invalid_token') {
            return this.handle401Error(request, next);
          }

          return throwError(error);
        })
      );
    } else {
      return next.handle(request);
    }
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);

      return this.tokenService.obtainAccessTokenWithRefreshToken(this.tokenService.getRefreshToken()).pipe(
        switchMap((response: any) => { 
          const newToken = response.access_token; // Assuming the token is in the access_token property
          if (newToken) {
            this.tokenService.saveToken({access_token: newToken});
            this.tokenSubject.next(newToken);
            return next.handle(this.addTokenToHeader(request, newToken));
          }

          
          this.store.dispatch(AuthActions.signOut());
          return of(); 
        }),
        catchError(() => {
          this.router.navigate(['/login']);
          return of(AuthActions.signOut());
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(newToken => newToken !== null),
        take(1),
        switchMap(newToken => {
          return next.handle(this.addTokenToHeader(request, newToken));
        }),
        catchError(() => {
          this.store.dispatch(AuthActions.signOut());
          return of();
        })
      );
    }
  }
}