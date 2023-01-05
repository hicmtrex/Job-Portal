import { createSelector } from '@ngrx/store';
import { StoreAppTypes } from 'src/app/utils/interfaces/store.interface';

export const getAuthState = (state: StoreAppTypes) => state.auth;

export const isAuth = createSelector(getAuthState, (state) => state.isAuth);
export const token = createSelector(getAuthState, (state) => state.token);
