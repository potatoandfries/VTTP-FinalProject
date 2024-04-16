import { CartState } from '../store/cart/cart.reducer';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as CartActions from '../store/cart/cart.actions';
import { Observable, Subscription, throwError } from 'rxjs';
import { LocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import { ProductDetail, ProductVariantDetails } from '../configurations/model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  paramSubscription!: Subscription;
  product!: ProductDetail;
  activeProductVariant!: ProductVariantDetails;
  cartState!: Observable<CartState>;
  innerLoading = true;
  productUrl!: string;
  variant!: number;
  isPopState = false;
  fetchError: HttpErrorResponse | null = null;
  routerSubscription!: Subscription;
  activeTab = 0;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private locStrat: LocationStrategy,
    private productService: ProductService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.locStrat.onPopState(() => {
      this.isPopState = true;
    });

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (!this.isPopState) {
          window.scrollTo(0, 0);
        }
        this.isPopState = false;
      }
    });

    this.cartState = this.store.select('cart');
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.productUrl = params['productUrl'];

      this.innerLoading = true;
      this.productService.getFullProduct(this.productUrl)
        .pipe(
          take(1), 
          catchError(error => {
            this.fetchError = error;
            this.innerLoading = false;
            return throwError(error);
          })
        )
        .subscribe((data: ProductDetail) => {
          this.product = data;
          this.variant = params['variant'] ? parseInt(params['variant']) : this.product.productVariantDetails[0].id;
          this.activeProductVariant = data.productVariantDetails.find(p => p.id === this.variant) || data.productVariantDetails[0];
          this.innerLoading = false;
        });
    });
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  setActiveTab(tab: number) {
    this.activeTab = tab;
  }

  setActiveVariant(variantId: number) {
    this.router.navigate(['/detail/', this.productUrl, variantId]);
  }

  addToCart(amountElement: HTMLInputElement) {
    const amount = amountElement.value;
    const reg = new RegExp('^[0-9]+$');
    if (!reg.test(amount) || parseInt(amount) === 0) {
      alert('Please enter a valid amount.');
      return;
    }

    this.store.select('auth')
      .pipe(take(1))
      .subscribe(authData => {
        if (authData.authenticated) {
          this.store.dispatch(CartActions.addToCart({ id: this.activeProductVariant.id, amount: amountElement.value }));
        } else {
          this.router.navigate(['/login']);
        }
      });
  }
}
