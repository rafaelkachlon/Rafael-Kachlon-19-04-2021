import {LocationModel} from '../../models/location.model';
import {Action, createReducer, on} from '@ngrx/store';
import {updateFavorites} from '../actions/favorites.actions';

export interface FavoritesState {
  Locations: LocationModel[];
}

export const initialState: FavoritesState = {
  Locations: []
};

const favoritesReducer = createReducer(
  initialState,
  on(updateFavorites, (state, {location}) => {
    const exist = state.Locations.find(l => l.key === location.key);
    if (exist) {
      return {
        ...state,
        Locations: state.Locations.filter(l => l.key !== location.key)
      };
    } else {
      return {
        ...state,
        Locations: [...state.Locations, location]
      };
    }
  })
);

export function reducer(state: FavoritesState | undefined, action: Action): any {
  return favoritesReducer(state, action);
}

