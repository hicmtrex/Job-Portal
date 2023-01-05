import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { ToastrService } from 'ngx-toastr';
import { map, mergeMap, exhaustMap, switchMap } from 'rxjs';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';
import { ApplyService } from '../../services/apply.service';

import { DashboardJobsService } from '../../services/dashboard-jobs.service';
import { DashboardApply, DashboardApplySuccess } from './actions';

@Injectable()
export class ApplyEffects {
  constructor(
    private applyService: ApplyService,
    private action$: Actions,
    private toast: ToastrService
  ) {}

  loadApplies = createEffect(() => {
    return this.action$.pipe(
      ofType(DashboardApply),
      exhaustMap((action) => {
        return this.applyService.getAllApplies(action.page).pipe(
          map((data: any) => {
            this.applyService.getPages(data.appliesCount);
            return DashboardApplySuccess({
              applies: data.applies,
              page: +data.page,
              pages: data.pages,
              appliesCount: data.appliesCount,
            });
          })
        );
      })
    );
  });
}
