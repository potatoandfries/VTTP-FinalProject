import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  isVerified: boolean = false;
  isError: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private accountService: AccountService, 
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    const verificationToken = this.route.snapshot.queryParams['token'];
    if (verificationToken) {
      this.verifyEmail(verificationToken);
    } else {
      this.isError = true; // Consider a more detailed error message or handling strategy
    }
  }

  private verifyEmail(token: string) {
    this.accountService.verifyEmail(token).pipe(
      take(1),
      catchError(error => {
        this.isError = true;
        // Optionally, log the error or show an error message
        return throwError(error);
      })
    ).subscribe(() => {
      this.isVerified = true;
      this.checkLoginStatus();
    });
  }

  private checkLoginStatus() {
    this.store.select('auth').pipe(take(1)).subscribe(authState => {
      this.isLoggedIn = authState.authenticated;
      if (this.isLoggedIn) {
        // Dispatch an action creator instead of creating a new instance
        this.store.dispatch(AuthActions.fetchVerificationStatus());
      }
      // Optionally, redirect the user or provide additional feedback
    });
  }
}
