import {ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {ForecastModel} from '../../models/five-day-forecast-response.model';
import {DatePipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {LocationModel} from '../../models/location.model';
import {selectFavoriteLocations} from '../../store/selectors/favorites.selector';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class ForecastListComponent implements OnInit, OnDestroy {

  @Input() location: LocationModel;
  @Input() forecast: ForecastModel[];
  @Output() OnFavoriteClick = new EventEmitter();
  favorites$: Observable<LocationModel[]>;
  favorites: LocationModel[];
  favoritesSubscriber: Subscription;

  constructor(private date: DatePipe,
              private store: Store) {
  }

  ngOnInit(): void {
    this.favorites$ = this.store.select(selectFavoriteLocations);
    this.favoritesSubscriber = this.favorites$.subscribe(favs => this.favorites = favs);
  }

  addRemoveFromFavorites(): void {
    this.OnFavoriteClick.emit(this.location);
  }

  get dateRange(): string {
    if (this.forecast.length) {
      const startDate = this.date.transform(this.forecast[0].date, 'MMMM dd');
      const endDate = this.date.transform(this.forecast[this.forecast.length - 1].date, 'MMMM dd');
      return `${startDate} - ${endDate}`;
    }
    return '';
  }

  get isFavorite(): boolean {
    return this.favorites.some(x => x.key === this.location.key);
  }

  ngOnDestroy(): void {
    this.favoritesSubscriber.unsubscribe();
  }
}
