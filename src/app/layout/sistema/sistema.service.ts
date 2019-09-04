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
  url: string = `${environment.HOST_URL}/sistemas`;  
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


  getSistemas(term: string = null): Observable<Sistema[]> {
    let items = getlistaSistema();
    if (term) {
        items = items.filter(x => (x.sisnom.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1) || 
                                   x.sissig.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
    }
    return of(items).pipe(delay(500));
  }
}

function getlistaSistema() {
  return [
    {
        "sisnom": "SISTEMA INTEGRAL DE DESARROLLO URBANO",
        "sissig": "SIDU      ",
        "sisest": "1",
        "estreg": "0",
        "siscod": 26,
        "sisdes": "SISTEMA INTEGRADO DE LA GERENCIA DE DESARROLLO URBANO",
        "usureg": null,
        "fecreg": "2016-03-17",
        "fecmod": "2016-03-17",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA INTEGRAL DE DESARROLLO URBANO",
        "sissig": "SIDU      ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 27,
        "sisdes": "SISTEMA INTEGRADO DE LA GERENCIA DE DESARROLLO URBANO",
        "usureg": null,
        "fecreg": "2016-03-17",
        "fecmod": "2016-03-17",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE INFORMACION TERRITORIAL",
        "sissig": "SIT       ",
        "sisest": "1",
        "estreg": "0",
        "siscod": 28,
        "sisdes": null,
        "usureg": null,
        "fecreg": "2016-04-12",
        "fecmod": "2016-04-13",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE DESARROLLO URBANO",
        "sissig": "SISGDU    ",
        "sisest": "1",
        "estreg": "0",
        "siscod": 29,
        "sisdes": null,
        "usureg": null,
        "fecreg": "2016-04-13",
        "fecmod": "2016-04-13",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE DESARROLLO URBANO",
        "sissig": "SISGDU    ",
        "sisest": "1",
        "estreg": "0",
        "siscod": 30,
        "sisdes": null,
        "usureg": null,
        "fecreg": "2016-04-13",
        "fecmod": "2016-04-13",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE MASCOTAS",
        "sissig": "SISMAS    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 32,
        "sisdes": "SISTEMA MUNICIPAL DE ANIMALES DOMESTICOS",
        "usureg": null,
        "fecreg": "2016-05-04",
        "fecmod": "2016-05-04",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE EDUCACIÓN VIAL",
        "sissig": "SISEDVIAL ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 33,
        "sisdes": null,
        "usureg": null,
        "fecreg": "2016-06-06",
        "fecmod": "2016-06-06",
        "usumod": null
    },
    {
        "sisnom": "Programa de defensa municipal",
        "sissig": "PDMVAT    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 42,
        "sisdes": "Programa de defensa municipal de victimas de accidentes de transito",
        "usureg": null,
        "fecreg": "2018-03-21",
        "fecmod": "2018-03-21",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA JUDICIAL",
        "sissig": "JUDIC     ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 5,
        "sisdes": "SISTEMA PARA CASOS LEGALES",
        "usureg": null,
        "fecreg": "2013-02-07",
        "fecmod": null,
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE GESTION DE RESIDUOS SOLIDOS",
        "sissig": "SGRS      ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 6,
        "sisdes": "TRAMITE DE AUTORIZACION DE TRANSPORTE DE RESIDUOS SOLIDOS",
        "usureg": null,
        "fecreg": "2013-02-19",
        "fecmod": null,
        "usumod": null
    },
    {
        "sisnom": "SISTEMA INTEGRAL DE TRANSPORTE URBANO",
        "sissig": "SITU      ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 9,
        "sisdes": "SISTEMA INTEGRAL DE TRANSPORTE URBANO",
        "usureg": "1",
        "fecreg": "2013-04-09",
        "fecmod": "2016-04-13",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE ADMINISTRACION FINANCIERO MUNICIPAL",
        "sissig": "SAFIM     ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 11,
        "sisdes": "SAFIM",
        "usureg": null,
        "fecreg": "2013-04-17",
        "fecmod": "2013-04-17",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE PLANEAMIENTO Y MONITOREO",
        "sissig": "SISPA     ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 3,
        "sisdes": "SE REALIZA EL CONTROL DE PLANEAMIENTO DE LA MML",
        "usureg": null,
        "fecreg": "2013-01-28",
        "fecmod": "2013-02-05",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE TRAMITE DOCUMENTARIO",
        "sissig": "GESDOC    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 10,
        "sisdes": "GESDOC",
        "usureg": null,
        "fecreg": "2013-04-10",
        "fecmod": "2013-04-10",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE LICENCIAS",
        "sissig": "SISLIC    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 2,
        "sisdes": "REGISTRO DE LICENCIAS ON-LINE",
        "usureg": null,
        "fecreg": "2012-12-28",
        "fecmod": "2013-02-05",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE GESTION DE RESOLUCIONES",
        "sissig": "SIGERE    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 4,
        "sisdes": "CONTROL DE DOCUMENTOS DE RESOLUCION DE LA MML",
        "usureg": "1",
        "fecreg": "2013-01-31",
        "fecmod": "2013-05-03",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA GENERAL",
        "sissig": "SISGEN    ",
        "sisest": "1",
        "estreg": "0",
        "siscod": 8,
        "sisdes": "INTEGRA LOS SISTEMAS",
        "usureg": null,
        "fecreg": "2013-03-01",
        "fecmod": "2013-03-04",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA ADMINISTRACION MOVILES",
        "sissig": "SIAM      ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 1,
        "sisdes": "CONTROLA LA ADMINISTRACION DE LOS MOVILES EN LA MML",
        "usureg": null,
        "fecreg": "2012-12-27",
        "fecmod": "2013-02-05",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA ADJUDICACION DE CORREDORES DE INTEGRACION",
        "sissig": "SISACI    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 7,
        "sisdes": "SISTEMA DE ADJUDICACION DE CORREDORES DE INTEGRACION",
        "usureg": "1",
        "fecreg": "2013-02-20",
        "fecmod": null,
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE SEGURIDAD",
        "sissig": "SISACSE   ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 12,
        "sisdes": "ADMINISTRA LA SEGURIDAD DE LOS SISTEMAS",
        "usureg": null,
        "fecreg": "2013-07-01",
        "fecmod": "2013-07-01",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE FISCALIZACION Y CONTROL",
        "sissig": "SIFICO    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 14,
        "sisdes": "SIFICO",
        "usureg": null,
        "fecreg": "2013-07-31",
        "fecmod": null,
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE CONSTANCIAS WEB-GTU",
        "sissig": "SISCONWEB ",
        "sisest": "1",
        "estreg": "0",
        "siscod": 22,
        "sisdes": "APLICATIVO DE GENERACION DE CONSTANCIAS WEB-GTU",
        "usureg": null,
        "fecreg": "2016-03-07",
        "fecmod": "2016-03-07",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE LA SUBGERENCIA DE RENOVACIÓN URBANA",
        "sissig": "SISSRU    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 31,
        "sisdes": "SISTEMA DE LA SUBGERENCIA DE RENOVACIÓN URBANA",
        "usureg": null,
        "fecreg": "2016-04-19",
        "fecmod": "2016-07-20",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA INTEGRADO DE GESTIÓN URBANA",
        "sissig": "SIGU      ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 39,
        "sisdes": "SISTEMA INTEGRADO DE GESTIÓN URBANA",
        "usureg": null,
        "fecreg": "2017-11-07",
        "fecmod": "2017-11-07",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE ASOCIACIONES COMERCIALES",
        "sissig": "ASOCOM    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 41,
        "sisdes": "SISTEMA DE ASOCIACIONES COMERCIALES",
        "usureg": null,
        "fecreg": "2018-03-12",
        "fecmod": "2018-03-12",
        "usumod": null
    },
    {
        "sisnom": "SICASA WEB",
        "sissig": "SICASA    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 13,
        "sisdes": "SICASA WEB",
        "usureg": null,
        "fecreg": "2013-06-24",
        "fecmod": "2013-06-24",
        "usumod": null
    },
    {
        "sisnom": "APLICATIVO LICENCIA DE VEHÍCULOS MENORES",
        "sissig": "LCVM      ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 18,
        "sisdes": "APLICATIVO LICENCIA DE VEHÍCULOS MENORES",
        "usureg": null,
        "fecreg": "2015-09-02",
        "fecmod": "2015-09-02",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE PANELES PUBLICITARIOS",
        "sissig": "SISPAN    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 16,
        "sisdes": "SISTEMA DE PANELES PUBLICITARIOS",
        "usureg": null,
        "fecreg": "2015-04-15",
        "fecmod": "2015-04-15",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA ACTAS DE CONTROL DE SANCION",
        "sissig": "DCE       ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 19,
        "sisdes": null,
        "usureg": null,
        "fecreg": "2015-11-24",
        "fecmod": "2015-11-24",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE CONSTANCIAS WEB-GTU",
        "sissig": "CONSWEB   ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 25,
        "sisdes": "APLICATIVO DE GENERACION DE CONSTANCIAS WEB-GTU",
        "usureg": null,
        "fecreg": "2016-03-07",
        "fecmod": "2016-03-07",
        "usumod": null
    },
    {
        "sisnom": "REGISTRO DE INCIDENCIAS",
        "sissig": "SISREQ    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 38,
        "sisdes": null,
        "usureg": null,
        "fecreg": "2017-05-03",
        "fecmod": "2017-05-03",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE INTEROPERABILIDAD DE SERVICIOS",
        "sissig": "SINSE     ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 40,
        "sisdes": null,
        "usureg": null,
        "fecreg": "2017-11-23",
        "fecmod": "2017-11-23",
        "usumod": null
    },
    {
        "sisnom": "INTRANET WEB",
        "sissig": "INTRANETW ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 44,
        "sisdes": null,
        "usureg": null,
        "fecreg": "2018-07-11",
        "fecmod": "2018-07-11",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE DONACIONES",
        "sissig": "SISCOTI   ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 15,
        "sisdes": "DONACIONES",
        "usureg": null,
        "fecreg": "2014-09-02",
        "fecmod": "2014-09-02",
        "usumod": null
    },
    {
        "sisnom": "ALOGTU",
        "sissig": "SISREG    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 17,
        "sisdes": "APLICATIVO DE INCIDENCIA DE LLAMADAS",
        "usureg": null,
        "fecreg": "2015-09-01",
        "fecmod": "2019-05-02",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE CONTROL PATRIMONIAL",
        "sissig": "SISCONPA  ",
        "sisest": "1",
        "estreg": "0",
        "siscod": 20,
        "sisdes": null,
        "usureg": null,
        "fecreg": "2016-01-26",
        "fecmod": "2016-06-07",
        "usumod": null
    },
    {
        "sisnom": "CONSWEB",
        "sissig": "SISCONWEB ",
        "sisest": "1",
        "estreg": "0",
        "siscod": 23,
        "sisdes": "APLICATIVO DE GENERACION DE CONSTANCIAS WEB-GTU",
        "usureg": null,
        "fecreg": "2016-03-07",
        "fecmod": "2016-03-07",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE CONTROL PATRIMONIAL Y ALMACENES",
        "sissig": "SISCPA    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 34,
        "sisdes": "SISTEMA PARA EL ÁREA DE BIENES MUEBLES E INVENTARIO",
        "usureg": null,
        "fecreg": "2016-06-07",
        "fecmod": "2016-06-07",
        "usumod": null
    },
    {
        "sisnom": "AFPNET",
        "sissig": "AFPNET    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 36,
        "sisdes": "MODULO PARA ENVIO DE DATOS PARA EL AFPNET",
        "usureg": null,
        "fecreg": "2016-11-22",
        "fecmod": "2016-11-22",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE CREDENCIALES",
        "sissig": "SISCRE    ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 37,
        "sisdes": "SISTEMA DE CREDENCIALES A OPERADORES DE TRANSPORTE",
        "usureg": null,
        "fecreg": "2017-04-10",
        "fecmod": "2017-04-10",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE CONSULTORIO MEDICO",
        "sissig": "SISCONMED ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 43,
        "sisdes": null,
        "usureg": null,
        "fecreg": "2018-04-06",
        "fecmod": "2018-04-06",
        "usumod": null
    },
    {
        "sisnom": "CONSWEB",
        "sissig": "SISCONWEB ",
        "sisest": "1",
        "estreg": "0",
        "siscod": 21,
        "sisdes": "APLICATIVO DE GENERACION DE CONSTANCIAS WEB-GTU",
        "usureg": null,
        "fecreg": "2016-03-07",
        "fecmod": "2016-03-07",
        "usumod": null
    },
    {
        "sisnom": "CONSWEB",
        "sissig": "SISCONWEB ",
        "sisest": "1",
        "estreg": "0",
        "siscod": 24,
        "sisdes": "APLICATIVO DE GENERACION DE CONSTANCIAS WEB-GTU",
        "usureg": null,
        "fecreg": "2016-03-07",
        "fecmod": "2016-03-07",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA SEGUIMIENTO DE RECOMENDACIONES DE AUDITORI",
        "sissig": "SIRA      ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 35,
        "sisdes": "SISTEMA DE SEGUIMIENTO DE IMPLEMENTACION DE RECOMENDACIONES DE AUDITORIA",
        "usureg": null,
        "fecreg": "2016-09-02",
        "fecmod": "2016-09-02",
        "usumod": null
    },
    {
        "sisnom": "APLICATIVO REPORTES GERENCIA PLANIFICACION",
        "sissig": "SISREPGP  ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 45,
        "sisdes": "APLICATIVO DE REPORTES GERENCIAL",
        "usureg": null,
        "fecreg": "2018-07-31",
        "fecmod": "2018-07-31",
        "usumod": null
    },
    {
        "sisnom": "SISTEMA DE INGRESOS Y SALIDAS DE ALMACEN",
        "sissig": "SISAL     ",
        "sisest": "1",
        "estreg": "1",
        "siscod": 46,
        "sisdes": "SISTEMA DE INGRESOS Y SALIDAS DE ALMACEN",
        "usureg": null,
        "fecreg": "2018-08-01",
        "fecmod": "2018-08-01",
        "usumod": null
    },
    {
        "sisnom": "SISAATE",
        "sissig": "SISPRE",
        "sisest": "1",
        "estreg": "0",
        "siscod": 48,
        "sisdes": "SISTEMA DE PRUEBA",
        "usureg": "152",
        "fecreg": null,
        "fecmod": null,
        "usumod": null
    },
    {
        "sisnom": "SISAATE2",
        "sissig": "SISPRE",
        "sisest": "1",
        "estreg": "0",
        "siscod": 49,
        "sisdes": "SISTEMA DE PRUEB2",
        "usureg": "152",
        "fecreg": "2019-08-12",
        "fecmod": null,
        "usumod": null
    }];
}
