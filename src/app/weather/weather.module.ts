import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherContainerComponent} from './weather-container/weather-container.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {HttpClientModule} from '@angular/common/http';
import {ForecastListComponent} from './weather-container/forecast-list/forecast-list.component';
import {ForecastCardComponent} from './weather-container/forecast-card/forecast-card.component';
import {StoreModule} from '@ngrx/store';
import {reducers, weatherFeatureKey} from './store/reducers';
import {AlphabeticPipe} from './pipes/alpha-betical.pipe';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@NgModule({
  declarations: [WeatherContainerComponent, FavoritesComponent, ForecastListComponent, ForecastCardComponent, AlphabeticPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    AutoCompleteModule,
    ToastModule,
    StoreModule.forFeature(weatherFeatureKey, reducers)
  ],
  providers: [MessageService]
})
export class WeatherModule {
}
