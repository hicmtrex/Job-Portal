import { Component, OnDestroy, OnInit } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Subscription } from 'rxjs';
import { JobsService } from 'src/app/shard/services/jobs-service';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit, OnDestroy {
  selected?: string;
  jobs: JobTypes[] = [];
  selectedValue?: string;
  selectedOption: any;
  previewOption?: any;
  dataSub!: Subscription;

  constructor(private jobSerive: JobsService) {}

  getJobsList() {
    this.dataSub = this.jobSerive.getAllJobs().subscribe({
      next: (data: any) => {
        this.jobs = data;
      },
    });
  }

  submit() {}
  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
  }

  onPreview(event: TypeaheadMatch): void {
    if (event) {
      this.previewOption = event.item;
    } else {
      this.previewOption = null;
    }
  }
  ngOnInit(): void {
    this.getJobsList();
  }
  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
