import { createReducer, on } from '@ngrx/store';
import * as ShowcaseActions from './showcase.actions';
import { Product, ProductVariantResponse } from '../../configurations/model';
import { HttpError } from '../app.reducer';


export interface ShowcaseState {
  newlyAdded: Product[];
  mostSelling: ProductVariantResponse[];
  interested: Product[];
  errors: HttpError[];
  loading: string[];
}

export const initialState: ShowcaseState = {
  newlyAdded: [],
  mostSelling: [],
  interested: [],
  errors: [],
  loading: [],
};

export const showcaseReducer = createReducer(
  initialState,
  on(ShowcaseActions.fetchNewlyAdded, (state) => ({
    ...state,
    loading: [...state.loading, '[Showcase] Fetch Newly Added']
  })),
  on(ShowcaseActions.fetchNewlyAddedSuccess, (state, { res }) => ({
    ...state,
    newlyAdded: res,
    loading: state.loading.filter(item => !item.startsWith('[Showcase] Fetch Newly Added')),
    errors: state.errors.filter(error => error.errorEffect !== '[Showcase] Fetch Newly Added Success')
  })),
  on(ShowcaseActions.fetchMostSelling, (state) => ({
    ...state,
    loading: [...state.loading, '[Showcase] Fetch Most Selling']
  })),
  on(ShowcaseActions.fetchMostSellingSuccess, (state, { res }) => ({
    ...state,
    mostSelling: res,
    loading: state.loading.filter(item =>  !item.startsWith('[Showcase] Fetch Most Selling Success')),
    errors: state.errors.filter(error => error.errorEffect !== '[Showcase] Fetch Most Selling Success')
  })),  
  on(ShowcaseActions.fetchInterested, (state) => ({
    ...state,
    loading: [...state.loading, '[Showcase] Fetch Interested']
  })),
  on(ShowcaseActions.fetchInterestedSuccess, (state, { res }) => ({
    ...state,
    interested: res,
    loading: state.loading.filter(item => item.startsWith('[Showcase] Fetch Interested Success')),
    errors: state.errors.filter(error => error.errorEffect !== '[Showcase] Fetch Interested Success')
  })),
  on(ShowcaseActions.emptyInterested, (state) => ({
    ...state,
    interested: [],
  })),
  on(ShowcaseActions.showcaseError, (state, { error }) => ({
    ...state,
    errors: [...state.errors, error],
    loading: state.loading.filter(item => item !== error.errorEffect),
  }))
);