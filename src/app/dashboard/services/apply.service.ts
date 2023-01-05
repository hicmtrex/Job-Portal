import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplyService {
  apiUrl: string = `${enviroment.apiUrl}/apply`;
  page: number = 1;
  appliesCount: number = 1;
  constructor(private http: HttpClient) {}

  getAllApplies(page: number) {
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }

  updateApply(apply: { id: string; status: string }) {
    return this.http.patch(`${this.apiUrl}/${apply.id}`, apply);
  }

  getApplyById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getPages(p: number) {
    this.appliesCount = p;
  }
}
