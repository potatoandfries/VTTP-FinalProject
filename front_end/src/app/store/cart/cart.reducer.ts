import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { Cart } from '../../configurations/model';
import { HttpError } from '../app.reducer';


export interface CartState {
  cart: Cart | null;
  errors: HttpError[];
  loading: boolean;
  fetchLoading: boolean;
}

export const initialState: CartState = {
  cart: null,
  errors: [],
  loading: true,
  fetchLoading: true,
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, CartActions.removeFromCart, CartActions.applyDiscount, 
     CartActions.incrementCart, CartActions.decrementCart, 
     state => ({ ...state, loading: false })),
  on(CartActions.fetchCart, state => ({ ...state, fetchLoading: false })),
  on(CartActions.setCart, (state, { cart, effect }) => ({
    ...state,
    cart,
    errors: state.errors.filter(error => error.errorEffect !== effect),
    loading: false,
    fetchLoading: state.fetchLoading
  })),
  on(CartActions.fetchCartSuccess, (state, { cart, effect }) => ({
    ...state,
    cart,
    errors: state.errors.filter(error => error.errorEffect !== effect),
    fetchLoading: false
  })),
  on(CartActions.applyDiscountSuccess, (state, { effect }) => ({
    ...state,
    errors: state.errors.filter(error => error.errorEffect !== effect),
    loading: false,
  })),
  on(CartActions.emptyCartSuccess, () => initialState),
  on(CartActions.cartError, (state, { error }) => ({
    ...state,
    errors: [...state.errors, error],
    loading: false,
    fetchLoading: false
  }))
);

function handleCartErrors(state: CartState, error: HttpError): HttpError[] {
  const errorIndex = state.errors.findIndex(e => e.errorEffect === error.errorEffect);
  if (errorIndex !== -1) {
    const updatedErrors = [...state.errors];
    updatedErrors[errorIndex] = error;
    return updatedErrors;
  }
  return [...state.errors, error];
}
