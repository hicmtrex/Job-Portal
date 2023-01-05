import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subscription } from 'rxjs';
import { JobsService } from 'src/app/shard/services/jobs-service';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
})
export class JobsListComponent implements OnInit, OnDestroy {
  category: string = '';
  search: string = '';
  jobNature: string = '';
  location: string = '';
  page: number = 1;
  jobs: any[] = [];
  categories: string[] = [];
  jobNatures: string[] = [];
  locations: string[] = [];
  pages: number = 1;
  timeOutId: any;
  array: number[] = [];
  dataSub!: Subscription;

  constructor(
    private store: Store<StoreAppTypes>,
    private jobService: JobsService
  ) {}

  getFiltredJobs() {
    this.dataSub = this.jobService
      .getFiltredJobs({
        category: this.category,
        page: this.page,
        search: this.search,
        location: this.location,
        jobNature: this.jobNature,
      })
      .subscribe({
        next: (data: any) => {
          this.jobs = data.jobs;
          this.categories = data.categories;
          this.locations = data.locations;
          this.jobNatures = data.jobNatures;
          this.setPages(data.pages);
        },
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.getFiltredJobs();
  }
  setCategory(event: any) {
    this.category = event.target.value;
    this.getFiltredJobs();
  }

  setLocation(event: any) {
    this.location = event.target.value;
    this.getFiltredJobs();
  }

  setSearch(event: KeyboardEvent) {
    this.search = (event.target as HTMLInputElement).value;
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.getFiltredJobs();
    }, 500);
  }

  setJobType(event: any) {
    const value = event.target.value;
    this.jobNature = value;
    this.getFiltredJobs();
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
