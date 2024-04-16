import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CartActions from './cart.actions';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private cartService: CartService, private router: Router) {}

  fetchCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.fetchCart),
    switchMap(() => this.cartService.getCart().pipe(
      map(cart => CartActions.fetchCartSuccess({ cart, effect: '[Cart] Fetch Cart' })),
      catchError(error => of(CartActions.cartError({ error })))
    ))
  ));

  addToCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.addToCart),
    switchMap(({ id, amount }) => this.cartService.postCart(id, amount).pipe(
      map(cart => {
        this.router.navigate(['/cart']);
        return CartActions.setCart({ cart, effect: '[Cart] Add To Cart' });
      }),
      catchError(error => of(CartActions.cartError({ error })))
    ))
  ));

  incrementCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.incrementCart),
    switchMap(({ id, amount }) => this.cartService.incrementCartItem(id, amount).pipe(
      map(cart => CartActions.setCart({ cart, effect: '[Cart] Increment Cart' })),
      catchError(error => of(CartActions.cartError({ error })))
    ))
  ));

  decrementCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.decrementCart),
    switchMap(({ id, amount }) => this.cartService.decrementCartItem(id, amount).pipe(
      map(cart => CartActions.setCart({ cart, effect: '[Cart] Decrement Cart' })),
      catchError(error => of(CartActions.cartError({ error })))
    ))
  ));

  removeFromCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.removeFromCart),
    switchMap(({ id }) => this.cartService.removeFromCart(id).pipe(
      map(cart => CartActions.setCart({ cart, effect: '[Cart] Remove From Cart' })),
      catchError(error => of(CartActions.cartError({ error })))
    ))
  ));

  applyDiscountCode$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.applyDiscount),
    switchMap(({ code }) => this.cartService.applyDiscount(code).pipe(
      switchMap(cart => [
        CartActions.applyDiscountSuccess({ effect: '[Cart] Apply Discount' }),
        CartActions.fetchCart() 
      ]),
      catchError(error => of(CartActions.cartError({ error })))
    ))
  ));

  emptyCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.emptyCart),
    switchMap(() => this.cartService.emptyCart().pipe(
      map(() => CartActions.emptyCartSuccess()),
      catchError(error => of(CartActions.cartError({ error })))
    ))
  ));
}
