import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BrowseActions from './browse.actions';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Color, ProductVariantResponse } from '../../configurations/model';

@Injectable()
export class BrowseEffects {

    constructor(private actions$: Actions, private productService: ProductService) {}
  
    
    fetchProducts$ = createEffect(() => this.actions$.pipe(
      ofType(BrowseActions.fetchProducts),
      switchMap(({ page, sort, category, color, minPrice, maxPrice }: { page: number, sort: string, category: string, color: string , minPrice: string, maxPrice: string }) =>
        this.productService.getProducts(page, sort, category, color, minPrice, maxPrice).pipe(
          map(res => BrowseActions.fetchProductsSuccess({
            res: res as ProductVariantResponse[],
            selectedPage: page,
            selectedSort: sort,
            selectedCategory: category,
            selectedColor: color,
            minPrice,
            maxPrice,
            effect: ''
          })),
          catchError(error => of(BrowseActions.browseError({ error })))
        )
      )
    ));
  
    fetchProductsAppend$ = createEffect(() => this.actions$.pipe(
      ofType(BrowseActions.fetchProductsAppend),
      mergeMap(({ page, sort, category, color, minPrice, maxPrice }: { page: number, sort: string, category: string, color: string, minPrice: string, maxPrice: string }) =>
        this.productService.getProducts(page, sort, category, color, minPrice, maxPrice).pipe(
          map(res => BrowseActions.fetchProductAppendSuccess({
            res: res as ProductVariantResponse[],
            selectedPage: page,
            selectedSort: sort,
            selectedCategory: category,
            selectedColor: color,
            minPrice,
            maxPrice,
            effect: '[Browse] Fetch Products Append'
          })),
          catchError(error => of(BrowseActions.browseError({ error })))
        )
      )
    ));
  
  
  
    fetchProductsCount$ = createEffect(() => this.actions$.pipe(
      ofType(BrowseActions.fetchProductsCount),
      switchMap(({ category, color, minPrice, maxPrice }) =>
        this.productService.getProductsCount(category, color, minPrice, maxPrice).pipe(
          map(res => BrowseActions.fetchProductsCountSuccess({ res, effect: '[Browse] Fetch Products Count' })),
          catchError(error => of(BrowseActions.browseError({ error })))
        )
      )
    ));
    

  
  
    fetchCategory$ = createEffect(() => this.actions$.pipe(
      ofType(BrowseActions.fetchCategory),
      switchMap(() =>
        this.productService.getCategory().pipe(
          map(
            (res: any[]) =>
            BrowseActions.fetchCategorySuccess({ res, effect: '[Browse] Fetch Category' })),
          catchError(error => of(BrowseActions.browseError({ error })))
        )
      )
    ));
  
    fetchColors$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BrowseActions.fetchColors),
        switchMap(() =>
          this.productService.getColors().pipe(
            map(
              (res: any[]) =>
                BrowseActions.fetchColorsSuccess({ res, effect: '[Browse] Fetch Colors' })
            ),
            catchError((error) => of(BrowseActions.browseError({ error })))
          )
        )
      )
    );

  }