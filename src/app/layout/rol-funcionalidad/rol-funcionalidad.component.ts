import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Sistema } from '../../models/sistema';
import { Rol } from '../../models/rol';
import { Menu } from '../../models/menu';
import { SistemaService } from '../sistema/sistema.service';
import { RolService } from '../rol/rol.service';
import { MenuService } from '../menu/menu.service';
import { Funcionalidad } from '../../models/funcionalidad';
import { FuncionalidadService } from '../funcionalidad/funcionalidad.service';

import { RolMenu } from '../../models/rolMenu';
import Swal from 'sweetalert2';
import { RolFuncionalidadService } from './rol-funcionalidad.service';
import { RolFuncionalidadDTO } from '../../models/rolFuncionalidadDTO';
import { RolMenService } from '../rol-men/rol-men.service';
import { SistemaRolDTO } from '../../models/sistemaRolDTO';
import { SisRolFuncionalidadDTO } from 'src/app/models/sisRolFuncionalidadDTO';

@Component({
  selector: 'app-rol-funcionalidad',
  templateUrl: './rol-funcionalidad.component.html',
  styleUrls: ['./rol-funcionalidad.component.scss']
})
export class RolFuncionalidadComponent implements OnInit {

  form: FormGroup;
  page = 0;
  sistemasRoles: SistemaRolDTO[] = [];
  filtroRoles: SistemaRolDTO[] = [];
  total = 0;
  roles: Rol[];
  sistemas: Sistema[];
  menus: Menu[];
  filtroMenus: Menu[];
  funcionalidades: Funcionalidad[];
  sistemaRolFunc: SisRolFuncionalidadDTO[] = [];
  listaSistemaRolFunc: SisRolFuncionalidadDTO[] = [];
  closeResult: string;
  searchValue: string;
  constructor(private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private service: RolFuncionalidadService,
              private serviceRolMenu: RolMenService,
              private config: NgbModalConfig,
              private serviceSistema: SistemaService,
              private serviceMenu: MenuService,
              private serviceFunc: FuncionalidadService,
              private serviceRol: RolService) {
                this.config.backdrop = 'static';
                this.config.keyboard = false;
              }

  ngOnInit() {
    this.iniciarForm();
    this.listaRolMenus();
    this.llenarGrid();
    this.listarSistema();
    this.listarFuncionalidades();
  }

  llenarGrid() {
    this.service.listar().subscribe( data => {
      this.sistemaRolFunc = data;
      this.listaSistemaRolFunc = data;
      this.total = data.length;
    });
  }

  listaRolMenus() {
    this.serviceRolMenu.listarSistemaRol().subscribe(data => {
      this.sistemasRoles = data;
    });
  }

  listarRol() {
    this.serviceRol.listar().subscribe(data => {
      this.roles = data;
    });
  }

  listarSistema() {
    this.serviceSistema.listar().subscribe(data => {
      this.sistemas = data;
    });
  }

  listarMenu() {
    this.serviceMenu.listar().subscribe(data => {
      this.menus = data;
    });
  }

  listarFuncionalidades() {
    this.serviceFunc.listar().subscribe(data => {
      this.funcionalidades = data;
    });
  }

  applyFilter(searchValue: string = null) {
    this.listaSistemaRolFunc = this.sistemaRolFunc;
    if (searchValue) {
      this.listaSistemaRolFunc = this.listaSistemaRolFunc.filter(x => (x.sistema.sisnom.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1) ||
                                               x.rol.rolnom.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1);
      this.total = this.listaSistemaRolFunc.length;
    }
  }

  iniciarForm() {
    this.form = this.formBuilder.group({
      siscod: new FormControl('', Validators.required),
      rolcod: new FormControl('', Validators.required),
      funcod: new FormControl(''),
      estreg: new FormControl('1'),
      usureg: null,
      usumod: null,
    });
  }

  registrar() {
    const lstFuncionalidad: Funcionalidad[] = [];

    this.form.get('funcod').value.forEach(l => {
      const fun: Funcionalidad = new Funcionalidad();
      fun.funcod = l;
      lstFuncionalidad.push(fun);
   });
    console.log(this.form.valid);
    if (this.form.valid) {
      const datos: RolFuncionalidadDTO = new RolFuncionalidadDTO();
      datos.siscod = this.form.get('siscod').value;
      datos.rolcod = this.form.get('rolcod').value;
      datos.lstFuncionalidad = lstFuncionalidad;
      this.service.registrar(datos).subscribe(() => {
            this.modalService.dismissAll();
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Registrado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
            this.llenarGrid();
      });
    }
  }

  changeSistema() {
    const id: number = this.form.get('siscod').value;
    this.filtroRoles = this.sistemasRoles.filter(x => x.siscod === id);
  }

  open(content, data?: RolMenu) {
    if (data != null) {
  } else {
      this.iniciarForm();
  }
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
  }

  elimnar(data: SisRolFuncionalidadDTO) {
    Swal.fire({
      title: '¿Estas seguro de eliminar?',
      text: 'No se podrá acceder a este ítem luego de eliminarlo!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.service.eliminar(data.sisrolfuncod).subscribe(() => {
          Swal.fire(
            'Eliminado!',
            'El registro fue eliminado correctamente.',
            'success'
          );
          this.llenarGrid();
        });
      }
    });
  }
}
