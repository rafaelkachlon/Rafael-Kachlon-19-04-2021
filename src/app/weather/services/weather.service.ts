import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AutocompleteResponseModel} from '../models/autocomplete-response.model';
import {forkJoin, Observable,  throwError} from 'rxjs';
import {DailyForecast, ForecastModel} from '../models/five-day-forecast-response.model';
import {catchError, map, pluck} from 'rxjs/operators';
import {LocationModel} from '../models/location.model';
import {CurrentConditionsResponse, CurrentForecastModel} from '../models/current-conditions.model';
import {environment} from '../../../environments/environment';
import {MessageService} from 'primeng/api';
import {GeoPositionResponse} from '../models/geo-position.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient,
              private message: MessageService) {
  }

  getCitiesAutoComplete(query: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}${environment.autoComplete}`, {
      params: {
        apikey: environment.apiKey,
        q: query
      }
    }).pipe(
      map((locations: AutocompleteResponseModel[]) => locations.map(location => {
        return {name: location.LocalizedName, key: location.Key};
      })),
      catchError(err => this.handleError(err, 'Cannot get autocomplete locations'))
    );
  }

  getFavoritesForecast(favorites: LocationModel[]): Observable<CurrentForecastModel[]> {
    const obj = favorites.map(fav => this.getCurrentForecast(fav));
    return forkJoin(obj).pipe(
      map(res => res),
    );
  }

  getForecastByLocationKey(key: string): Observable<ForecastModel[]> {
    return this.http.get(`${environment.baseUrl}${environment.fiveDaysForecast}${key}`, {
      params: {
        apikey: environment.apiKey
      }
    }).pipe(
      pluck('DailyForecasts'),
      map((res: DailyForecast[]) => {
        return res.map(forecast => {
          return this.createForecastModel(forecast);
        });
      }),
    );
  }

  getLocationByPosition(position: Position): Observable<LocationModel> {
    return this.http.get(`${environment.baseUrl}${environment.byGeoPosition}`, {
      params: {
        apikey: environment.apiKey,
        q: `${position.coords.latitude},${position.coords.longitude}`
      }
    }).pipe(
      map((location: GeoPositionResponse) => {
        return {key: location.Key, name: location.EnglishName};
      }),
      catchError(err => this.handleError(err, 'Cannot get condition of current position'))
    );
  }

  private getCurrentForecast(location: LocationModel): Observable<CurrentForecastModel> {
    return this.http.get(`${environment.baseUrl}${environment.currentCondition}${location.key}`, {
      params: {
        apikey: environment.apiKey
      }
    }).pipe(
      map((response: CurrentConditionsResponse[]) => this.createCurrentConditionsModel(response[0], location)),
            catchError(err => this.handleError(err, 'Cannot get current forecast'))
    );
  }

  private handleError(err: HttpErrorResponse, message: string): Observable<any> {
    this.message.add({
      severity: 'error', summary: 'Error', detail: message
    });
    return throwError(err);
  }

  private getCelsiusTemperature(fahrenheit: number): number {
    return Math.round((fahrenheit - 32) / 1.8);
  }

  private createForecastModel(forecast: DailyForecast): ForecastModel {
    return {
      iconUrl: `https://www.accuweather.com/images/weathericons/${forecast.Day.Icon}.svg`,
      iconText: forecast.Day.IconPhrase,
      maxTemperatureC: this.getCelsiusTemperature(forecast.Temperature.Maximum.Value),
      maxTemperatureF: forecast.Temperature.Maximum.Value,
      miniTemperatureF: forecast.Temperature.Minimum.Value,
      minTemperatureC: this.getCelsiusTemperature(forecast.Temperature.Minimum.Value),
      date: forecast.Date
    };
  }

  private createCurrentConditionsModel(item: CurrentConditionsResponse, location: LocationModel): CurrentForecastModel {
    return {
      key: location.key,
      name: location.name,
      iconUrl: `https://www.accuweather.com/images/weathericons/${item.WeatherIcon}.svg`,
      iconText: item.WeatherText,
      currentDate: item.LocalObservationDateTime,
      currentTemperatureC: item.Temperature.Metric.Value,
      currentTemperatureF: item.Temperature.Imperial.Value
    };
  }
}
