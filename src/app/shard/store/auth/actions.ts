import { createAction, props } from '@ngrx/store';

//register
export const userRegisterPending = createAction(
  '[Register] Register Pending',

  props<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>()
);

export const userRegisterSuccess = createAction(
  '[Register] Register Success',
  props<{ token: string }>()
);
export const userRegisterFailure = createAction(
  '[Register] Register Failure',
  props<{ error: string }>()
);

//login
export const userLoginPending = createAction(
  '[Login] Login Pending',
  props<{ email: string; password: string }>()
);
export const userLoginSuccess = createAction(
  '[Login] Login Success',
  props<{ token: string }>()
);
export const userLoginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: string }>()
);

//refresh
export const userRefreshPending = createAction('[Refresh] Refresh Pending');

export const userRefreshSuccess = createAction(
  '[Refresh] Refresh Success',
  props<{ token: string }>()
);
export const userRefreshFailure = createAction(
  '[Refresh] Refresh Failure',
  props<{ error: string }>()
);

//logout
export const userLogoutPending = createAction('[Logout] Logout Pending');

export const userLogoutSuccess = createAction('[Logout] Logout Success');
export const userLogoutFailure = createAction(
  '[Logout] Logout Failure',
  props<{ error: string }>()
);
