import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable } from 'rxjs';
import { ApplyService } from 'src/app/dashboard/services/apply.service';
import { DashboardApply } from 'src/app/dashboard/store/applies/actions';
import {
  getDashboardApplySelector,
  pagesSelector,
} from 'src/app/dashboard/store/applies/selectors';

import { ApplyType } from 'src/app/utils/interfaces/apply.interface';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';

@Component({
  selector: 'app-applies',
  templateUrl: './applies.component.html',
  styleUrls: ['./applies.component.css'],
})
export class AppliesComponent implements OnInit {
  headData: string[] = [
    'User',
    'Email',
    'Job Title',
    'Status',
    'Created At',
    'View',
  ];
  applies$: Observable<ApplyType[]>;
  page: number = 1;
  pagesSel$: any;
  constructor(
    private store: Store<StoreAppTypes>,
    private applyServie: ApplyService
  ) {
    this.applies$ = this.store.pipe(select(getDashboardApplySelector));
    this.pagesSel$ = this.store.pipe(select(pagesSelector));
  }

  get appliesCount() {
    return this.applyServie.appliesCount;
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.getAppliesList();
  }

  getAppliesList(): void {
    this.store.dispatch(DashboardApply({ page: this.page }));
  }
  ngOnInit(): void {
    this.getAppliesList();
  }
}
