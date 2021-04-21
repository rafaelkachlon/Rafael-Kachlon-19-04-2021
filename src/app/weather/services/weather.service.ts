import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AutocompleteResponseModel} from '../models/autocomplete-response.model';
import {Observable, of} from 'rxjs';
import {DailyForecast, FiveDayForecastResponse, ForecastModel} from '../models/five-day-forecast-response.model';
import {map, pluck} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly autoCompleteMock: AutocompleteResponseModel[] = [
    {
      Version: 1,
      Key: '210841',
      Type: 'City',
      Rank: 20,
      LocalizedName: 'Tehran',
      Country: {
        ID: 'IR',
        LocalizedName: 'Iran'
      },
      AdministrativeArea: {
        ID: '07',
        LocalizedName: 'Tehran'
      }
    },
    {
      Version: 1,
      Key: '60592',
      Type: 'City',
      Rank: 23,
      LocalizedName: 'Tengzhou',
      Country: {
        ID: 'CN',
        LocalizedName: 'China'
      },
      AdministrativeArea: {
        ID: 'SD',
        LocalizedName: 'Shandong'
      }
    },
    {
      Version: 1,
      Key: '188046',
      Type: 'City',
      Rank: 30,
      LocalizedName: 'Tegucigalpa',
      Country: {
        ID: 'HN',
        LocalizedName: 'Honduras'
      },
      AdministrativeArea: {
        ID: 'FM',
        LocalizedName: 'Francisco Morazán'
      }
    },
    {
      Version: 1,
      Key: '45253',
      Type: 'City',
      Rank: 31,
      LocalizedName: 'Teresina',
      Country: {
        ID: 'BR',
        LocalizedName: 'Brazil'
      },
      AdministrativeArea: {
        ID: 'PI',
        LocalizedName: 'Piauí'
      }
    },
    {
      Version: 1,
      Key: '215854',
      Type: 'City',
      Rank: 31,
      LocalizedName: 'Tel Aviv',
      Country: {
        ID: 'IL',
        LocalizedName: 'Israel'
      },
      AdministrativeArea: {
        ID: 'TA',
        LocalizedName: 'Tel Aviv'
      }
    },
    {
      Version: 1,
      Key: '234337',
      Type: 'City',
      Rank: 31,
      LocalizedName: 'Tepic',
      Country: {
        ID: 'MX',
        LocalizedName: 'Mexico'
      },
      AdministrativeArea: {
        ID: 'NAY',
        LocalizedName: 'Nayarit'
      }
    },
    {
      Version: 1,
      Key: '246100',
      Type: 'City',
      Rank: 32,
      LocalizedName: 'Tetouan',
      Country: {
        ID: 'MA',
        LocalizedName: 'Morocco'
      },
      AdministrativeArea: {
        ID: '01',
        LocalizedName: 'Tanger-Tétouan-Al Hoceïma'
      }
    },
    {
      Version: 1,
      Key: '61484',
      Type: 'City',
      Rank: 33,
      LocalizedName: 'Tengchong',
      Country: {
        ID: 'CN',
        LocalizedName: 'China'
      },
      AdministrativeArea: {
        ID: 'YN',
        LocalizedName: 'Yunnan'
      }
    },
    {
      Version: 1,
      Key: '3558994',
      Type: 'City',
      Rank: 35,
      LocalizedName: 'Tecámac',
      Country: {
        ID: 'MX',
        LocalizedName: 'Mexico'
      },
      AdministrativeArea: {
        ID: 'MEX',
        LocalizedName: 'México'
      }
    },
    {
      Version: 1,
      Key: '234828',
      Type: 'City',
      Rank: 35,
      LocalizedName: 'Tehuacán',
      Country: {
        ID: 'MX',
        LocalizedName: 'Mexico'
      },
      AdministrativeArea: {
        ID: 'PUE',
        LocalizedName: 'Puebla'
      }
    }
  ];
  private readonly telAviv5Days: FiveDayForecastResponse = {
    Headline: {
      EffectiveDate: '2021-04-20T08:00:00+03:00',
      EffectiveEpochDate: 1618894800,
      Severity: 4,
      Text: 'Noticeably cooler Tuesday',
      Category: 'cooler',
      EndDate: '2021-04-20T20:00:00+03:00',
      EndEpochDate: 1618938000,
      MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?lang=en-us',
      Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us'
    },
    DailyForecasts: [
      {
        Date: '2021-04-18T07:00:00+03:00',
        EpochDate: 1618718400,
        Temperature: {
          Minimum: {
            Value: 70,
            Unit: 'F',
            UnitType: 18
          },
          Maximum: {
            Value: 93,
            Unit: 'F',
            UnitType: 18
          }
        },
        Day: {
          Icon: 1,
          IconPhrase: 'Sunny',
          HasPrecipitation: false
        },
        Night: {
          Icon: 38,
          IconPhrase: 'Mostly cloudy',
          HasPrecipitation: false
        },
        Sources: [
          'AccuWeather'
        ],
        MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us',
        Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us'
      },
      {
        Date: '2021-04-19T07:00:00+03:00',
        EpochDate: 1618804800,
        Temperature: {
          Minimum: {
            Value: 69,
            Unit: 'F',
            UnitType: 18
          },
          Maximum: {
            Value: 95,
            Unit: 'F',
            UnitType: 18
          }
        },
        Day: {
          Icon: 3,
          IconPhrase: 'Partly sunny',
          HasPrecipitation: false
        },
        Night: {
          Icon: 35,
          IconPhrase: 'Partly cloudy',
          HasPrecipitation: false
        },
        Sources: [
          'AccuWeather'
        ],
        MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us',
        Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us'
      },
      {
        Date: '2021-04-20T07:00:00+03:00',
        EpochDate: 1618891200,
        Temperature: {
          Minimum: {
            Value: 60,
            Unit: 'F',
            UnitType: 18
          },
          Maximum: {
            Value: 78,
            Unit: 'F',
            UnitType: 18
          }
        },
        Day: {
          Icon: 3,
          IconPhrase: 'Partly sunny',
          HasPrecipitation: false
        },
        Night: {
          Icon: 34,
          IconPhrase: 'Mostly clear',
          HasPrecipitation: false
        },
        Sources: [
          'AccuWeather'
        ],
        MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us',
        Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us'
      },
      {
        Date: '2021-04-21T07:00:00+03:00',
        EpochDate: 1618977600,
        Temperature: {
          Minimum: {
            Value: 60,
            Unit: 'F',
            UnitType: 18
          },
          Maximum: {
            Value: 75,
            Unit: 'F',
            UnitType: 18
          }
        },
        Day: {
          Icon: 4,
          IconPhrase: 'Intermittent clouds',
          HasPrecipitation: false
        },
        Night: {
          Icon: 35,
          IconPhrase: 'Partly cloudy',
          HasPrecipitation: false
        },
        Sources: [
          'AccuWeather'
        ],
        MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us',
        Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us'
      },
      {
        Date: '2021-04-22T07:00:00+03:00',
        EpochDate: 1619064000,
        Temperature: {
          Minimum: {
            Value: 61,
            Unit: 'F',
            UnitType: 18
          },
          Maximum: {
            Value: 76,
            Unit: 'F',
            UnitType: 18
          }
        },
        Day: {
          Icon: 2,
          IconPhrase: 'Mostly sunny',
          HasPrecipitation: false
        },
        Night: {
          Icon: 35,
          IconPhrase: 'Partly cloudy',
          HasPrecipitation: false
        },
        Sources: [
          'AccuWeather'
        ],
        MobileLink: 'http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us',
        Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us'
      }
    ]
  };

  private readonly apiKey = 'xqrHn8gB0aQpaC3m2Ujhadx9cd6RaZGt';
  private readonly baseUrl = 'http://dataservice.accuweather.com/';
  private readonly autoComplete = 'locations/v1/cities/autocomplete';

  constructor(private http: HttpClient) {
  }

  getCitiesAutoComplete(query: string): Observable<any> {
    return of(this.autoCompleteMock.filter((result) => result.LocalizedName.toLowerCase().includes(query.toLowerCase()))).pipe(
      map((locations: AutocompleteResponseModel[]) => locations.map(location => {
        return {name: location.LocalizedName, key: location.Key};
      }))
    );
    // return this.http.get(`${this.baseUrl}${this.autoComplete}`, {
    //   params: {
    //     apikey: this.apiKey,
    //     q: query
    //   }
    // });
  }

  getForecastByLocationKey(key: string): Observable<ForecastModel[]> {
    return of(this.telAviv5Days).pipe(
      pluck('DailyForecasts'),
      map((res: DailyForecast[]) => {
        return res.map(forecast => {
          return this.createForecastModel(forecast);
        });
      }),
    );
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
}
