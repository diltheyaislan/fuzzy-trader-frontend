import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_API } from 'src/app/app.api';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  all(): Observable<any>{
    return this.http.get<any>(`${BACKEND_API}/transactions`, {});
  }

  buyShares(company_id: string, amount: number): Observable<any> {
    return this.http.post<any>(`${BACKEND_API}/transactions`, {
      company_id,
      amount,
    });
  }

  buyCryptocurrencies(cryptocurrency_id: string, amount: number): Observable<any> {
    return this.http.post<any>(`${BACKEND_API}/transactions`, {
      cryptocurrency_id,
      amount,
    });
  }
}
