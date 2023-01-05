import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { JobsService } from 'src/app/shard/services/jobs-service';
import { GetFiltredJobsPending } from 'src/app/shard/store/jobs/actions';
import { jobsSelectors } from 'src/app/shard/store/jobs/selectors';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  category: string = '';
  search: string = '';
  page: number = 1;
  jobs: JobTypes[] = [];
  dataSub!: Subscription;

  constructor(
    private jobService: JobsService,
    private store: Store<StoreAppTypes>
  ) {}

  getJobsList() {
    this.dataSub = this.jobService.getAllJobs().subscribe({
      next: (data: any) => {
        this.jobs = data.splice(0, 9);
      },
    });
  }

  ngOnInit(): void {
    this.getJobsList();
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
