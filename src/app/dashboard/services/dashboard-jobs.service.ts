import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardJobsService {
  apiUrl: string = `${enviroment.apiUrl}/jobs`;
  constructor(private http: HttpClient) {}

  getRecuirerJobs(): Observable<ReadonlyArray<JobTypes>> {
    return this.http
      .get<ReadonlyArray<JobTypes>>(`${this.apiUrl}/recruiter`)
      .pipe();
  }

  addJob(job: any) {
    return this.http.post(this.apiUrl, job, { withCredentials: true });
  }

  updateJob(job: any) {
    return this.http.patch(`${this.apiUrl}/${job.id}`, job);
  }

  deleteJob(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
