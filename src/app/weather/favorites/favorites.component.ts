import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromFavorites from '../store/selectors/favorites.selector';
import * as fromFavoritesActions from '../store/actions/favorites.actions';
import {LocationModel} from '../models/location.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites$: Observable<LocationModel[]>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.favorites$ = this.store.select(fromFavorites.selectFavoriteLocations);
  }

}
