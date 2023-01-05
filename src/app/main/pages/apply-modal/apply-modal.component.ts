import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApplyService } from '../../services/apply.service';

@Component({
  selector: 'app-apply-modal',
  templateUrl: './apply-modal.component.html',
  styleUrls: ['./apply-modal.component.css'],
})
export class ApplyModalComponent implements OnInit {
  formData!: FormGroup;
  resume!: string;
  jobId!: any;

  constructor(
    private fb: FormBuilder,
    private applyServier: ApplyService,
    private dialog: DialogRef<ApplyModalComponent>,
    private toast: ToastrService
  ) {
    this.jobId = this.dialog.data;
  }

  createForm() {
    this.formData = this.fb.group({
      letterMotivation: ['', [Validators.required]],
    });
  }

  setImage(event: any) {
    this.resume = event.target.files[0];
  }

  submit() {
    if (!this.resume) return;
    const formDataa = new FormData();
    formDataa.append('file', this.resume);
    formDataa.append('letter', this.formData.value.letterMotivation);
    formDataa.append('jobId', this.jobId);
    this.applyServier.createApply(formDataa).subscribe({
      complete: () => {
        this.toast.success('you have Apply successfully');
        this.dialog.close(true);
      },
    });
  }

  ngOnInit(): void {
    this.createForm();
  }
}
