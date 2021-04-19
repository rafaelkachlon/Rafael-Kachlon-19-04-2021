import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {Observable} from 'rxjs';
import {AutocompleteResponseModel} from '../models/autocomplete-response.model';
import {FiveDayForecastResponse} from '../models/five-day-forecast-response.model';

@Component({
  selector: 'app-weather-container',
  templateUrl: './weather-container.component.html',
  styleUrls: ['./weather-container.component.scss']
})
export class WeatherContainerComponent implements OnInit {

  results$: Observable<AutocompleteResponseModel[]>;
  fiveDaysForecast$: Observable<FiveDayForecastResponse>;
  SelectedCityName: string;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.SelectedCityName = 'Tel Aviv';
    this.fiveDaysForecast$ = this.weatherService.getForecastByLocationKey('fff');
  }

  search(event): void {
    this.results$ = this.weatherService.getCitiesAutoComplete(event.query);
  }

  selectCity(city: AutocompleteResponseModel): void {
    this.SelectedCityName = city.LocalizedName;
    this.fiveDaysForecast$ = this.weatherService.getForecastByLocationKey(city.Key);
  }

}
