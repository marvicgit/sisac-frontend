import { Injectable } from '@angular/core';
import { Sistema } from '../../models/sistema';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SistemaService {
  url = `${environment.HOST_URL}/sistemas`;
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Sistema[]>(this.url);
  }

  registrar(data: Sistema) {
    return this.http.post(this.url, data);
  }

  modificar(data: Sistema) {
    return this.http.put(this.url, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}