import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoTypes } from 'src/app/utils/interfaces/user.interface';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl: string = `${enviroment.apiUrl}/users`;
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.apiUrl);
  }

  getUserById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
