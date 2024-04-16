import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import * as CartActions from '../cart/cart.actions';
import * as OrderActions from '../order/order.actions';
import * as ShowcaseActions from '../showcase/showcase.actions';
import { TokenService } from '../../services/token.service';
import { AccountService } from '../../services/account.service';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private tokenService: TokenService,
    private router: Router,
    private accountService: AccountService
  ) {}

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap((action) =>
        this.accountService.createAccount(action.email, action.password, action.passwordRepeat).pipe(
          switchMap((res) => [
            AuthActions.signUpSuccess({ effect: '[Auth] Sign Up' }),
            AuthActions.signIn({ email: action.email, password: action.password })
          ]),
          catchError((error) => of(AuthActions.authError({ error })))
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap((action) =>
        this.tokenService.obtainAccessToken(action.email, action.password).pipe(
          switchMap((res) => {
            this.tokenService.saveToken(res);
            this.router.navigate(['/']);
            return [
              AuthActions.signInSuccess({ effect: '[Auth] Sign In' }),
              AuthActions.fetchVerificationStatus()
            ];
          }),
          catchError((error) => of(AuthActions.authError({ error })))
        )
      )
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      concatMap(() => {
        this.tokenService.removeToken();
        return [
          AuthActions.signOutSuccess({ effect: '[Auth] Sign Out' }), // Adjusted payload to include 'effect'
          CartActions.emptyCartSuccess(),
          OrderActions.emptyOrder(),
          ShowcaseActions.emptyInterested()
        ];
      })
    )
  );

  checkIfLoggedIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkIfLoggedIn),
      switchMap(() => {
        if (this.tokenService.checkIfTokenExists()) {
          return [
            AuthActions.signInSuccess({ effect: '[Auth] Sign In Success' }),
            AuthActions.fetchVerificationStatus()
          ];
        }
        return [AuthActions.signOutSuccess({ effect: '[Auth] Sign Out' })]; 
      })
    )
  );

  fetchVerificationStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.fetchVerificationStatus),
      switchMap(() =>
        this.accountService.getVerificationStatus().pipe(
          map((data) => AuthActions.fetchVerificationStatusSuccess({ status: data })), 
          catchError((error) => of(AuthActions.authError({ error })))
        )
      )
    )
  );
}
