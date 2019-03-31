import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {
  }

  public findEventByHash(hash: string) {
    return this.http.get(`/api/event/find/${hash}`);
  }

  public addUserToEvent(userID: number, eventID: number) {
    return this.http.post('/api/event/user', {
      user_id: userID,
      event_id: eventID
    });
  }

  public findById(id: number) {
    return this.http.get(`/api/event/${id}`);
  }

  public getEventStuff(id: number) {
    return this.http.get(`/api/event/stuff/${id}`);
  }

  public getEventparticipants(id: number) {
    return this.http.get(`/api/event/users/${id}`);
  }

  public getAllMessages() {
    return this.http.get('/api/messages');
  }
}
