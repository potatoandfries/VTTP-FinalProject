import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';
import { Payment, Personal, Shipping } from '../../configurations/model';
import { HttpError } from '../app.reducer';

export interface OrderState {
  personal: Personal | null;
  shipping: Shipping | null;
  payment: Payment | null;
  checkoutStep: number;
  isCheckoutActive: boolean;
  errors: HttpError[];
}

export const initialState: OrderState = {
  personal: null,
  shipping: null,
  payment: null,
  checkoutStep: 0,
  isCheckoutActive: true,
  errors: [],
};

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.postPersonal, (state, { personal }) => ({
    ...state,
    personal,
    errors: state.errors.filter(error => error.errorEffect !== '[Order] Post Personal'),
  })),
  on(OrderActions.postShipping, (state, { shipping }) => ({
    ...state,
    shipping,
    errors: state.errors.filter(error => error.errorEffect !== '[Order] Post Shipping'),
  })),
  on(OrderActions.postPayment, (state, { payment }) => ({
    ...state,
    payment,
    errors: state.errors.filter(error => error.errorEffect !== '[Order] Post Payment'),
  })),
  on(OrderActions.setCheckoutStep, (state, { step }) => ({
    ...state,
    checkoutStep: step,
  })),
  on(OrderActions.isCheckoutActive, (state, { isActive }) => ({
    ...state,
    isCheckoutActive: isActive,
  })),
  on(OrderActions.orderError, (state, { error }) => ({
    ...state,
    errors: [...state.errors, error],
  })),
  on(OrderActions.emptyOrder, state => ({
    ...initialState,
    isCheckoutActive: state.isCheckoutActive, 
  }))
);

function updateErrors(state: OrderState, error: HttpError, actionType: string): HttpError[] {
  return state.errors.filter(e => e.errorEffect !== actionType).concat([error]);
}