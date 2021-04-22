import {createAction, props} from '@ngrx/store';
import {LocationModel} from '../../models/location.model';

export const updateFavorites = createAction(
  '[Favorites] Update Favorites',
  props<{ location: LocationModel }>());
