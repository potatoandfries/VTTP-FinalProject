
import { HelpComponent } from './help/help.component';
import { InformationComponent } from './information/information.component';
import { AddressComponent } from './address/address.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { RouterModule } from '@angular/router';
import { AccountRoutes } from './account.routes';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import { ResetDetailsComponent } from './information/reset-details/reset-details.component';
import { ResetPasswordComponent } from './information/reset-password/reset-password.component';
import { AuthGuardService } from '../services/auth-guard.service';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AccountRoutes),
    ReactiveFormsModule,
    MatPaginatorModule
    
    
  ],
  declarations: [AccountComponent, ListOrdersComponent, AddressComponent, HelpComponent,
    InformationComponent, ResetPasswordComponent, ResetDetailsComponent],
  providers:  [AuthGuardService]
})
export class AccountModule {
}
