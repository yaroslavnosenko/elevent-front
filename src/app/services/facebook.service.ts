import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor(private http: HttpClient) {
  }

  public getUserLink(userID: number, accessToken: string) {
    return this.http.post('/api/fb', {
      uid: userID,
      token: accessToken
    });
  }
}
