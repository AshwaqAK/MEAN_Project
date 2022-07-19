import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    let token: any = localStorage.getItem('token');
    const isLoggedIn = !token ? false : true;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      //clone http to the custom AuthRequest and send it to the server 
      const AuthRequest = request.clone({ headers: headers });
      return next.handle(AuthRequest)
    } else {
      return next.handle(request);
    }
  }
}
