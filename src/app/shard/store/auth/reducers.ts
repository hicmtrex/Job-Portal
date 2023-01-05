import { createReducer, on } from '@ngrx/store';
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
import { AuthInitialState } from './interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'ngx-webstorage';

// const jwt = new JwtHelperService();
// const storage = new LocalStorageService({get()});

export const initialState: AuthInitialState = {
  isLoading: false,
  user: null,
  error: null,
  token: null,
  isAuth: false,
};

export const authReducer = createReducer(
  initialState,
  //register
  //logout
  on(userRegisterPending, (state) => ({ ...state, isLoading: true })),
  on(userRegisterSuccess, (state) => ({ ...state, isLoading: false })),
  on(userRegisterFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  //Login
  on(userLoginPending, (state) => ({ ...state, isLoading: true })),
  on(userLoginSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    isAuth: true,
    token: action.token,
  })),
  on(userLoginFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  //refresh
  on(userRefreshPending, (state) => ({ ...state, isLoading: true })),
  on(userRefreshSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    isAuth: true,
    token: action.token,
  })),
  on(userRefreshFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  //logout
  on(userLogoutPending, (state) => ({ ...state, isLoading: true })),
  on(userLogoutSuccess, (state) => ({
    ...state,
    isLoading: false,
    token: null,
    isAuth: false,
  })),
  on(userLogoutFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
