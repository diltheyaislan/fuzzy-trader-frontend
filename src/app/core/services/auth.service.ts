import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { BACKEND_API } from '../../app.api';
import { TokenService } from './token.service';
import UserSession from '../../shared/models/user-session.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userLoggedIn: UserSession;

  private permissions: string[];

  private lastUrl: string;

  constructor(
    private token: TokenService,
    private http: HttpClient,
    private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
  }

  validateSession() {
    let user = this.user();

    if (user !== undefined) {
      let validToken = this.token.isValid(this.userLoggedIn.accessToken, true);
      if (!validToken && this.token.payload(this.userLoggedIn.accessToken).rememberme !== 'true') {
        this.logout();
        this.redirect('/');
      }
    }
  }

  isLoggedIn(): boolean {
    const isLoggenIn = this.user() !== undefined && this.token.isValid(this.user().accessToken, false);
    return isLoggenIn;
  }

  user(): UserSession {
    let userLocalStorage: UserSession = JSON.parse(this.get());
    if (!!(userLocalStorage)) {
      this.userLoggedIn = userLocalStorage;
    }

    if (this.userLoggedIn && this.permissions !== undefined) {
      this.userLoggedIn.permissions = this.permissions;
    }

    return this.userLoggedIn;
  }

  setPermissions(permissions: string[] = []): void {
    this.permissions = permissions;
  }

  login(email: string, password: string,): Observable<any> {
    return this.http.post<any>(`${BACKEND_API}/sessions`,
      { email: email, password: password })
      .pipe(tap(data => this.handleLoginResponse(data)));
  }

  logout() {
    this.userLoggedIn = undefined;
    this.token.remove();
    this.remove();
  }

  set(user: UserSession) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  get() {
    return localStorage.getItem('currentUser');
  }

  remove() {
    localStorage.removeItem('currentUser');
  }

  redirect(path: string = this.lastUrl) {
    if (path === '/' || path === '' || path === undefined) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login', path]);
    }
  }

  handleLoginResponse(data) {
    this.userLoggedIn = {
      'id': data.user.id,
      'name': data.user.name,
      'firstName': data.user.name.split(' ')[0],
      'email': data.user.email,
      'accessToken': data.token
    }

    this.set(this.userLoggedIn);
  }
}
