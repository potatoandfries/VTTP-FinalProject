import * as CartActions from './../../../store/cart/cart.actions';
import { CartState } from './../../../store/cart/cart.reducer';
import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as OrderActions from '../../../store/order/order.actions';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { OrderState } from '../../../store/order/order.reducer';
import { Cart, Checkout } from '../../../configurations/model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bank-accept',
  templateUrl: './bank-accept.component.html'
})
export class BankAcceptComponent implements OnInit {

  cartState!: Observable<CartState>;
  orderState!: Observable<OrderState>;
  postOrder!: Checkout;
  postCart!: Cart;

  constructor(
    public dialog: MatDialog,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartState = this.store.select('cart');
    this.orderState = this.store.select('order');

    this.orderState.subscribe((orderState: OrderState) => {
      if (orderState.personal) {
        this.postOrder = {
          shipName: orderState.personal.shipName || '', 
          shipAddress: orderState.shipping?.shipAddress || '', 
          billingAddress: orderState.shipping?.billingAddress || orderState.shipping?.shipAddress || '',
          city: orderState.shipping?.city || '', 
          state: orderState.shipping?.state || '', 
          zip: orderState.shipping?.zip || '',
          country: orderState.shipping?.country || '', 
          phone: orderState.personal.phone || '' 
        };
      }
    });

    this.cartState.subscribe((cartState: CartState) => {
      if (cartState.cart) {
        this.postCart = cartState.cart;
      }
    });
  }

  paymentConfirm() {
    this.cartService.confirmCart(this.postCart).pipe(
      take(1),
      catchError(error => {
        alert('An error occurred. Operation cancelled. Please try again.');
        if (error.status === 400) {
          this.store.dispatch(CartActions.fetchCart());
        }
        this.router.navigate(['/cart']);
        return throwError(error);
      })
    ).subscribe(() => {
      this.store.dispatch(OrderActions.postOrder({ data: this.postOrder }));
      this.dialog.closeAll(); 
    });
  }
}
