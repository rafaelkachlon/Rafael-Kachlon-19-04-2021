import {ForecastState} from '../reducers/weather.reducer';
import {createSelector} from '@ngrx/store';
import {WeatherState} from '../reducers';
import {selectWeatherFeature} from './index';


export const selectForecasts = createSelector(
  selectWeatherFeature,
  (state: WeatherState) => state.forecasts
);
export const selectCurrentLocation = createSelector(
  selectForecasts,
  (state: ForecastState) => state.currentLocation
);
export const selectFiveDaysForecast = createSelector(
  selectForecasts,
  (state: ForecastState) => state.fiveDaysForecast
);
