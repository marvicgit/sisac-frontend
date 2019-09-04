import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sistema } from 'src/app/models/sistema';
import { Reporte } from '../../models/reporte';
import { ReporteService } from './reporte.service';
import { SistemaService } from '../sistema/sistema.service';
import { RolService } from '../rol/rol.service';
import { Rol } from '../../models/rol';
import { Funcionalidad } from 'src/app/models/funcionalidad';
import { FuncionalidadService } from '../funcionalidad/funcionalidad.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  form: FormGroup;
  reporte: Observable<Reporte[]>;
  sistemas: Observable<Sistema[]>;
  roles: Observable<Rol[]>;
  funcionalidades: Observable<Funcionalidad[]>;
  page: number = 0;
  closeResult: string;
  seconds = true;
  activoInactivo: string[] = [ '1','0' ];
  constructor(private formBuilder: FormBuilder, 
              private service: ReporteService,
              private serviceSistema: SistemaService,
              private serviceRol: RolService,
              private serviceFunc: FuncionalidadService,) { }

  ngOnInit() {
    this.iniciarForm();
    this.reporte = this.service.getObtenerReporte();
    this.sistemas = this.serviceSistema.getSistemas();
    this.roles = this.serviceRol.getRoles();
    this.funcionalidades = this.serviceFunc.getFuncionalidades();
  }

  iniciarForm() {
    this.form = this.formBuilder.group({
      usuario: new FormControl(''),
      siscod: new FormControl(''),
      rolcod: new FormControl(''),
      funcod: new FormControl(''),
      estreg: new FormControl('')
    });
  }

}
