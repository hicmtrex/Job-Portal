import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { DashboardJobsService } from 'src/app/dashboard/services/dashboard-jobs.service';
import { UpdateJob } from 'src/app/dashboard/store/jobs/actions';
import { JobTypes } from 'src/app/utils/interfaces/jobs.interface';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css'],
})
export class EditJobComponent implements OnInit {
  job: any;
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
  experiencesArray: any[] = [];
  requiredKnowledgeArray: any[] = [];
  formData!: FormGroup;
  bsValue = new Date();
  bsRangeValue!: Date[];
  maxDate = new Date();

  constructor(
    private dialog: DialogRef<EditJobComponent>,
    private toast: ToastrService,
    private builder: FormBuilder,
    private store: Store<StoreAppTypes>,
    private jobService: DashboardJobsService
  ) {
    this.job = this.dialog.data;
    this.experiencesArray = this.job.experience;
    this.requiredKnowledgeArray = this.job.requiredKnowledge;
    this.jobTypes = this.jobTypes.filter((j) => j !== this.job.jobNature);
    this.categories = this.categories.filter((c) => c !== this.job.jobNature);
  }

  createForm() {
    this.formData = this.builder.group({
      title: [this.job?.title, [Validators.required]],
      companyName: [this.job?.title, [Validators.required]],
      image: [this.job?.image, [Validators.required]],
      email: [this.job?.email, [Validators.required, Validators.email]],
      website: [this.job?.website, [Validators.required]],
      category: [this.job?.category, [Validators.required]],
      salary: [this.job?.salary, [Validators.required]],
      location: [this.job?.location, [Validators.required]],
      jobNature: [this.job?.jobNature, [Validators.required]],
      description: [this.job?.description, [Validators.required]],
      applicationDate: [this.job?.applicationDate, [Validators.required]],
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
    if (!this.categories.length || !this.jobTypes.length) return;
    const model = {
      ...this.formData.value,
      experience: this.experiencesArray,
      requiredKnowledge: this.requiredKnowledgeArray,
      applicationDate: new Date(
        this.formData.value.applicationDate
      ).toLocaleString(),
      id: this.job?.id,
    };

    this.store.dispatch(UpdateJob({ job: model }));
    this.dialog.close(true);
  }
  ngOnInit(): void {
    this.createForm();
  }
}
