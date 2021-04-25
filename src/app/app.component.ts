import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UnitTypeService} from './weather/services/unit-type.service';
import {UnitType} from './weather/models/unit-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  unitTypes: any[];
  currentUnitType: string;

  constructor(private unitTypeService: UnitTypeService) {
    this.unitTypes = [{label: '°C', value: UnitType.Celsius}, {label: '°F', value: UnitType.Fahrenheit}];
  }

  ngOnInit(): void {
    this.currentUnitType = this.unitTypes[0].value;
  }

  valueChanged(event: any): void {
    this.unitTypeService.updateUnitType(event.value);
  }
}
