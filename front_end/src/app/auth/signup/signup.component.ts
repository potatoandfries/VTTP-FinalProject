import { AuthState } from './../../store/auth/auth.reducer';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Observable } from 'rxjs';
import { passwordMatchCheckValidator } from '../../customValidators/passVal';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';

  authState!: Observable<AuthState>;


  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      passwordGroup: new FormGroup({
        newPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(52)]),
        newPasswordConfirm: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(52)]),
      }, passwordMatchCheckValidator.bind(this))
    });

    this.authState = this.store.select('auth');
  }


  onSubmitted() {
    this.store.dispatch(AuthActions.signUp(
      {
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.passwordGroup.newPassword,
        passwordRepeat: this.signUpForm.value.passwordGroup.newPasswordConfirm
      }));
  }

}
