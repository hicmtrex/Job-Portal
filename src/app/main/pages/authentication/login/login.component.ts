import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shard/services/auth.service';
import { userLoginPending } from 'src/app/shard/store/auth/actions';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formData!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<StoreAppTypes>,
    private authSerive: AuthService,
    private router: Router
  ) {
    if (this.authSerive.isAuthCheck()) this.router.navigate(['/']);
  }

  createForm() {
    this.formData = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    this.store.dispatch(userLoginPending(this.formData.value));
  }

  ngOnInit(): void {
    this.createForm();
  }
}
