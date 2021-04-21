import {Component, Input, OnInit} from '@angular/core';
import {ForecastModel} from '../../models/five-day-forecast-response.model';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.scss']
})
export class ForecastCardComponent implements OnInit {

  @Input() forecast: ForecastModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
