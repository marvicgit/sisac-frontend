import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioPermisos } from '../models/usuarioPermiso';
import { Permiso } from '../models/permiso';
import { SistemaUsuario } from '../models/sistemaUsuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  permisosCambio = new Subject<Permiso>();
  url = `${environment.HOST_URL}/oauth/token`;
  token: string;
  constructor(private http: HttpClient, private router: Router) { }
  login(usuario: Usuario) {
    const body = `grant_type=password&username=${encodeURIComponent(usuario.usulog)}&password=${encodeURIComponent(usuario.usupas)}`;
    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });
  }

  estaLogeado() {
    const token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }

  enviarCorreo(correo: string) {
    return this.http.post<number>(`${environment.HOST_URL}/login/enviarCorreo`, correo, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }

  verificarTokenReset(token: string) {
    return this.http.get<number>(`${environment.HOST_URL}/login/restablecer/verificar/${token}`);
  }

  cambiarContraseña(data: Usuario) {
    return this.http.post<number>(`${environment.HOST_URL}/login/cambiarClave`, data);
  }

  restablecer(token: string, clave: string) {
    return this.http.post<number>(`${environment.HOST_URL}/login/restablecer/${token}`, clave, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }

  listarPermisos(data: SistemaUsuario) {
    return this.http.post<Permiso>(`${environment.HOST_URL}/login/permisos`, data);
  }

  cerrarSesion() {
    const access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    this.http.get(`${environment.HOST_URL}/token/anular/${access_token}`).subscribe(() => {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}
