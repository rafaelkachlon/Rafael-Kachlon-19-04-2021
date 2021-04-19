import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherContainerComponent } from './weather-container/weather-container.component';
import { FavoritesComponent } from './favorites/favorites.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {HttpClientModule} from '@angular/common/http';
import { ForecastListComponent } from './weather-container/forecast-list/forecast-list.component';
import { ForecastCardComponent } from './weather-container/forecast-card/forecast-card.component';



@NgModule({
  declarations: [WeatherContainerComponent, FavoritesComponent, ForecastListComponent, ForecastCardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AutoCompleteModule,
  ]
})
export class WeatherModule { }
