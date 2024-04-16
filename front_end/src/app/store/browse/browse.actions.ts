import { createAction, props } from '@ngrx/store';
import { Categories, Category, Color, Colors, ProductVariantResponse } from '../../configurations/model';
import { HttpError } from '../app.reducer';



export const fetchProducts = createAction(
  '[Browse] Fetch Products',
  props<{ page: number, sort: string, category: string, color: string, minPrice: string, maxPrice: string }>()
);

export const fetchProductsSuccess = createAction(
  '[Browse] Fetch Products Success',
  props<{ res: ProductVariantResponse[], effect: string, selectedPage: number, selectedSort: string, selectedCategory: string, selectedColor: string, minPrice: string, maxPrice: string }>()
);

export const fetchProductsAppend = createAction(
  '[Browse] Fetch Products Append',
  props<{ page: number, sort: string, category: string, color: string, minPrice: string, maxPrice: string }>()
);

export const fetchProductAppendSuccess = createAction(
  '[Browse] Fetch Products Append Success',
  props<{ res: ProductVariantResponse[], effect: string, selectedPage: number, selectedSort: string, selectedCategory: string, selectedColor: string, minPrice: string, maxPrice: string }>()
);

export const fetchProductsCount = createAction(
  '[Browse] Fetch Products Count',
  props<{ category: string, color: string, minPrice: string, maxPrice: string }>()
);

export const fetchProductsCountSuccess = createAction(
  '[Browse] Fetch Products Count Success',
  props<{ res: number, effect: string }>()
);

export const fetchCategory = createAction(
  '[Browse] Fetch Category'
);

export const fetchCategorySuccess = createAction(
  '[Browse] Fetch Category Success',
  props<{ res: Categories[], effect: string }>()
);

export const fetchColors = createAction(
  '[Browse] Fetch Colors'
);

export const fetchColorsSuccess = createAction(
  '[Browse] Fetch Colors Success',
  props<{ res: Colors[], effect: string }>()
);

export const browseError = createAction(
  '[Browse] Browse Error',
  props<{ error: HttpError }>()
);
