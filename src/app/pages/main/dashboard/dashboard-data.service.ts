import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { BaseResponse } from 'src/app/interfaces/comon/base-response';
import { DasboardData } from 'src/app/interfaces/dashboard/dashboard-data';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
  private dashboadData: DasboardData = { Labels: [], MontoDol: [], MontoSol: [] };
  private _dasboadData: BehaviorSubject<DasboardData>;

  constructor(private http: HttpClient) {
    this._dasboadData = new BehaviorSubject<DasboardData>(this.dashboadData)
  }

  setData(data: DasboardData) {
    this._dasboadData.next(data);
  }


  get Data() {
    return this._dasboadData.asObservable();
  }
}
