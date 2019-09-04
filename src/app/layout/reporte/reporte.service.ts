import { Injectable } from '@angular/core';
import { Reporte } from '../../models/reporte';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor() { }

  getObtenerReporte(term: string = null): Observable<Reporte[]> {
    let items = getReporte();
    if (term) {
        items = items.filter(x => (x.usuario.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1));
    }
    return of(items).pipe(delay(500));
  }
}

function getReporte() {
  return [
        {
            "usuario": "MARTIN CARRILLO DURAND",
            "sistema": "SISTEMA DE TRANSPORTE URBANO",
            "rol": "ADMINISTRADOR",
            "funcionalidad": "CREAR, ACTUALIZAR, ELIMINAR",
        },
        {
          "usuario": "MARTIN CARRILLO DURAND",
          "sistema": "SISTEMA DE TRANSPORTE URBANO",
          "rol": "ADMINISTRADOR",
          "funcionalidad": "CREAR, ACTUALIZAR, ELIMINAR",
      },
      {
        "usuario": "MARTIN CARRILLO DURAND",
        "sistema": "SISTEMA DE TRANSPORTE URBANO",
        "rol": "ADMINISTRADOR",
        "funcionalidad": "CREAR, ACTUALIZAR, ELIMINAR",
    },
    {
      "usuario": "MARTIN CARRILLO DURAND",
      "sistema": "SISTEMA DE TRANSPORTE URBANO",
      "rol": "ADMINISTRADOR",
      "funcionalidad": "CREAR, ACTUALIZAR, ELIMINAR",
  },
  {
    "usuario": "MARTIN CARRILLO DURAND",
    "sistema": "SISTEMA DE TRANSPORTE URBANO",
    "rol": "ADMINISTRADOR",
    "funcionalidad": "CREAR, ACTUALIZAR, ELIMINAR",
},
{
  "usuario": "MARTIN CARRILLO DURAND",
  "sistema": "SISTEMA DE TRANSPORTE URBANO",
  "rol": "ADMINISTRADOR",
  "funcionalidad": "CREAR, ACTUALIZAR, ELIMINAR",
},
{
  "usuario": "MARTIN CARRILLO DURAND",
  "sistema": "SISTEMA DE TRANSPORTE URBANO",
  "rol": "ADMINISTRADOR",
  "funcionalidad": "CREAR, ACTUALIZAR, ELIMINAR",
},
{
  "usuario": "MARTIN CARRILLO DURAND",
  "sistema": "SISTEMA DE TRANSPORTE URBANO",
  "rol": "ADMINISTRADOR",
  "funcionalidad": "CREAR, ACTUALIZAR, ELIMINAR",
},
{
  "usuario": "MARTIN CARRILLO DURAND",
  "sistema": "SISTEMA DE TRANSPORTE URBANO",
  "rol": "ADMINISTRADOR",
  "funcionalidad": "CREAR, ACTUALIZAR, ELIMINAR",
},
{
  "usuario": "MARTIN CARRILLO DURAND",
  "sistema": "SISTEMA DE TRANSPORTE URBANO",
  "rol": "ADMINISTRADOR",
  "funcionalidad": "CREAR, ACTUALIZAR, ELIMINAR",
}];
      }
