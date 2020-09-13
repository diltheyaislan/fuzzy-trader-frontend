import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';

import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authService = this.injector.get(AuthService);

        if (authService.isLoggedIn()) {
            const authRequest = request.clone(
                { setHeaders: { 'Authorization': `Bearer ${authService.user().accessToken}` } }
            );
            return next.handle(authRequest);
        } else {
            return next.handle(request);
        }
    }
}
