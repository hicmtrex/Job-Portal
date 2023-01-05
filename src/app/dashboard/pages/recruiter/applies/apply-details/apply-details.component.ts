import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApplyService } from 'src/app/dashboard/services/apply.service';
import { ApplyType } from 'src/app/utils/interfaces/apply.interface';

@Component({
  selector: 'app-apply-details',
  templateUrl: './apply-details.component.html',
  styleUrls: ['./apply-details.component.css'],
})
export class ApplyDetailsComponent implements OnInit {
  apply!: ApplyType;
  id: string = '';

  constructor(
    private applyService: ApplyService,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  getApplyDetails() {
    this.applyService.getApplyById(this.id).subscribe({
      next: (data: any) => {
        this.apply = data;
      },
    });
  }

  updateApply(status: string) {
    this.applyService.updateApply({ id: this.id, status }).subscribe({
      next: () => {
        this.getApplyDetails();
        this.toast.success(`Apply has been ${status}`);
      },
    });
  }

  ngOnInit(): void {
    this.getApplyDetails();
  }
}
