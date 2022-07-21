import { createSelector } from '@ngrx/store';
import { CountryInfo } from 'src/app/services/countries.service';
import { AppState } from '../app.reducers';

export interface CountryState {
  loading: boolean;
  countries: CountryInfo[];
}

export const selectCountriesInfo = (state: AppState) => state.countries;

export const selectCountries = createSelector(
  selectCountriesInfo,
  (state: CountryState) => ({
    loading: state?.loading,
    countries: state?.countries,
  })
);
