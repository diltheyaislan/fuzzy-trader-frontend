import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_API } from 'src/app/app.api';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrenciesService {

  constructor(private http: HttpClient) { }

  all(): Observable<any>{
    return this.http.get<any>(`${BACKEND_API}/cryptocurrencies`, {});
  }
}
