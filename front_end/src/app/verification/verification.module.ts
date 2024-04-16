import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EmailVerificationComponent } from './email-verification/email-verification.component';

import { ReactiveFormsModule } from '@angular/forms';
import { PasswordForgotVerificationComponent } from './password-forget-verification/password-forgot-verification.component';
import { VerificationRoutes } from './verification.routes';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    RouterModule.forChild(VerificationRoutes)
  ],
  declarations: [EmailVerificationComponent, PasswordForgotVerificationComponent]
})
export class VerificationModule {
}