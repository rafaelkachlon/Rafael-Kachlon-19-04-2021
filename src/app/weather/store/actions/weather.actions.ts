import {createAction, props} from '@ngrx/store';
import {ForecastModel} from '../../models/five-day-forecast-response.model';
import {LocationModel} from '../../models/location.model';

export const updateCurrentLocation = createAction(
  '[Weather] Update Current Location',
  props<LocationModel>());

export const loadFiveDaysForecast = createAction('[Weather] Load 5 Days Forecast');

export const loadFiveDaysForecastSuccess = createAction(
  '[Weather] Load 5 Days Forecast Success',
  props<{ forecast: ForecastModel[] }>());

export const loadFiveDaysForecastFail = createAction(
  '[Weather] Load 5 Days Forecast Fail',
  props<{ payload: any }>());
