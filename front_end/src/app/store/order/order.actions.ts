import { createAction, props } from '@ngrx/store';
import { Checkout, Payment, Personal, Shipping } from '../../configurations/model';
import { HttpError } from '../app.reducer';


export const isCheckoutActive = createAction(
  '[Order] Is Checkout Active',
  props<{ isActive: boolean }>()
);

export const setCheckoutStep = createAction(
  '[Order] Set Checkout Step',
  props<{ step: number }>()
);

export const postPersonal = createAction(
  '[Order] Post Personal',
  props<{ personal: Personal }>()
);

export const postShipping = createAction(
  '[Order] Post Shipping',
  props<{ shipping: Shipping }>()
);

export const postPayment = createAction(
  '[Order] Post Payment',
  props<{ payment: Payment }>()
);

export const postOrder = createAction(
  '[Order] Post Order',
  props<{ data: Checkout }>()
);

export const emptyOrder = createAction('[Order] Empty Order');

export const orderError = createAction(
  '[Order] Order Error',
  props<{ error: HttpError }>()
);