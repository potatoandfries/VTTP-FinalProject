import { createAction, props } from '@ngrx/store';
import { HttpError } from '../app.reducer';
import { Cart } from '../../configurations/model';


export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ id: number; amount: string }>()
);
    
export const incrementCart = createAction(
  '[Cart] Increment Cart',
  props<{ id: number; amount: string }>()
);

export const decrementCart = createAction(
  '[Cart] Decrement Cart',
  props<{ id: number; amount: string }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ id: number }>()
);

export const emptyCart = createAction('[Cart] Empty Cart');

export const emptyCartSuccess = createAction('[Cart] Empty Cart Success');

export const fetchCart = createAction('[Cart] Fetch Cart');

export const fetchCartSuccess = createAction(
  '[Cart] Fetch Cart Success',
  props<{ cart: Cart; effect: string }>()
);

export const applyDiscount = createAction(
  '[Cart] Apply Discount',
  props<{ code: string }>()
);

export const applyDiscountSuccess = createAction(
  '[Cart] Apply Discount Success',
  props<{ effect: string }>()
);

export const setCart = createAction(
  '[Cart] Set Cart',
  props<{ cart: Cart; effect: string }>()
);

export const cartError = createAction(
  '[Cart] Cart Error',
  props<{ error: HttpError }>()
);
