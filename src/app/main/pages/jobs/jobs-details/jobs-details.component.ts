import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shard/services/auth.service';
import { JobsService } from 'src/app/shard/services/jobs-service';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';
import { ApplyModalComponent } from '../../apply-modal/apply-modal.component';

@Component({
  selector: 'app-jobs-details',
  templateUrl: './jobs-details.component.html',
  styleUrls: ['./jobs-details.component.css'],
})
export class JobsDetailsComponent implements OnInit, OnDestroy {
  id: string = '';
  job!: JobTypes;
  dataSub!: Subscription;
  constructor(
    private jobService: JobsService,
    private route: ActivatedRoute,
    private dialog: DialogService,
    private authSerive: AuthService,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  getJobDetails() {
    this.dataSub = this.jobService.getJobById(this.id).subscribe({
      next: (data: any) => {
        this.job = data;
      },
    });
  }

  openApply(): any {
    if (!this.authSerive.isAuth) {
      return this.router.navigate([this.authSerive.redirectUrl]);
    }

    const dialogRef = this.dialog.open(ApplyModalComponent, {
      data: this.job.id,
    });
    dialogRef.afterClosed$.subscribe((res) => res && this.getJobDetails());
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    this.getJobDetails();
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
