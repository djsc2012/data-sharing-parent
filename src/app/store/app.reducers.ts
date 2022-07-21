import { ActionReducerMap, Action } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
  countries: reducers.CountryState;
}

export const appReducers: ActionReducerMap<AppState, Action> = {
  countries: reducers.countriesReducer
};
