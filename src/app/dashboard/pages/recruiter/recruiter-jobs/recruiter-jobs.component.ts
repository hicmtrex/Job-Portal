import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetRecuirerJobs } from 'src/app/dashboard/store/jobs/actions';
import { getRecuiterJobsSelector } from 'src/app/dashboard/store/jobs/selectors';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';
import { DialogService } from '@ngneat/dialog';
import { AddJobComponent } from '../add-job/add-job.component';
import { DashboardJobsService } from 'src/app/dashboard/services/dashboard-jobs.service';
import { ToastrService } from 'ngx-toastr';
import { EditJobComponent } from '../edit-job/edit-job.component';

@Component({
  selector: 'app-recruiter-jobs',
  templateUrl: './recruiter-jobs.component.html',
  styleUrls: ['./recruiter-jobs.component.css'],
})
export class RecruiterJobsComponent implements OnInit {
  jobs$: Observable<JobTypes[]> = this.store.pipe(
    select(getRecuiterJobsSelector)
  );

  constructor(
    private store: Store<StoreAppTypes>,
    private dialog: DialogService,
    private jobService: DashboardJobsService,
    private toast: ToastrService
  ) {}

  openAddJob() {
    const dialogRef = this.dialog.open(AddJobComponent, {
      size: 'lg',
    });
    dialogRef.afterClosed$.subscribe((res) => res && this.getJobsList());
  }

  openAddEdit(job: JobTypes | null) {
    const dialogRef = this.dialog.open(EditJobComponent, {
      width: 1200,
      size: 'lg',
      data: job,
    });
    dialogRef.afterClosed$.subscribe((res) => res && this.getJobsList());
  }

  getJobsList() {
    this.store.dispatch(GetRecuirerJobs());
  }

  deleteJob(id: string) {
    if (window.confirm('Are you sure?')) {
      this.jobService.deleteJob(id).subscribe({
        complete: () => {
          this.toast.success('Job has been deleted!');
          this.getJobsList();
        },
      });
    }
  }
  ngOnInit(): void {
    this.getJobsList();
  }
}
