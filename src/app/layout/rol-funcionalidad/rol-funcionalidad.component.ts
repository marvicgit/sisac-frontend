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

import { RolMenuFuncDTO } from '../../models/rolMenuFuncDTO';
import { RolMenuFun } from '../../models/rolmenfun';
import { RolMenu } from '../../models/rolMenu';
import Swal from 'sweetalert2'
import { RolFuncionalidadService } from './rol-funcionalidad.service';
import { RolFuncionalidad } from '../../models/rolFuncionalidad';

@Component({
  selector: 'app-rol-funcionalidad',
  templateUrl: './rol-funcionalidad.component.html',
  styleUrls: ['./rol-funcionalidad.component.scss']
})
export class RolFuncionalidadComponent implements OnInit {

  form: FormGroup;
  page: number = 0;
  rolFuncionalidadades: RolFuncionalidad[] = [];
  total: number = 0;
  roles: Rol[];
  sistemas: Sistema[];
  menus: Menu[];
  filtroMenus: Menu[];
  funcionalidades: Funcionalidad[];
  closeResult: string;
  constructor(private formBuilder: FormBuilder, 
              private modalService: NgbModal,
              private service: RolFuncionalidadService,
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
    this.llenarGrid();
    // this.listarRol();
    // this.listarSistema();
    // this.listarMenu();
    // this.listarFuncionalidades();
  }

  llenarGrid() {
    this.service.listar().subscribe( data => {   
      console.log(data); 
      this.rolFuncionalidadades = data;
      this.total = data.length;
    })
  }

  listarRol() {
    this.serviceRol.listar().subscribe( data => {    
      this.roles = data;
    })
  }

  listarSistema() {
    this.serviceSistema.listar().subscribe( data => {    
      this.sistemas = data;
    })
  }

  listarMenu() {
    this.serviceMenu.listar().subscribe( data => {    
      this.menus = data;
    })
  }

  listarFuncionalidades() {
    this.serviceFunc.listar().subscribe( data => {    
      this.funcionalidades = data;
    })
  }

  iniciarForm() {
    this.form = this.formBuilder.group({
      siscod: new FormControl('', Validators.required),
      mencod: new FormControl('', Validators.required),
      rolcod: new FormControl('', Validators.required),
      funcod: new FormControl(''),
      estreg: new FormControl('1'),
      usureg: null,
      usumod: null,
    });
  }

  registrar() {
    
    let lstMenu: Menu[] = [];
    let lstFuncionalidad: Funcionalidad[] = [];

    this.form.get('mencod').value.forEach(function(l) {
       let menu: Menu = new Menu();
       menu.mencod = l;
      lstMenu.push(menu);
    });


    this.form.get('funcod').value.forEach(function(l) {
      let fun: Funcionalidad = new Funcionalidad();
      fun.funcod = l;
      lstFuncionalidad.push(fun);
   });

    if(this.form.valid) {
      let datos: RolMenuFuncDTO = new RolMenuFuncDTO();
      datos.rol = new Rol();
      datos.rol.rolcod = this.form.get('rolcod').value;
      datos.lstMenus = lstMenu;
      datos.lstFuncionalidad = lstFuncionalidad;
    
      
      this.service.registrar(datos).subscribe(data =>{
        console.log(data);
         
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
    let id: number = this.form.get('siscod').value
    this.filtroMenus = this.menus.filter(x => x.sistema.siscod === id);
  }

  open(content, data?: RolMenu) {
    if(data != null) {
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

  elimnar(data: RolMenuFun){
    Swal.fire({
      title: '¿Estas seguro de eliminar?',
      text: "No podras revertirlo!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.service.eliminar(data.rolmenfuncod).subscribe( data => {
          Swal.fire(
            'Eliminado!',
            'El registro fue eliminado correctamente.',
            'success'
          );
          this.llenarGrid();
        });
      }
    })
  } 
}
