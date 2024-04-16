import { Component } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as OrderActions from '../../store/order/order.actions';
import * as fromApp from '../../store/app.reducer';
import { PaymentService } from '../../services/payment.service';
import { config } from '../../configurations/local';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
 
  stripe: Stripe | null = null;
  card: StripeCardElement | null = null;
  apikey: string = config.StripesKey; // Access StripesKey from config


  constructor(
    private store: Store<fromApp.AppState>,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  async ngOnInit() {

    this.store.dispatch(OrderActions.setCheckoutStep({ step: 2 }));
    this.stripe = await loadStripe(this.apikey);

    if (this.stripe) {
      const elements = this.stripe.elements();
      this.card = elements.create('card');
      this.card.mount('#card-element');
    }
  }

  async onSubmit() {
    if (this.stripe && this.card) {
      const { paymentMethod, error } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.card,
      });

      if (error) {
        console.error(error);
      } else if (paymentMethod) {
        const userId = localStorage.getItem('user_id');
        const access_token = localStorage.getItem('access_token');

        if (userId !== null && access_token !== null) {
          this.paymentService.checkout(userId, access_token, paymentMethod.id).subscribe(
            (response) => {
              alert("Payment successful!");
              this.router.navigate(['/checkout/shipping']);
              console.log(response);
            },
            (error) => {
              console.error(error);
            }
          );
        }
      }
    }
  }
}
