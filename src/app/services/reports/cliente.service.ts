import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/comon/base-response';
import { Cliente } from 'src/app/interfaces/reporte-historial/cliente';
import { environment } from 'src/environments/environments';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  ClientesNovaGlass(): Observable<BaseResponse<Cliente[]>> {
    return this.http.get<BaseResponse<Cliente[]>>(`${base_url}/Reporte/cliente/${1}`);
  }

  ClientesNovaMotos(): Observable<BaseResponse<Cliente[]>> {
    return this.http.get<BaseResponse<Cliente[]>>(`${base_url}/Reporte/cliente/${2}`);
  }

} 
