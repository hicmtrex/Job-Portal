import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shard/services/auth.service';
import { userLogoutPending } from 'src/app/shard/store/auth/actions';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';
import { UserInfoTypes } from 'src/app/utils/interfaces/user.interface';
import { enviroment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  image: string = '';
  
  constructor(
    public authService: AuthService,
    private store: Store<StoreAppTypes>
  ) {
    this.image = `${enviroment.apiUrl}/${this.authService.user?.image}`;
  }

  public get user(): UserInfoTypes | null {
    return this.authService.user;
  }

  // public get isAuthCheck(): boolean {
  //   return this.authService.isAuthCheck();
  // }

  onLogout(): void {
    this.store.dispatch(userLogoutPending());
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }
}
