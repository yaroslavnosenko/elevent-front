import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';


export const AUTH_TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private jwt;

  constructor(private http: HttpClient) {
    this.jwt = new JwtHelperService();
  }

  public updateUser(user: any) {
    return this.http.put('/api/user', {
      profile_url: user.profile_url,
      uid: user.uid,
      photo_url: user.photo_url,
      display_name: user.display_name,
      email: user.email,
      summary: user.summary,
      bio: user.bio
    });
  }

  public login(fb: any) {
    return this.http.post('/api/auth/login', fb);
  }

  public logout() {
    localStorage.removeItem(AUTH_TOKEN);
  }

  public getID() {
    return this.jwt.decodeToken(this.getToken()).id;
  }

  public isLoged() {
    if (localStorage.getItem(AUTH_TOKEN) && !this.jwt.isTokenExpired(localStorage.getItem(AUTH_TOKEN))) {
      return true;
    } else {
      return false;
    }
  }

  public getUser() {
    return this.http.get('/api/user');
  }

  public getToken(): string {
    return localStorage.getItem(AUTH_TOKEN);
  }

  public setToken(token: string) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
}

