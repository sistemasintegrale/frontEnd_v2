import { PaginationResponse } from 'src/app/interfaces/comon/pagination-response';
import { map, pipe, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ReporteHistorialFilters } from 'src/app/interfaces/reporte-historial/reporte-historial-filters';
import { OrdenReparacionList } from 'src/app/interfaces/orden-reparacion/orden-reparacion';
import { BaseResponse } from 'src/app/interfaces/comon/base-response';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class OrdenReparacionService {

  constructor(private http : HttpClient) { }

  getOrdenReparacion(filter : ReporteHistorialFilters, service : number) : Observable<PaginationResponse<BaseResponse<OrdenReparacionList[]>>>{
    return this.http.post<PaginationResponse<BaseResponse<OrdenReparacionList[]>>>(`${base_url}/OrdenReparacion/${service}`,filter);
  }
}
