import { Component, OnInit } from '@angular/core';
import { Sistema } from 'src/app/models/sistema';
import { SistemaService } from '../sistema/sistema.service';
import { RolService } from '../rol/rol.service';
import { Rol } from '../../models/rol';
import { Funcionalidad } from 'src/app/models/funcionalidad';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../../models/usuario';
import { ReporteDTO } from '../../models/reporteDTO';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  form: FormGroup;
  reporte: ReporteDTO[] = [];
  sistemas: Sistema[] = [];
  roles: Rol[] = [];
  funcionalidades: Funcionalidad[] = [];
  usuarios: Usuario[] = [];
  page = 0;
  total = 0;
  closeResult: string;
  seconds = true;
  activoInactivo: string[] = [ '1', '0' ];
  constructor(private formBuilder: FormBuilder,
              private serviceSistema: SistemaService,
              private serviceRol: RolService,
              private serviceUsuario: UsuarioService) { }

  ngOnInit() {
    this.iniciarForm();
    this.listar();
    this.listarSistemas();
    this.listarRoles();
    this.listarUsuarios();
  }

  listar() {
    this.serviceUsuario.ObtenerUsuarioDetalle().subscribe((data: ReporteDTO[]) => {
      this.reporte = data;
      this.total = data.length;
    });
  }

  listarSistemas() {
    this.serviceSistema.listar().subscribe((data: Sistema[]) => {
      this.sistemas = data;
    });
  }

  listarRoles() {
    this.serviceRol.listar().subscribe((data: Rol[]) => {
      this.roles = data;
    });
  }

  listarUsuarios() {
    this.serviceUsuario.listar().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
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
