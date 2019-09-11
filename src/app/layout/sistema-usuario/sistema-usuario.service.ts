import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioSistemaRolDTO } from 'src/app/models/usuarioSistemaRolDTO';
import { UsuarioSisRolDTO } from 'src/app/models/usuarioSisRolDTO';

@Injectable({
  providedIn: 'root'
})
export class SistemaUsuarioService {

  url: string = `${environment.HOST_URL}/userSistemaRoles`;  
  constructor(private http: HttpClient) { }
  
  listarUsuarioSistemaRol() {
    return this.http.get<UsuarioSistemaRolDTO[]>(`${this.url}/listarUsuarioSistemaRol`);
  }

  registrar(data: UsuarioSisRolDTO) {
    return this.http.post(this.url, data);
  }
}
