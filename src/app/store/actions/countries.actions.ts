import { createAction, props } from '@ngrx/store';
import { CountryInfo } from 'src/app/services/countries.service';

export const getCountries = createAction(
  '[Countries] Get Countries'
);

export const getCountriesSuccess = createAction(
  '[Countries] Get Countries Success',
  props<{ countries: CountryInfo[] }>()
);

export const getCountriesFailure = createAction(
  '[Countries] Get Countries Failure',
  props<{ payload: any }>()
);
