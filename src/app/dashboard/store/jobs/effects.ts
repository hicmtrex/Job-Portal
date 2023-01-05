import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { ToastrService } from 'ngx-toastr';
import { map, mergeMap, exhaustMap, switchMap } from 'rxjs';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';

import { DashboardJobsService } from '../../services/dashboard-jobs.service';
import {
  AddNewJob,
  AddNewJobSuccess,
  GetRecuirerJobs,
  GetRecuirerJobsSuccess,
  UpdateJob,
  UpdateJobSuccess,
} from './actions';

@Injectable()
export class DashboardJobsEffect {
  constructor(
    private jobsService: DashboardJobsService,
    private action$: Actions,
    private toast: ToastrService
  ) {}

  loadRecuierJobs = createEffect(() => {
    return this.action$.pipe(
      ofType(GetRecuirerJobs),
      exhaustMap((action) => {
        return this.jobsService
          .getRecuirerJobs()
          .pipe(map((jobs: any) => GetRecuirerJobsSuccess({ jobs })));
      })
    );
  });

  addJob$ = createEffect(() =>
    this.action$.pipe(
      ofType(AddNewJob),
      mergeMap((action) => {
        return this.jobsService.addJob(action.job).pipe(
          map(() => {
            this.toast.success('Job has been created');
            return AddNewJobSuccess({ job: action.job });
          })
        );
      })
    )
  );

  updateJob$ = createEffect(() =>
    this.action$.pipe(
      ofType(UpdateJob),
      switchMap((action) => {
        return this.jobsService.updateJob(action.job).pipe(
          map((data) => {
            const updatedJob: Update<JobTypes> = {
              id: action.job.id,
              changes: {
                ...action.job,
              },
            };
            this.toast.success('Job has been updated!');
            return UpdateJobSuccess({ job: updatedJob });
          })
        );
      })
    )
  );
}
