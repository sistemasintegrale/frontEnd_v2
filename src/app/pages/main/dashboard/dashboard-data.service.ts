import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { BaseResponse } from 'src/app/interfaces/comon/base-response';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
  public leabels : string[] =[];
  public montoSol : number[] =[];
  public MontoDol : number[] =[];
  
}
