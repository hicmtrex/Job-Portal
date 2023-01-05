import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-webstorage';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';
import {
  RegisterCredentials,
  UserInfoTypes,
} from 'src/app/utils/interfaces/user.interface';
import { enviroment } from 'src/environments/environment';
import { LoginCredentials } from '../store/auth/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  jwt = new JwtHelperService();
  apiUrl: string = `${enviroment.apiUrl}/auth`;
  token: string | null = null;
  user: UserInfoTypes | null = null;
  redirectUrl: string = '';

  constructor(
    private http: HttpClient,
    private store: Store<StoreAppTypes>,
    private storage: LocalStorageService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((res) => {
      this.redirectUrl = res['redirectUrl'] || '/';
    });
  }

  isAuth: boolean = this.storage.retrieve('hicmjobs-auth') ? true : false;

  userRegister(registerData: RegisterCredentials) {
    return this.http.post(this.apiUrl, registerData, {
      withCredentials: true,
    });
  }
  userLogin(loginData: LoginCredentials) {
    return this.http.post(`${this.apiUrl}/login`, loginData, {
      withCredentials: true,
    });
  }
  refreshToken() {
    return this.http.get(`${this.apiUrl}/refresh`, { withCredentials: true });
  }

  userLogout() {
    return this.http.get(`${this.apiUrl}/logout`, { withCredentials: true });
  }

  isAuthCheck(): boolean {
    if (!this.token) return false;
    if (this.jwt.isTokenExpired(this.token)) return false;

    return true;
  }

  getUserData(token: any) {
    if (!token) return;
    const decode = this.jwt.decodeToken(token);
    const userInfo = {
      id: decode.id,
      firstName: decode.firstName,
      lastName: decode.lastName,
      email: decode.email,
      image: decode.image,
      role: decode.role,
      address: decode?.address,
      phone: decode?.phone,
      createdAt: decode.createdAt,
    };
    this.user = userInfo;
    this.token = token;
  }

  ngOnInit(): void {}
}
