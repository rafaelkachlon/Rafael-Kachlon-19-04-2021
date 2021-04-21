import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UnitType} from '../models/unit-type.enum';

@Injectable({
  providedIn: 'root'
})
export class UnitTypeService {

  private unitType$ = new BehaviorSubject<string>(UnitType.Celsius);

  constructor() {
  }

  updateUnitType(unit: UnitType): void {
    this.unitType$.next(unit);
  }

  getUnitType$(): Observable<string> {
    return this.unitType$.asObservable();
  }

  get unitType(): string {
    return this.unitType$.getValue();
  }
}
