import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  public getuserSkills(id: number) {
    return this.http.get(`/api/skill/user/${id}`);
  }
}
