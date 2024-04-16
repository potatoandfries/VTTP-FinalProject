import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as ShowcaseActions from '../../store/showcase/showcase.actions';
import { ShowcaseState } from './../../store/showcase/showcase.reducer';
import { HttpError } from '../../store/app.reducer'; // Adjust the path as needed
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-newly-added',
  templateUrl: './newly-added.component.html',
  styleUrls: ['./newly-added.component.css']
})
export class NewlyAddedComponent implements OnInit {
  showcaseState!: Observable<ShowcaseState>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    
    this.showcaseState = this.store.select('showcase');
    this.showcaseState
      .pipe(take(1))
      .subscribe(data => {
        if (data.newlyAdded.length === 0) {
          this.store.dispatch(ShowcaseActions.fetchNewlyAdded());
        }
      });
  }


}

