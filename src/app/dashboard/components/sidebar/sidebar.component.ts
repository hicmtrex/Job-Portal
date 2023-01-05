import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shard/services/auth.service';
import { userLogoutPending } from 'src/app/shard/store/auth/actions';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';
import { UserInfoTypes } from 'src/app/utils/interfaces/user.interface';
import { enviroment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  apiUrl: string = enviroment.apiUrl;
  constructor(
    private authService: AuthService,
    private store: Store<StoreAppTypes>
  ) {}

  public get user(): UserInfoTypes | null {
    return this.authService.user;
  }

  onLogout(): void {
    this.store.dispatch(userLogoutPending());
  }
}
