import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid(token, expiration: boolean = false) {
    if (token) {
      const payload = this.payload(token);

      if (payload) {
        if (expiration) {
          if (Date.now() < payload.nbf * 1000) {
            return false;
          }

          if (Date.now() > payload.exp * 1000) {
            return false;
          }
        }

        return true;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }
}
