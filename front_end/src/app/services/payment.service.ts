import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../configurations/local';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private url = `${config.apiUrl}/api/order`;

  constructor(private http: HttpClient) {}

  checkout(userId: string, access_token: string, paymentMethodId: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + access_token
    });

    return this.http.post(`${this.url}/${userId}/checkout`, { paymentMethodId }, { headers });
  }
}