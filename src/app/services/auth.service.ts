import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(loginDetail: any) {
    return this.http.post(`${environment.HOST}/login`, { ...loginDetail });
  }

  setSession(access_token: string) {
    localStorage.setItem("access_token", access_token);
  }

  isLoggedIn(){
    return localStorage.getItem("access_token")?true:false;
  }

  logout() {
    localStorage.removeItem("access_token");
  }


}