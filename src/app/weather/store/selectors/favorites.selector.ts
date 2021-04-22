import {createSelector} from '@ngrx/store';
import {selectWeatherFeature} from './index';
import {WeatherState} from '../reducers';
import {FavoritesState} from '../reducers/favorites.reducer';

export const selectFavorites = createSelector(
  selectWeatherFeature,
  (state: WeatherState) => state.favorites
);
export const selectFavoriteLocations = createSelector(
  selectFavorites,
  (state: FavoritesState) => state.Locations
);
