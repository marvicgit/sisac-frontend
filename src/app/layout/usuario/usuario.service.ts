import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReporteDTO } from '../../models/reporteDTO';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = `${environment.HOST_URL}/usuarios`;
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Usuario[]>(this.url);
  }

  ObtenerUsuarioDetalle() {
    return this.http.get<ReporteDTO[]>(`${this.url}/ObtenerUsuarioDetalle`);
  }

  buscarUsuarioLdap(usulog: string){
    return this.http.get<Usuario>(`${this.url}/BuscarUsuarioLdap/${usulog}`);
  }

  registrar(data: Usuario) {
    return this.http.post(this.url, data);
  }

  modificar(data: Usuario) {
    return this.http.put(this.url, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
