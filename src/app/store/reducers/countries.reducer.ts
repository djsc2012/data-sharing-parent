import { createReducer, on } from '@ngrx/store';
import { CountryInfo } from 'src/app/services/countries.service';
import {
  getCountries,
  getCountriesFailure,
  getCountriesSuccess,
} from '../actions';

export interface CountryState {
  countries: CountryInfo[];
  loading: boolean;
  error: {
    status: number;
  };
}

export const countriesInitialState: CountryState = {
  countries: [],
  loading: true,
  error: {
    status: 0,
  },
};

const _countriesReducer = createReducer(
  countriesInitialState,
  on(getCountries, (state) => ({ ...state, loading: true })),
  on(getCountriesSuccess, (state, { countries }) => ({
    ...state,
    countries,
    loading: false,
  })),
  on(getCountriesFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }))
);

export function countriesReducer(state: CountryState = countriesInitialState, action: any) {
  return _countriesReducer(state, action);
}
