import { CartComponent } from './cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { CartRoutes } from './cart.routes';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { InterestedComponent } from './interested/interested.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CartRoutes),
    ReactiveFormsModule,
    
  ],
  declarations: [CartComponent, EmptyCartComponent, InterestedComponent]
})
export class CartModule {
}
