import * as fromForecast from './weather.reducer';
import * as fromFavorites from './favorites.reducer';
import {ActionReducerMap} from '@ngrx/store';


export interface WeatherState {
  forecasts: fromForecast.ForecastState;
  favorites: fromFavorites.FavoritesState;
}

export const reducers: ActionReducerMap<WeatherState> = {
  forecasts: fromForecast.reducer,
  favorites: fromFavorites.reducer
};
export const weatherFeatureKey = 'weather';
