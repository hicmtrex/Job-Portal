import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AuthService } from './shard/services/auth.service';
import { userRefreshPending } from './shard/store/auth/actions';
import { authLoading } from './shard/store/auth/selectors';
import { StoreAppTypes } from './utils/interfaces/store.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loading$ = this.store.pipe(select(authLoading));

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
