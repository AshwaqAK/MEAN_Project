import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, SketchBrahma } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
const BACKEND_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: any = null;
  public user: any;
  token: any;

  constructor(private http: HttpClient, private router: Router) { }

  // signIn service
  signIn(data: any) {
    const email = this.b64EncodeUnicode(data.email.toLowerCase()) + '$' + this.encrptCredentials(40);
    const password = this.b64EncodeUnicode(data.password) + '$' + this.encrptCredentials(40);
    return this.http.post<any>(BACKEND_URL + SketchBrahma.signIn, { email, password });
  }

  // signUp service 
  singUp(data: any) {
    const email = this.b64EncodeUnicode(data.email.toLowerCase()) + '$' + this.encrptCredentials(40);
    const password = this.b64EncodeUnicode(data.password) + '$' + this.encrptCredentials(40);
    let dataObject = {
      email,
      password,
      name: data.name
    }
    return this.http.post(BACKEND_URL + SketchBrahma.signUp, dataObject);
  }

  logOut() {
    return this.http.get(BACKEND_URL + SketchBrahma.logOut);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  checkLogin() {
    const isAuth = localStorage.getItem('token');
    if (!isAuth) {
      this.router.navigate(['/']);
    }
    return false;
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  // encrypting credentials
  rand = () => Math.random().toString(36).substr(2);
  encrptCredentials = (length: any) =>
    (
      this.rand() +
      this.rand() +
      this.rand() +
      this.rand() +
      this.rand() +
      this.rand()
    ).substr(0, length);

  b64EncodeUnicode(str: any) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
      })
    );
  }
}
