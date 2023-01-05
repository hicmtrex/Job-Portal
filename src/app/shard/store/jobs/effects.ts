import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';
import { JobsService } from '../../services/jobs-service';
import {
  GetFiltredJobsFailure,
  GetFiltredJobsPending,
  GetFiltredJobsSuccess,
} from './actions';

@Injectable()
export class JobsEffects {
  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetFiltredJobsPending),
      mergeMap(() =>
        this.jobService
          .getAllJobs()
          .pipe(map((jobs: any) => GetFiltredJobsSuccess({ jobs })))
      )
    )
  );
  constructor(private actions$: Actions, private jobService: JobsService) {}
}
