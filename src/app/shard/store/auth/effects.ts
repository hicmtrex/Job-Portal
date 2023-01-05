import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {
  userLoginFailure,
  userLoginPending,
  userLoginSuccess,
  userLogoutFailure,
  userLogoutPending,
  userLogoutSuccess,
  userRefreshFailure,
  userRefreshPending,
  userRefreshSuccess,
  userRegisterFailure,
  userRegisterPending,
  userRegisterSuccess,
} from './actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService,
    private storage: LocalStorageService
  ) {}

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userRegisterPending),
      exhaustMap((action) => {
        return this.authService
          .userRegister({
            firstName: action.firstName,
            lastName: action.lastName,
            email: action.email,
            password: action.password,
          })
          .pipe(
            map((data: any) => {
              this.authService.getUserData(data.token);
              this.storage.store('hicmjobs-auth', 'connected');
              this.toast.success('you have been registered successfully');
              this.router.navigate(['/']);
              return userRegisterSuccess({ token: data.token });
            }),
            catchError((err) => {
              return of(userRegisterFailure({ error: err.message }));
            })
          );
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userLoginPending),
      exhaustMap((action) => {
        return this.authService
          .userLogin({ email: action.email, password: action.password })
          .pipe(
            map((data: any) => {
              this.authService.getUserData(data.token);
              this.storage.store('hicmjobs-auth', 'connected');
              // this.router.navigate([]);
              location.href = this.authService.redirectUrl;
              return userLoginSuccess({ token: data.token });
            }),
            catchError((err) => {
              return of(userLoginFailure({ error: err.message }));
            })
          );
      })
    );
  });

  refreshToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userRefreshPending),
      exhaustMap((action) => {
        return this.authService.refreshToken().pipe(
          map((data: any) => {
            if (data) this.authService.getUserData(data.token);

            return userRefreshSuccess({ token: data.token });
          }),
          catchError((err) => {
            return of(userRefreshFailure({ error: err.message }));
          })
        );
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userLogoutPending),
      exhaustMap((action) => {
        return this.authService.userLogout().pipe(
          map(() => {
            this.authService.token = null;
            this.authService.isAuth = false;
            this.storage.clear('hicmjobs-auth');
            return userLogoutSuccess();
          }),
          catchError((err) => {
            return of(userLogoutFailure({ error: err.message }));
          })
        );
      })
    );
  });
}
