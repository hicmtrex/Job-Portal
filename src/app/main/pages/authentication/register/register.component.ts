import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shard/services/auth.service';
import { userRegisterPending } from 'src/app/shard/store/auth/actions';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formData!: FormGroup;
  constructor(
    private store: Store<StoreAppTypes>,
    private fb: FormBuilder,
    private authSerive: AuthService,
    private router: Router,
    public toast: ToastrService
  ) {
    if (this.authSerive.isAuthCheck()) this.router.navigate(['/']);
  }

  createForm() {
    this.formData = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  submit(): any {
    if (this.formData.value.password !== this.formData.value.confirmPassword)
      return this.toast.error('password does not match');

    this.store.dispatch(userRegisterPending(this.formData.value));
  }

  ngOnInit(): void {
    this.createForm();
  }
}
