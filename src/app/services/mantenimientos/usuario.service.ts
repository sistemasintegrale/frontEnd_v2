import { Injectable } from '@angular/core';
import { UsuarioData } from '../../models/usuario/usuario-data';
import { HttpClient } from '@angular/common/http';
import { UsuarioFilters } from 'src/app/interfaces/usuario/filters';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/interfaces/comon/pagination-response';
import { BaseResponse } from 'src/app/interfaces/comon/base-response';
import { RegisterForm } from 'src/app/interfaces/usuario/register-form';
import { UsuarioCreate } from 'src/app/models/usuario/usuario.create';
import { environment } from 'src/environments/environments';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  cargarUsuarios(filters: UsuarioFilters): Observable<PaginationResponse<BaseResponse<UsuarioData[]>>> {
    return this.http.post<PaginationResponse<BaseResponse<UsuarioData[]>>>(`${base_url}/usuario/getAll`, filters);
  }

  crearUsuario(formData: RegisterForm): Observable<BaseResponse<UsuarioData>> {

    return this.http.post<BaseResponse<UsuarioData>>(`${base_url}/usuario`, formData);
  }

  getUsuario(id: number): Observable<BaseResponse<UsuarioData>> {
    return this.http.get<BaseResponse<UsuarioData>>(`${base_url}/usuario/${id}`);
  }

  modificarUsuario(formData: RegisterForm, id: number): Observable<BaseResponse<UsuarioData>> {
    debugger
    const { nombre, apellidos, email, password, estado,codigoClienteNG,codigoClienteNM } = formData;
    const valueEstado = String(estado) === 'true' ? 1 : 0;
    const usuarioEdit = new UsuarioCreate(nombre, apellidos, email, password, Boolean(valueEstado),codigoClienteNG,codigoClienteNM);
    return this.http.put<BaseResponse<UsuarioData>>(`${base_url}/usuario/${id}`, usuarioEdit);
  }
  eliminarUsuario(usuario: UsuarioData): Observable<boolean> {
    return this.http.delete<boolean>(`${base_url}/usuario/${usuario.id}`);
  }
}
