import {ForecastState} from '../reducers/weather.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {weatherFeatureKey, WeatherState} from '../reducers';


export const selectWeatherFeature = createFeatureSelector<WeatherState>(weatherFeatureKey);

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
