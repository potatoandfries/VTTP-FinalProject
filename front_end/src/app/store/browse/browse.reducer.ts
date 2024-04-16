import { createReducer, on } from '@ngrx/store';
import * as BrowseActions from './browse.actions';
import { HttpError } from '../app.reducer';
import { Categories, Colors, ProductVariantResponse } from '../../configurations/model';

export interface BrowseState {
  products: ProductVariantResponse[];
  productsCount: number;
  categories: Categories[];
  colors: Colors[];
  canFetch: boolean;
  selectedPage: number;
  selectedSort: string;
  selectedCategory: string;
  selectedColor: string;
  minPrice: string;
  maxPrice: string;
  errors: HttpError[];
  loading: boolean;
}

export const initialState: BrowseState = {
  products: [],
  productsCount: 0,
  categories: [],
  colors: [],
  canFetch: true,
  selectedPage: 0,
  selectedSort: 'any',
  selectedCategory: 'any',
  selectedColor: 'any',
  minPrice: '0',
  maxPrice: '0',
  errors: [],
  loading: true
};

export const browseReducer = createReducer(
  initialState,
  on(
    BrowseActions.fetchProducts,
    BrowseActions.fetchProductsAppend,
    BrowseActions.fetchProductsCount,
    BrowseActions.fetchColors,
    BrowseActions.fetchCategory,
    state => ({ ...state, loading: true })
  ),
  on(BrowseActions.fetchProductsSuccess, (state, { res, selectedPage, selectedSort, selectedCategory, selectedColor, minPrice, maxPrice }) => {
    console.log('Products data received:');
    console.log(JSON.stringify(res)); // Log the received products data
    return {
      ...state,
      products: res,
      selectedPage,
      selectedSort,
      selectedCategory,
      selectedColor: selectedColor, // Assuming you want to store the color name as a string
      minPrice,
      maxPrice,
      canFetch: !(res !== null && res?.length !== 0),
      loading: false
    };
  }),
  on(BrowseActions.fetchProductAppendSuccess, (state, { res, selectedPage, selectedSort, selectedCategory, selectedColor, minPrice, maxPrice }) => ({
    ...state,
    products: [...state.products, ...res],
    selectedPage,
    selectedSort,
    selectedCategory,
    selectedColor: selectedColor,
    minPrice,
    maxPrice,
    canFetch: !(res !== null && res?.length !== 0),
    loading: false
})),
  on(BrowseActions.fetchProductsCountSuccess, (state, { res }) => ({
    ...state,
    productsCount: res,
    loading: false
  })),
  on(BrowseActions.fetchCategorySuccess, (state, { res }) => {
    console.log('category data received:', res);
    return {
      ...state,
      categories: res,
      loading: false
    };
  }),
  on(BrowseActions.fetchColorsSuccess, (state, { res }) => {
    console.log('Colors data received:', res); // Log the received colors data
    return {
      ...state,
      colors: res,
      loading: false
    };
  }),
  on(BrowseActions.browseError, (state, { error }) => ({
    ...state,
    loading: false,
    errors: [...state.errors, error]
  })))