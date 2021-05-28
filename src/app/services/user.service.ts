import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position, User } from '@app/interfaces';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUser() : Observable<User>{
    return this.http.get<User>('/api/user/getByToken')
  }

  getUserItems() : Observable<Position[]>{
    return this.http.get<Position[]>('/api/user/userItems')
  }

}
