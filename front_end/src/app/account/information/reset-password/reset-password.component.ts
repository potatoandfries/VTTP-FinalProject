import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { checkIfBlankValidator } from '../../../customValidators/blankVal';
import { passwordMatchCheckValidator } from '../../../customValidators/passVal';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  innerLoading = false;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required, checkIfBlankValidator, Validators.minLength(6), Validators.maxLength(52)]),
      newPasswordGroup: new FormGroup({
        newPassword: new FormControl(null, [Validators.required, checkIfBlankValidator, Validators.minLength(6), Validators.maxLength(52)]),
        newPasswordConfirm: new FormControl(null, [Validators.required, checkIfBlankValidator, Validators.minLength(6)])
      }, passwordMatchCheckValidator),
    });
  }

  onSubmitResetPassword() {
    this.innerLoading = true;
    this.accountService.resetPassword(
      this.resetPasswordForm.value.oldPassword,
      this.resetPasswordForm.value.newPasswordGroup.newPassword,
      this.resetPasswordForm.value.newPasswordGroup.newPasswordConfirm)
      .pipe(take(1), catchError(
        error => {
          this.innerLoading = false;
          alert('Error resetting password. Please try again.');
          return throwError(error);
        }
      ))
      .subscribe(res => {
        this.innerLoading = false;
        alert('Success! Your password has been changed.');
        this.resetPasswordForm.reset();
      });
  }

}