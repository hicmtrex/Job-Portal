import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subscription } from 'rxjs';
import { JobsService } from 'src/app/shard/services/jobs-service';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';

@Component({
  selector: 'app-jobs-table',
  templateUrl: './jobs-table.component.html',
  styleUrls: ['./jobs-table.component.css'],
})
export class JobsTableComponent implements OnInit, OnDestroy {
  search: string = '';
  page: number = 1;
  jobs: JobTypes[] = [];
  pages: number = 1;
  timeOutId: any;
  array: number[] = [];
  dataSub!: Subscription;
  constructor(private jobService: JobsService) {}

  getFiltredJobs() {
    this.dataSub = this.jobService
      .getFiltredJobs({
        category: '',
        page: this.page,
        search: this.search,
        location: '',
        jobNature: '',
      })
      .subscribe({
        next: (data: any) => {
          this.jobs = data.jobs;

          this.setPages(data.pages);
        },
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.getFiltredJobs();
  }

  setSearch(event: KeyboardEvent) {
    this.search = (event.target as HTMLInputElement).value;
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.getFiltredJobs();
    }, 500);
  }

  setPage(p: number) {
    this.page = p;
    this.getFiltredJobs();
  }

  setPages(p: number) {
    this.array = [...Array(p).keys()];
    return (this.pages = p);
  }

  ngOnInit(): void {
    this.getFiltredJobs();
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
