import { TermsComponent } from './terms/terms.component';
import { CartState } from './../../store/cart/cart.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { BankAcceptComponent } from './bank-accept/bank-accept.component';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { OrderState } from '../../store/order/order.reducer';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnDestroy {

  cartState!: Observable<CartState>;
  orderState!: Observable<OrderState>;
  termsAccepted = false;

  routerSubscription!: Subscription;

  constructor(private store: Store<fromApp.AppState>, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.cartState = this.store.select('cart');
    this.orderState = this.store.select('order');

    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(event => { this.termsAccepted = false; });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  openBankDialog() {
    this.dialog.open(BankAcceptComponent, {
      disableClose: true,
      autoFocus: true,
      width: '500px',
    });
  }

  openTermsDialog() {
    this.dialog.open(TermsComponent, {
      disableClose: true,
      autoFocus: true,
      width: '500px',
    });
  }
}
