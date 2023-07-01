import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/interfaces/comon/base-response';
import { environment } from 'src/environments/environments';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  get(service : number): Observable<string> {
    return this.http.get<BaseResponse<string>>(`${base_url}/dashboard/${service}`).pipe(map(res=>res.data))      
  }
}
