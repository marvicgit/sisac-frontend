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
  filtrarReporte: ReporteDTO[] = [];
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
      this.filtrarReporte = data;
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
      usulog: new FormControl(''),
      siscod: new FormControl(''),
      rolcod: new FormControl(''),
      estreg: new FormControl('')
    });
  }

  buscar() {
    this.filtrarReporte = this.reporte;
    const usulog = this.form.get('usulog').value;
    const siscod = this.form.get('siscod').value;
    const rolcod = this.form.get('rolcod').value;
    console.log(usulog);
    console.log(siscod);
    console.log(rolcod);
    if (usulog && siscod && rolcod) {
      this.filtrarReporte = this.filtrarReporte.filter(x => x.usulog == usulog && x.siscod == siscod && x.rolcod === rolcod);
      this.total = this.filtrarReporte.length;
    } else if (usulog && siscod) {
      this.filtrarReporte = this.filtrarReporte.filter(x => x.usulog == usulog && x.siscod == siscod);
      this.total = this.filtrarReporte.length;
    } else if (usulog && rolcod) {
      this.filtrarReporte = this.filtrarReporte.filter(x => x.usulog == usulog && x.rolcod == rolcod);
      this.total = this.filtrarReporte.length;
    } else if (siscod && rolcod) {
      this.filtrarReporte = this.filtrarReporte.filter(x => x.siscod == siscod && x.rolcod == rolcod);
      this.total = this.filtrarReporte.length;
    } else if (usulog) {
      this.filtrarReporte = this.filtrarReporte.filter(x => x.usulog == usulog);
      this.total = this.filtrarReporte.length;
    } else if (siscod) {
      this.filtrarReporte = this.filtrarReporte.filter(x => x.siscod == siscod);
      this.total = this.filtrarReporte.length;
    } else if (rolcod) {
      this.filtrarReporte = this.filtrarReporte.filter(x => x.rolcod == rolcod);
      this.total = this.filtrarReporte.length;
    } else {
      this.filtrarReporte = this.reporte;
      this.total = this.filtrarReporte.length;
    }

  }

}
