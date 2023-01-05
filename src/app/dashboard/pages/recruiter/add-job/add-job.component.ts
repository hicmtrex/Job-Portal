import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { DashboardJobsService } from 'src/app/dashboard/services/dashboard-jobs.service';
import { AddNewJob } from 'src/app/dashboard/store/jobs/actions';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css'],
})
export class AddJobComponent implements OnInit {
  experiencesArray: any[] = [];
  requiredKnowledgeArray: any[] = [];
  formData!: FormGroup;
  categories: string[] = [
    'Web Development',
    'Mobile Development',
    'Data science',
    'Warehouse',
  ];
  salaries: string[] = [
    '400$ - 600$',
    '$600 - $800',
    '$800 - $1000',
    '$1000 - $1500',
    '$1500 - $2000',
    '$2000 - $3000',
    '$3000 - $4000',
    '$5000 - $6000',
    '$6000+',
  ];
  jobTypes: string[] = ['Full time', 'Part time', 'Remote', 'Freelance'];
  constructor(
    private dialog: DialogRef<AddJobComponent>,
    private toast: ToastrService,
    private builder: FormBuilder,
    private store: Store<StoreAppTypes>,
    private jobService: DashboardJobsService
  ) {}

  createForm() {
    this.formData = this.builder.group({
      title: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      image: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      website: ['', [Validators.required]],
      category: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      location: ['', [Validators.required]],
      jobNature: ['', [Validators.required]],
      description: ['', [Validators.required]],
      applicationDate: ['', [Validators.required]],
      experience: [''],
      requiredKnowledge: [''],
    });
  }

  setExperiance() {
    this.experiencesArray = [
      ...this.experiencesArray,
      this.formData.value.experience,
    ];

    this.formData.get('experience')?.setValue('');
  }

  setRequiredKnowledge() {
    this.requiredKnowledgeArray = [
      ...this.requiredKnowledgeArray,
      this.formData.value.requiredKnowledge,
    ];
    this.formData.get('requiredKnowledge')?.setValue('');
  }

  experianceRemove(ea: string) {
    this.experiencesArray = this.experiencesArray.filter((r) => r !== ea);
  }

  requiredKnowledgeRemove(rk: string) {
    this.requiredKnowledgeArray = this.requiredKnowledgeArray.filter(
      (r) => r !== rk
    );
  }

  submit() {
    const model = {
      ...this.formData.value,
      experience: this.experiencesArray,
      requiredKnowledge: this.requiredKnowledgeArray,
      applicationDate: new Date(
        this.formData.value.applicationDate
      ).toLocaleString(),
    };

    this.store.dispatch(AddNewJob({ job: model }));
    this.dialog.close(true);
  }
  ngOnInit(): void {
    this.createForm();
  }
}
