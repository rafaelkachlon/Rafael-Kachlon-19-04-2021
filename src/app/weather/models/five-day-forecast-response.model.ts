export interface FiveDayForecastResponse {
  Headline: Headline;
  DailyForecasts: DailyForecast[];
}

export interface Headline {
  EffectiveDate: Date | string;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
  Category: string;
  EndDate: Date | string;
  EndEpochDate: number;
  MobileLink: string;
  Link: string;
}

export interface Minimum {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface Maximum {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface Temperature {
  Minimum: Minimum;
  Maximum: Maximum;
}

export interface Day {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
}

export interface Night {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
}

export interface DailyForecast {
  Date: Date | string;
  EpochDate: number;
  Temperature: Temperature;
  Day: Day;
  Night: Night;
  Sources: string[];
  MobileLink: string;
  Link: string;
}


export interface ForecastModel {
  iconUrl: string;
  iconText: string;
  miniTemperatureF: number;
  maxTemperatureF: number;
  minTemperatureC: number;
  maxTemperatureC: number;
  date: Date | string;
}
