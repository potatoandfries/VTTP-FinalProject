import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { config } from '../configurations/local';
import { CookieService } from 'ngx-cookie-service'; 

@Injectable()
export class TokenService {

  url = `${config.authUrl}/oauth/token`;

  constructor(private httpClient: HttpClient ,private cookieService: CookieService) {
  }

  obtainAccessToken(email: string, password: string) {
    let body = new HttpParams()
      .append('username', email)
      .append('password', password)
      .append('scope', 'read write')
      .append('grant_type', 'password')
      .append('client_id',config.clientId)
      .append('client_secret',config.clientSecret)
  

      return this.httpClient.post(this.url, body, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${config.clientId}:${config.clientSecret}`)}`,
        }
      });
  }
 
  obtainAccessTokenWithRefreshToken(refreshToken: string) {
    let body: HttpParams = new HttpParams()
      .append('refresh_token', refreshToken)
      .append('grant_type', 'refresh_token');
  
    return this.httpClient.post(this.url, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': `Basic ${btoa(`${config.clientId}:${config.clientSecret}`)}`,
      },
    });
  }
  

  saveToken(token:any): void {
    this.cookieService.set('usr', JSON.stringify(token), 365, '/');
  }

  removeToken() {
    this.cookieService.delete('usr', '/');
  }

  getToken() {
    const token = this.cookieService.get('usr');
    return token ? JSON.parse(token).access_token : '';
  }

  getRefreshToken() {
    const token = this.cookieService.get('usr');
    return token ? JSON.parse(token).refresh_token : '';
  }

  checkIfTokenExists() {
    const token = this.cookieService.get('usr');
    return token ? !!JSON.parse(token).access_token : false;
  }
}