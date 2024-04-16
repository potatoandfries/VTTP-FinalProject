import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class AuthGuardService {

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        const isAuthenticated = authState.authenticated;
        if (!isAuthenticated) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
        return true;
      })
    );
  }
}
