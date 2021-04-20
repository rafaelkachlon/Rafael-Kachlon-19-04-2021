import * as fromForecast from './weather.reducer';
import {ActionReducerMap} from '@ngrx/store';


export interface WeatherState {
  forecasts: fromForecast.ForecastState;
  // favorties: FavoritesState;
}

export const reducers: ActionReducerMap<WeatherState> = {
  forecasts: fromForecast.reducer
};
export const weatherFeatureKey = 'weather';
