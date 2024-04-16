import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ShowcaseActions from './showcase.actions';
import { ProductService } from '../../services/product.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ShowcaseEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  fetchNewlyAdded$ = createEffect(() => this.actions$.pipe(
    ofType(ShowcaseActions.fetchNewlyAdded),
    switchMap(() => this.productService.getNewlyAdded().pipe(
      map(res => ShowcaseActions.fetchNewlyAddedSuccess({ res, effect: '[Showcase] Fetch Newly Added Success' })),
      catchError(error => of(ShowcaseActions.showcaseError({ error }))) 
    ))
  ));

  fetchMostSelling$ = createEffect(() => this.actions$.pipe(
    ofType(ShowcaseActions.fetchMostSelling),
    switchMap(() => this.productService.getMostSelling().pipe(
      map(res => ShowcaseActions.fetchMostSellingSuccess({ res, effect: '[Showcase] Fetch Most Selling Success' })),
      catchError(error => of(ShowcaseActions.showcaseError({ error }))) 
    ))
  ));

  fetchInterested$ = createEffect(() => this.actions$.pipe(
    ofType(ShowcaseActions.fetchInterested),
    switchMap(() => this.productService.getInterested().pipe(
      map(res => ShowcaseActions.fetchInterestedSuccess({ res, effect: '[Showcase] Fetch Interested Success' })),
      catchError(error => of(ShowcaseActions.showcaseError({ error }))) 
    ))
  ));
}