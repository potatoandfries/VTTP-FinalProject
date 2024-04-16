import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { AccountService } from '../../services/account.service';
import { checkIfBlankValidator } from '../../customValidators/blankVal';
import { passwordMatchCheckValidator } from '../../customValidators/passVal';

@Component({
  selector: 'app-password-forgot-verification',
  templateUrl: './password-forgot-verification.component.html',
  styleUrls: ['./password-forgot-verification.component.css'] // Make sure the file extension matches your style file.
})
export class PasswordForgotVerificationComponent implements OnInit, OnDestroy {
  isVerified: boolean = false;
  authSubscription!: Subscription;
  forgotPasswordResetForm!: FormGroup;
  passwordForgotToken!: string;

  constructor(
    private fb: FormBuilder,  
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.extractToken();
    this.verifyToken();
  }

  private initForm(): void {
    this.forgotPasswordResetForm = this.fb.group({
      newPasswordGroup: this.fb.group({
        newPassword: ['', [Validators.required, checkIfBlankValidator, Validators.minLength(6)]],
        newPasswordConfirm: ['', [Validators.required, checkIfBlankValidator, Validators.minLength(6)]]
      }, { validators: passwordMatchCheckValidator })
    });
  }

  private extractToken(): void {
    this.passwordForgotToken = this.route.snapshot.queryParams['token'];
  }

  private verifyToken(): void {
    if (!this.passwordForgotToken) {
      this.isVerified = false;
      return;
    }

    this.accountService.forgotPasswordConfirm(this.passwordForgotToken)
      .pipe(
        take(1),
        catchError(error => {
          this.isVerified = false;
          console.error('Verification error:', error);
          return throwError(() => error); 
        })
      )
      .subscribe({
        next: () => this.isVerified = true,
        error: error => console.error('Subscription error during verification:', error)
      });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  onForgotPasswordResetFormSubmit(): void {
    if (this.forgotPasswordResetForm.invalid) {
      return;
    }

    const newPassword = this.forgotPasswordResetForm.value.newPasswordGroup.newPassword;
    const confirmPassword = this.forgotPasswordResetForm.value.newPasswordGroup.newPasswordConfirm;

    this.accountService.forgotPasswordReset(this.passwordForgotToken, newPassword, confirmPassword)
      .pipe(
        take(1),
        catchError(error => {
          console.error('Reset error:', error);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: error => console.error('Subscription error:', error)
      });
  }

  isControlInvalid(controlPath: string): boolean {
    const control = this.forgotPasswordResetForm.get(controlPath);
    return control ? control.invalid && control.touched : false;
  }
  
  hasControlError(controlPath: string, errorType: string): boolean {
    const control = this.forgotPasswordResetForm.get(controlPath);
    return control ? control.hasError(errorType) && control.touched : false;
  }
}
