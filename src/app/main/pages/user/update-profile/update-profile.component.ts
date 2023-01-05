import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/main/services/user.service';
import { UserInfoTypes } from 'src/app/utils/interfaces/user.interface';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  formData!: FormGroup;
  user!: UserInfoTypes | any;
  constructor(
    private fb: FormBuilder,
    private dialog: DialogRef<UpdateProfileComponent>,
    public toast: ToastrService,
    private userService: UserService
  ) {
    this.user = this.dialog.data;
  }

  createForm() {
    this.formData = this.fb.group({
      firstName: [this.user?.firstName, [Validators.required]],
      lastName: [this.user?.lastName, [Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone: [this.user?.phone],
      address: [this.user?.address],
    });
  }

  submit() {
    const model = { ...this.formData.value, id: this.user.id };
    this.userService.updateUser(model).subscribe({
      complete: () => {
        this.toast.success('profile has been updated');
        this.dialog.close(true);
      },
    });
  }

  ngOnInit(): void {
    this.createForm();
  }
}
