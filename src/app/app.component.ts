import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './shard/services/auth.service';
import { userRefreshPending } from './shard/store/auth/actions';
import { StoreAppTypes } from './utils/interfaces/store.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private store: Store<StoreAppTypes>,
    private authService: AuthService,
    public spinner: NgxSpinnerService
  ) {
    if (this.authService.isAuth) {
      this.store.dispatch(userRefreshPending());
    }
  }
}
