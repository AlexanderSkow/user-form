import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private http = inject(HttpClient);

  getUsers() {
    return this.http.get(`${url}/users`).subscribe();
  }
}
