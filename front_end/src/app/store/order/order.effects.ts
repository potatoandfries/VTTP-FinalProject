import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as OrderActions from './order.actions';
import * as CartActions from '../cart/cart.actions'; // Ensure this is updated to use createAction

import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrderService } from '../../services/order.service';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private orderService: OrderService, private router: Router) {}

  postOrder$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.postOrder),
    switchMap(({ data }) =>
      this.orderService.postOrder(data).pipe(
        switchMap(() => {
          this.router.navigate(['/checkout/success']);
          return [
            OrderActions.emptyOrder(),
            CartActions.emptyCartSuccess() 
          ];
        }),
        catchError(error => of(OrderActions.orderError({ error })))
      )
    )
  ));
}