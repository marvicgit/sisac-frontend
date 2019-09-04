import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RolFuncionalidad } from '../../models/rolFuncionalidad';

@Injectable({
  providedIn: 'root'
})
export class RolFuncionalidadService {
  url: string = `${environment.HOST_URL}/rolesFuncionalidad`;  
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<RolFuncionalidad[]>(this.url);
  }

  registrar(data: any) {
    return this.http.post(this.url, data);
  }
  
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
