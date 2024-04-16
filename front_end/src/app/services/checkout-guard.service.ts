import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CheckoutComponent } from '../checkout/checkout.component';
import * as OrderActions from '../store/order/order.actions';

@Injectable()
export class CheckoutGuardService implements CanActivate, CanActivateChild, CanDeactivate<CheckoutComponent> {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  canCheckoutOrder(): Observable<boolean> {
    return this.store.select('order')
      .pipe(
        take(1),
        map(orderState => orderState.isCheckoutActive)
      );
  }

  canCheckoutCart(): Observable<boolean> {
    return this.store.select('cart')
      .pipe(
        take(1),
        map(cartState =>!! cartState.cart && cartState.cart.cartItems.length !== 0)
      );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return forkJoin([this.canCheckoutOrder(), this.canCheckoutCart()]).pipe(
      map(([canOrder, canCart]) => canOrder && canCart || this.router.createUrlTree(['/']))
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.canActivate(route, state);
  }
  
  canDeactivate(component: CheckoutComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
    this.store.dispatch(OrderActions.isCheckoutActive({ isActive: false }));
    return true; 
  } 
}