import { Component, Input } from '@angular/core';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent {
  @Input() job!: JobTypes;
}
