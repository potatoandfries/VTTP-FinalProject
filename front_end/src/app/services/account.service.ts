import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { config } from '../configurations/local';
import { User } from '../configurations/model';


@Injectable({
  providedIn: 'root' 
})
export class AccountService {
  private publicUrl = `${config.apiUrl}/api/public/account`;
  private url = `${config.apiUrl}/api/account`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
  };

  constructor(private httpClient: HttpClient) {}

  createAccount(email: string, password: string, passwordRepeat: string): Observable<any> {
    return this.httpClient.post(this.publicUrl + '/registration', {
      email,
      password,
      passwordRepeat
    }, this.httpOptions).pipe(catchError(this.handleError));
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(this.url).pipe(catchError(this.handleError));
  }

  updateUser(user: any): Observable<any> {
    return this.httpClient.put(this.url, user, this.httpOptions).pipe(catchError(this.handleError));
  }

  updateUserAddress(user: any): Observable<any> {
    //bro put and patch the same thing
    return this.httpClient.put(`${this.url}/address`, user, this.httpOptions).pipe(catchError(this.handleError));
  }

  verifyEmail(verificationToken: string): Observable<any> {
    return this.httpClient.post(`${this.publicUrl}/registration/validate`, {
      token: verificationToken
    }, this.httpOptions).pipe(catchError(this.handleError));
  }

  forgotPasswordRequest(email: string): Observable<any> {
    return this.httpClient.post(`${this.publicUrl}/password/forgot`, {
      email
    }, this.httpOptions).pipe(catchError(this.handleError));
  }

  forgotPasswordConfirm(passwordForgotToken: string): Observable<any> {
    return this.httpClient.post(`${this.publicUrl}/password/forgot/confirm`, {
      token: passwordForgotToken
    }, this.httpOptions).pipe(catchError(this.handleError));
  }

  forgotPasswordReset(passwordForgotToken: string, newPassword: string, newPasswordConfirm: string): Observable<any> {
    return this.httpClient.post(`${this.publicUrl}/password/forgot/validate`, {
      token: passwordForgotToken,
      newPassword,
      newPasswordConfirm
    }, this.httpOptions).pipe(catchError(this.handleError));
  }

  resetPassword(oldPassword: string, newPassword: string, newPasswordConfirm: string): Observable<any> {
    return this.httpClient.post(`${this.url}/password/reset`, {
      oldPassword,
      newPassword,
      newPasswordConfirm
    }, this.httpOptions).pipe(catchError(this.handleError));
  }

  getVerificationStatus(): Observable<any> {
    return this.httpClient.get(`${this.url}/status`, this.httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
