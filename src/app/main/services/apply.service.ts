import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplyService {
  apiUrl: string = `${enviroment.apiUrl}/apply`;
  constructor(private http: HttpClient) {}

  createApply(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getUserApplies(page: number) {
    return this.http.get(`${this.apiUrl}/user?page=${page}`);
  }
}
