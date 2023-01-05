import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = `${enviroment.apiUrl}/users`;
  constructor(private http: HttpClient) {}

  getUserBydId(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUser(user: any) {
    return this.http.patch(`${this.apiUrl}/${user.id}`, user);
  }

  uploadUserImage(id: string, image: any) {
    return this.http.put(`${this.apiUrl}/image/${id}`, image);
  }
}
