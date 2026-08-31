import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../domains/user.dto';

const url = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private http = inject(HttpClient);

  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${url}/users`);
  }
}
