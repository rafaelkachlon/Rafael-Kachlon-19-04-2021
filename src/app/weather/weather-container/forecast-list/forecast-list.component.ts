import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ForecastModel} from '../../models/five-day-forecast-response.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class ForecastListComponent implements OnInit {

  @Input() cityName: string;
  @Input() forecast: ForecastModel[];


  constructor(private date: DatePipe) {
  }

  ngOnInit(): void {
  }

  get dateRange(): string {
    const startDate = this.date.transform(this.forecast[0].date, 'MMMM dd');
    const endDate = this.date.transform(this.forecast[this.forecast.length - 1].date, 'MMMM dd');
    return `${startDate} - ${endDate}`;
  }
}
