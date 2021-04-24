import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WeatherContainerComponent} from './weather/weather-container/weather-container.component';
import {FavoritesComponent} from './weather/favorites/favorites.component';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: WeatherContainerComponent},
  {path: 'main/:key', component: WeatherContainerComponent},
  {path: 'favorites', component: FavoritesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
