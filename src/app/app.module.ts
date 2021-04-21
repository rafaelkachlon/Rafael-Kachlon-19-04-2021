import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {ToolbarModule} from 'primeng/toolbar';
import {WeatherModule} from './weather/weather.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WeatherEffects} from './weather/store/effects/weather.effects';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([WeatherEffects]),
    FormsModule,
    WeatherModule,
    ToolbarModule,
    SelectButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
