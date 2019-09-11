import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioSisRolDTO } from '../../models/usuarioSisRolDTO';
import { UsuarioSistemaDTO } from 'src/app/models/usuarioSistemaDTO';
import { UsuarioSistemaRolDTO } from 'src/app/models/usuarioSistemaRolDTO';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRolFunService {
  url: string = `${environment.HOST_URL}/userRolesMenusFunc`;  
  constructor(private http: HttpClient) { }

  listarSistemasAptos() {
    return this.http.get<UsuarioSistemaDTO[]>(`${this.url}/listarSistemasAptos`);
  }

  listarSistemasUsuarios() {
    return this.http.get<UsuarioSistemaDTO[]>(`${this.url}/listarUsuarioSistema`);
  }

  listarSistemaRolAptos() {
    return this.http.get<UsuarioSistemaRolDTO[]>(`${this.url}/listarSistemaRolAptos`);
  }

  listarUsuarioSistemaRol() {
    return this.http.get<UsuarioSistemaRolDTO[]>(`${this.url}/listarUsuarioSistemaRol`);
  }

  

  registrar(data: UsuarioSisRolDTO) {
    console.log(data);
    
    return this.http.post(this.url, data);
  }

}
