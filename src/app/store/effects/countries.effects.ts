import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CountriesService, Response } from 'src/app/services/countries.service';
import * as employeeActions from '../actions/countries.actions';

@Injectable()
export class CountriesEffects {
  constructor(
    private actions$: Actions,
    private countries$: CountriesService
  ) {}

  getCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(employeeActions.getCountries),
      mergeMap(() =>
        this.countries$.getCountries().pipe(
          map((response: Response) => {
            return employeeActions.getCountriesSuccess({
              countries: response.data,
            });
          }),
          catchError(({ status }: HttpErrorResponse) =>
            of(
              employeeActions.getCountriesFailure({
                payload: { status },
              })
            )
          )
        )
      )
    );
  });
}
