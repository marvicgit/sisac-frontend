import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RolFuncionalidadDTO } from '../../models/rolFuncionalidadDTO';
import { SisRolFuncionalidadDTO } from 'src/app/models/sisRolFuncionalidadDTO';

@Injectable({
  providedIn: 'root'
})
export class RolFuncionalidadService {
  url: string = `${environment.HOST_URL}/sistemaRolesFunc`;  
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<SisRolFuncionalidadDTO[]>(this.url);
  }

  registrar(data: RolFuncionalidadDTO) {
    console.log(data);
    
    return this.http.post(this.url, data);
  }
  
  eliminar(id: number) {    
    return this.http.delete(`${this.url}/${id}`);
  }
}
