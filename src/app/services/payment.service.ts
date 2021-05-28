import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { messages } from '@app/interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

declare const Stripe;
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getSessionId(assetId: string) : Observable<{message: string}>{
    return this.http.get<{message: string}>('/api/pay/session/{assetId}'.replace('{assetId}', assetId))
  }

  pay(id: string): void{
    const stripe = Stripe("pk_test_51IvG6CI90no2RL3hI2VnCGRWEQKuvpfWVzu5BDbXScukKse2FjJFsj5vcFzpUAgwRra0DVYDxkWiTHKcC8qT6G1y00mt1UCGFI")
    stripe.redirectToCheckout({
      sessionId: id
    }).then(function (result) {
      console.log(result);
    });
  }
  
  successPayment() : Observable<any>{
    return this.http.post<any>("/api/pay/success", null)
  }
}
