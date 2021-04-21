import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {Observable} from 'rxjs';
import {AutocompleteResponseModel} from '../models/autocomplete-response.model';
import {ForecastModel} from '../models/five-day-forecast-response.model';
import {Store} from '@ngrx/store';
import {selectCurrentLocation} from '../store/selectors/forecast.selector';
import * as fromActions from '../store/actions/weather.actions';
import {first} from 'rxjs/operators';
import {LocationModel} from '../models/location.model';

@Component({
  selector: 'app-weather-container',
  templateUrl: './weather-container.component.html',
  styleUrls: ['./weather-container.component.scss']
})
export class WeatherContainerComponent implements OnInit {

  results$: Observable<AutocompleteResponseModel[]>;
  fiveDaysForecast$: Observable<ForecastModel[]>;

  CurrentLocation$: Observable<LocationModel>;

  constructor(private weatherService: WeatherService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.CurrentLocation$ = this.store.select(selectCurrentLocation);
    this.CurrentLocation$.pipe(first()).subscribe(location => {
      this.fiveDaysForecast$ = this.weatherService.getForecastByLocationKey(location.key);
    });
  }

  search(event): void {
    this.results$ = this.weatherService.getCitiesAutoComplete(event.query);
  }

  selectCity(city: LocationModel): void {
    const {key, name} = city;
    this.store.dispatch(fromActions.updateCurrentLocation({key, name}));
  }

}
