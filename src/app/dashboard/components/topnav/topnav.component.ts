import { Component } from '@angular/core';
import { AuthService } from 'src/app/shard/services/auth.service';
import { UserInfoTypes } from 'src/app/utils/interfaces/user.interface';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css'],
})
export class TopnavComponent {
  constructor(private authService: AuthService) {}

  public get user(): UserInfoTypes | null {
    return this.authService.user;
  }
}
