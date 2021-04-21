import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromActions from '../actions/weather.actions';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {WeatherService} from '../../services/weather.service';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';

@Injectable()
export class WeatherEffects {

  constructor(private actions$: Actions,
              private weatherService: WeatherService,
              private store$: Store) {
  }

  // locationAutoComplete$

  fiveDailyForecast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.updateCurrentLocation),
      withLatestFrom(this.store$),
      map(([action]) => {
        return action;
      }),
      switchMap((action) => this.weatherService.getForecastByLocationKey(action.key)
        .pipe(
          map(forecast => {
            return fromActions.loadFiveDaysForecastSuccess({forecast});
          }),
          catchError(error => of(fromActions.loadFiveDaysForecastFail(error)))
        )
      )
    );
  });
}
