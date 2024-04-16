import { createAction, props } from '@ngrx/store';
import { Product, ProductVariantResponse } from '../../configurations/model';
import { HttpError } from '../app.reducer';


export const fetchNewlyAdded = createAction('[Showcase] Fetch Newly Added');

export const fetchNewlyAddedSuccess = createAction(
  '[Showcase] Fetch Newly Added Success',
  props<{ res: Product[], effect: string }>()
);

export const fetchMostSelling = createAction('[Showcase] Fetch Most Selling');

export const fetchMostSellingSuccess = createAction(
  '[Showcase] Fetch Most Selling Success',
  props<{ res: ProductVariantResponse[], effect: string }>()
);

export const fetchInterested = createAction('[Showcase] Fetch Interested');

export const fetchInterestedSuccess = createAction(
  '[Showcase] Fetch Interested Success',
  props<{ res: Product[], effect: string }>()
);
    
export const emptyInterested = createAction('[Showcase] Empty Interested');

export const showcaseError = createAction(
  '[Showcase] Showcase Error',
  props<{ error: HttpError }>()
);

