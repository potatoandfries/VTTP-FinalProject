import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { HttpError } from '../app.reducer';

export interface AuthState {
  authenticated: boolean;
  isActive: boolean;
  errors: HttpError[];
  loading: boolean;
}

export const initialState: AuthState = {
  authenticated: false,
  isActive: true,
  errors: [],
  loading: true,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signIn, (state) => ({ ...state, loading: true })),
  on(AuthActions.signOut, (state) => ({ ...state, loading: true })),
  on(AuthActions.signUp, (state) => ({ ...state, loading: true })),
  on(AuthActions.signInSuccess, (state, { effect }) => ({
    ...state,
    authenticated: true,
    errors: state.errors.filter(error => error.errorEffect !== effect),
    loading: false,
  })),
  on(AuthActions.signUpSuccess, (state, { effect }) => ({
    ...state,
    errors: state.errors.filter(error => error.errorEffect !== effect),
    loading: false,
  })),
  on(AuthActions.signOutSuccess, (state, { effect }) => ({
    ...state,
    authenticated: false,
    errors: state.errors.filter(error => error.errorEffect !== effect),
    loading: false,
  })),
  on(AuthActions.authError, (state, { error }) => ({
    ...state,
    loading: false,
    errors: [...state.errors, error],
  })),
  on(AuthActions.fetchVerificationStatusSuccess, (state, { status }) => ({
    ...state,
    isActive: status,
  }))
);
