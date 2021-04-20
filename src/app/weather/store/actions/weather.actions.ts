import {createAction, props} from '@ngrx/store';
import {DailyForecast} from '../../models/five-day-forecast-response.model';

export const updateCurrentLocation = createAction(
  '[Weather] Update Current Location',
  props<{ key: string, name: string }>());

export const loadFiveDaysForecast = createAction('[Weather] Load 5 Days Forecast');

export const loadFiveDaysForecastSuccess = createAction(
  '[Weather] Load 5 Days Forecast Success',
  props<{ forecast: DailyForecast[] }>());

export const loadFiveDaysForecastFail = createAction(
  '[Weather] Load 5 Days Forecast Fail',
  props<{ payload: any }>());
