import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {Observable} from 'rxjs';
import {AutocompleteResponseModel} from '../models/autocomplete-response.model';
import {ForecastModel} from '../models/five-day-forecast-response.model';
import {Store} from '@ngrx/store';
import {selectCurrentLocation, selectFiveDaysForecast} from '../store/selectors/forecast.selector';
import * as fromActions from '../store/actions/weather.actions';
import {first} from 'rxjs/operators';
import {LocationModel} from '../models/location.model';
import {updateFavorites} from '../store/actions/favorites.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-weather-container',
  templateUrl: './weather-container.component.html',
  styleUrls: ['./weather-container.component.scss']
})
export class WeatherContainerComponent implements OnInit {

  results$: Observable<AutocompleteResponseModel[]>;
  fiveDaysForecast$: Observable<ForecastModel[]>;

  CurrentLocation$: Observable<LocationModel>;
  locationFromFavorites;

  constructor(private weatherService: WeatherService,
              private store: Store,
              private router: Router) {
    this.locationFromFavorites = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    this.CurrentLocation$ = this.store.select(selectCurrentLocation);
    this.fiveDaysForecast$ = this.store.select(selectFiveDaysForecast);
    if (!this.locationFromFavorites) {
      this.CurrentLocation$.pipe(first()).subscribe(location => {
        this.store.dispatch(fromActions.updateCurrentLocation(location));
      });
    }
  }

  search(event): void {
    this.results$ = this.weatherService.getCitiesAutoComplete(event.query);
  }

  selectLocation(location: LocationModel): void {
    this.store.dispatch(fromActions.updateCurrentLocation(location));
  }

  UpdateFavorites(location: LocationModel): void {
    this.store.dispatch(updateFavorites({location}));
  }
}
