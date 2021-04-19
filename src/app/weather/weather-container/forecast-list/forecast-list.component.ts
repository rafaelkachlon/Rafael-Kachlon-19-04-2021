import {Component, OnInit, Input} from '@angular/core';
import {FiveDayForecastResponse} from '../../models/five-day-forecast-response.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss'],
  providers: [DatePipe]
})
export class ForecastListComponent implements OnInit {

  @Input() cityName: string;

  @Input() forecast: FiveDayForecastResponse;

  constructor(private date: DatePipe) {
  }

  ngOnInit(): void {
    console.log(this.forecast);
  }

  get dateRange(): string {
    const startDate = this.date.transform(this.forecast.DailyForecasts[0].Date, 'MMMM dd');
    const endDate = this.date.transform(this.forecast.DailyForecasts[this.forecast.DailyForecasts.length - 1].Date, 'MMMM dd');
    return `${startDate} - ${endDate}`;
  }
}
