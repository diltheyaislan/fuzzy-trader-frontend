import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BACKEND_API } from 'src/app/app.api';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  all(): Observable<any>{
    return this.http.get<any>(`${BACKEND_API}/users`, {});
  }

  store(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${BACKEND_API}/users`, {
      'name': name,
      'email': email,
      'password': password
    });
  }

  update(id: string, name: string, email: string, password: string): Observable<any> {

    const data: any = {
      'name': name,
      'email': email,
      'password': password
    };

    if (!password) {
       delete data.password;
    }

    return this.http.patch<any>(`${BACKEND_API}/users/${id}`, data);
  }

  show(id: string): Observable<any> {
    return this.http.get<any>(`${BACKEND_API}/users/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${BACKEND_API}/users/${id}`);
  }

  changePassword(id: string, currentPassword: string, newPassword: string){
    return this.http.patch<any>(`${BACKEND_API}/profile`, {
      'old_password': currentPassword,
      'password': newPassword,
      'password_confirmation': newPassword,
    });
  }
}
