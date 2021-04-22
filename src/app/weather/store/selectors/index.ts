import {createFeatureSelector} from '@ngrx/store';
import {weatherFeatureKey, WeatherState} from '../reducers';
export const selectWeatherFeature = createFeatureSelector<WeatherState>(weatherFeatureKey);
