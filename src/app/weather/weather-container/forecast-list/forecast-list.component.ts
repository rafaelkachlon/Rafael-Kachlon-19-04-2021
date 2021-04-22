import {ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ForecastModel} from '../../models/five-day-forecast-response.model';
import {DatePipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {LocationModel} from '../../models/location.model';
import {selectFavoriteLocations} from '../../store/selectors/favorites.selector';
import {Observable} from 'rxjs';
import {Local} from 'protractor/built/driverProviders';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class ForecastListComponent implements OnInit {

  @Input() location: LocationModel;
  @Input() forecast: ForecastModel[];
  @Output() OnFavoriteClick = new EventEmitter();
  favorites$: Observable<LocationModel[]>;
  favorites: LocationModel[];

  constructor(private date: DatePipe,
              private store: Store) {
  }

  ngOnInit(): void {
    this.favorites$ = this.store.select(selectFavoriteLocations);
    this.favorites$.subscribe(favs => this.favorites = favs);
  }

  addRemoveFromFavorites(): void {
    this.OnFavoriteClick.emit(this.location);
  }

  get dateRange(): string {
    const startDate = this.date.transform(this.forecast[0].date, 'MMMM dd');
    const endDate = this.date.transform(this.forecast[this.forecast.length - 1].date, 'MMMM dd');
    return `${startDate} - ${endDate}`;
  }

  get isFavorite(): boolean {
    return this.favorites.some(x => x.key === this.location.key);
  }
}
