import {DailyForecast} from '../../models/five-day-forecast-response.model';
import {Action, createReducer, on} from '@ngrx/store';
import {loadFiveDaysForecastSuccess, updateCurrentLocation} from '../actions/weather.actions';

export interface ForecastState {
  currentLocation: { key: string, name: string };
  fiveDaysForecast: DailyForecast[];
}

export const initialState: ForecastState = {
  currentLocation: {key: '215854', name: 'Tel Aviv'},
  fiveDaysForecast: []
};
const forecastReducer = createReducer(
  initialState,
  on(updateCurrentLocation, (state, {key, name}) => ({...state, currentLocation: {key, name}})),
  on(loadFiveDaysForecastSuccess, (state, {forecast}) => ({...state, fiveDaysForecast: forecast}))
);

export function reducer(state: ForecastState | undefined, action: Action): any {
  return forecastReducer(state, action);
}
