import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromFavorites from '../store/selectors/favorites.selector';
import {LocationModel} from '../models/location.model';
import {Observable} from 'rxjs';
import {WeatherService} from '../services/weather.service';
import {first} from 'rxjs/operators';
import {CurrentForecastModel} from '../models/current-conditions.model';
import {UnitTypeService} from '../services/unit-type.service';
import {Router} from '@angular/router';
import * as fromActions from '../store/actions/weather.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites$: Observable<LocationModel[]>;
  currentConditions$: Observable<CurrentForecastModel[]>;
  unitType$: Observable<string>;

  constructor(private store: Store,
              private weatherService: WeatherService,
              private unitTypeService: UnitTypeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.favorites$ = this.store.select(fromFavorites.selectFavoriteLocations);
    this.favorites$.pipe(first())
      .subscribe(favs => {
        this.currentConditions$ = this.weatherService.getFavoritesForecast(favs);
      });
    this.unitType$ = this.unitTypeService.getUnitType$();

  }

  goToMain(fav: CurrentForecastModel): void {
    const {key, name} = fav;
    this.store.dispatch(fromActions.updateCurrentLocation({key, name}));
    this.router.navigate(['main'], {state: {key, name}});
  }
}
