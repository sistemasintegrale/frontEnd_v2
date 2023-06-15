import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/comon/base-response';
import { PaginationResponse } from 'src/app/interfaces/comon/pagination-response';
import { ReporteHistorialFilters } from 'src/app/interfaces/reporte-historial/reporte-historial-filters';
import { ReporteHistorialResponse } from 'src/app/models/reporte-historial/reporte-historial-response';
import { environment } from 'src/environments/environments';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(private http: HttpClient) { }

  cargarReporteHistorial(filters: ReporteHistorialFilters, service: number): Observable<PaginationResponse<BaseResponse<ReporteHistorialResponse[]>>> {
    return this.http.post<PaginationResponse<BaseResponse<ReporteHistorialResponse[]>>>(`${base_url}/Reporte/${service}`, filters);
  }
  cargarReporteHistorialExcel(filters: ReporteHistorialFilters, service: number): Observable<PaginationResponse<BaseResponse<ReporteHistorialResponse[]>>> {
    return this.http.post<PaginationResponse<BaseResponse<ReporteHistorialResponse[]>>>(`${base_url}/Reporte/excel/${service}`, filters);
  }
}
