import {Component, Input, OnInit} from '@angular/core';
import {ForecastModel} from '../../models/five-day-forecast-response.model';
import {Observable} from 'rxjs';
import {UnitTypeService} from '../../services/unit-type.service';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.scss']
})
export class ForecastCardComponent implements OnInit {

  @Input() forecast: ForecastModel;
  unitType$: Observable<string>;

  constructor(private unitTypeService: UnitTypeService) {
  }

  ngOnInit(): void {
    this.unitType$ = this.unitTypeService.getUnitType$();
  }

}
