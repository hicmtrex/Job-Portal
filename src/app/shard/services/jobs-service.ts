import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterJob } from 'src/app/utils/interfaces/jobs.interface';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  apiUrl: string = `${enviroment.apiUrl}/jobs`;

  constructor(private http: HttpClient, private store: Store<StoreAppTypes>) {}

  getAllJobs() {
    return this.http.get(this.apiUrl);
  }

  getJobById(id?: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getFiltredJobs(filter?: FilterJob) {
    if (filter) {
      return this.http.get(
        `${this.apiUrl}/filter?search=${filter.search}&category=${filter.category}&page=${filter.page}&jobNature=${filter.jobNature}&location=${filter.location}`
      );
    } else {
      return this.http.get(this.apiUrl);
    }
  }
}
