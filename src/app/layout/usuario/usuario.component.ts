import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';
import { Sistema } from '../../models/sistema';
import { SistemaService } from '../sistema/sistema.service';
import { Rol } from '../../models/rol';
import { RolService } from '../rol/rol.service';
import { Funcionalidad } from '../../models/funcionalidad';
import { FuncionalidadService } from '../funcionalidad/funcionalidad.service';
import Swal from 'sweetalert2';
import { DualListComponent } from 'angular-dual-listbox';
import { RolMenu } from '../../models/rolMenu';
import { RolMenService } from '../rol-men/rol-men.service';
import { SistemaRolDTO } from '../../models/sistemaRolDTO';
import { UsuarioSisRolDTO } from 'src/app/models/usuarioSisRolDTO';
import { UsuarioRolFunService } from '../usuario-rol-fun/usuario-rol-fun.service';
import { UsuarioSistemaDTO } from 'src/app/models/usuarioSistemaDTO';
import { UsuarioSistemaRolDTO } from 'src/app/models/usuarioSistemaRolDTO';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  
  form: FormGroup;
  selectedTabId = 'acceso';
  page: number = 0;
  total: number = 0;
  closeResult: string;
  sistemasAptos: UsuarioSistemaDTO[] = [];
  siscod: string = 'siscod';
  sisnom: any = 'sisnom';
  sistemasSelect: UsuarioSistemaDTO[] = [];
  sistemasUsuarios: UsuarioSistemaDTO[] = [];
  sistemasRolApto: UsuarioSistemaRolDTO[] = [];
  sistemasRolUsuarios : UsuarioSistemaRolDTO[] = [];
  rolesFiltrados: UsuarioSistemaRolDTO[] = [];
  rolesSelect: UsuarioSistemaRolDTO[] = [];
  rolcod: string = 'rolcod';
  rolnom: any = 'rolnom';
  
  sorter = true;
  filter = true;
  roles: Observable<Rol[]>;
  rolesMenus: RolMenu[] = [];
  sistemaRoles: SistemaRolDTO[] = [];
  sistemaRolesFil: SistemaRolDTO[] = [];
  funcionalidades: Observable<Funcionalidad[]>;
  idSistema: number = 0;
  idUsuarioSelect: number =0;
  usuarios: Usuario[];
  format = { add: 'Agregar', remove: 'Elimnar', all: 'Todos', none: 'Ninguno',
        direction: DualListComponent.LTR, draggable: true, locale: 'es' }

  constructor(private formBuilder: FormBuilder,
              private modalService: NgbModal, 
              config: NgbModalConfig,
              private service: UsuarioService, 
              private serviceSistema: SistemaService,
              private serviceRolMenu: RolMenService,
              private serviceRol: RolService,
              private serviceFuncion: FuncionalidadService,
              private serviceUsuRolFun :UsuarioRolFunService,
              private router: Router) { 
                config.backdrop = 'static';
                config.keyboard = false;
              }

  ngOnInit() {
    this.iniciarForm();
    this.listar();
    this.listarSistemasAptos();
    this.listarSistemasUsuarios();
    this.listarSistemaRolAptos();
    this.listarUsuarioSistemaRol();
    //this.listaRolMenus()
    // this.roles = this.serviceRol.getRoles();
    // this.funcionalidades = this.serviceFuncion.getFuncionalidades();
  }

  iniciarForm() {
    this.form = this.formBuilder.group({
      usucod: new FormControl(null),
      usutipdoc: new FormControl('', Validators.required),
      usudni: new FormControl('', Validators.required),
      usunom: new FormControl('', Validators.required),
      usuapepat: new FormControl('', Validators.required),
      usuapemat: new FormControl('', Validators.required),
      ususexo:  new FormControl('1', Validators.required),
      usuarea:  new FormControl(null),
      usucargo:  new FormControl(null),
      usudirec:  new FormControl(null),
      usuface:  new FormControl(null),
      usutwitter:  new FormControl(null),
      usugoogle:  new FormControl(null),
      estreg: new FormControl('1'),
      usulog: new FormControl(null, Validators.required),
      rolcod: new FormControl(null),
      usupas: new FormControl(null, Validators.required),
      usucor: new FormControl(null, [Validators.required, Validators.email]),
      usuanexo: new FormControl(null),
      usureg: '',
      usumod: '',
      siscod: new FormControl(null)
      });
  }

  // unApellido(control: FormControl): {[s:string]: boolean} {
  //   if(control.value && this.form.get('usuapepat').value ){
  //     return {
  //       unApellido: true
  //     }
  //   }
  //   return null;
  // }

  listar() {
    this.service.listar().subscribe((data: Usuario[]) => {     
      this.usuarios = data;
      this.total = data.length;
    });
  }

  listarSistemasAptos() {
    this.serviceUsuRolFun.listarSistemasAptos().subscribe((data: UsuarioSistemaDTO[]) => {     
      this.sistemasAptos = data;     
    });
  }

  listarSistemasUsuarios() {
    this.serviceUsuRolFun.listarSistemasUsuarios().subscribe((data: UsuarioSistemaDTO[]) => {     
      this.sistemasUsuarios = data;
      this.total = data.length;     
    });
  }

  listarSistemaRolAptos() {
    this.serviceUsuRolFun.listarSistemaRolAptos().subscribe((data: UsuarioSistemaRolDTO[]) => {     
      this.sistemasRolApto = data;           
    });
  }

  listarUsuarioSistemaRol() {
    this.serviceUsuRolFun.listarUsuarioSistemaRol().subscribe((data: UsuarioSistemaRolDTO[]) => {     
      this.sistemasRolUsuarios = data;
      this.total = data.length;     
    });
  }
  
  changeSistema() {
    let id: number = this.idSistema;
    this.rolesFiltrados = this.sistemasRolApto.filter(x => x.siscod === id);  
    this.rolesSelect = this.sistemasRolUsuarios.filter(x => x.usucod === this.idUsuarioSelect && x.siscod === id);
     console.log(this.rolesFiltrados);
        
  }

  openUsuario(data?: Usuario) {
    if(data != null) {
        //this.form.setValue(data);
    } else {
      this.router.navigate(['/usuario/nuevo']);
    }
    
  }

  open(content, data?: Usuario) {
    this.selectedTabId = 'acceso';
    if(data != null) {
      this.form.get('usucod').setValue(data.usucod);
      this.form.get('usutipdoc').setValue(data.usutipdoc);
      this.form.get('usudni').setValue(data.usudni);
      this.form.get('usunom').setValue(data.usunom);
      this.form.get('usuapepat').setValue(data.usuapepat);
      this.form.get('usuapemat').setValue(data.usuapemat);
      this.form.get('ususexo').setValue(data.ususexo);
      this.form.get('usuarea').setValue(data.usuarea);
      this.form.get('usucargo').setValue(data.usucargo);
      this.form.get('usudirec').setValue(data.usudirec);
      this.form.get('usuface').setValue(data.usuface);
      this.form.get('usutwitter').setValue(data.usutwitter);
      this.form.get('usugoogle').setValue(data.usugoogle);
      this.form.get('estreg').setValue(data.estreg);
      this.form.get('usulog').setValue(data.usulog);
      this.form.get('usupas').setValue(data.usupas);
      this.form.get('usucor').setValue(data.usucor);
      this.form.get('usuanexo').setValue(data.usuanexo);
    } else {
       this.iniciarForm();
    }
    
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  
  popudSistema(modalsistema, data?: Usuario) {
    this.selectedTabId = 'acceso';
    if(data != null) {
      this.idUsuarioSelect = data.usucod;
      this.sistemasSelect;
      
      this.sistemasSelect = this.sistemasUsuarios.filter(x => x.usucod === data.usucod);
      // this.sistemasUsuarios
      // this.sistemasSelect.push( this.stations[31] );
    } else {
       this.iniciarForm();
    }
    
    this.modalService.open(modalsistema, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  popudSisRoles(modalsisrol, data?: Usuario) {
    this.selectedTabId = 'acceso';
    if(data != null) {
      this.idUsuarioSelect = data.usucod;
      // this.sistemasSelect;
      
       this.sistemasSelect = this.sistemasUsuarios.filter(x => x.usucod === data.usucod);
      // this.sistemasUsuarios
      // this.sistemasSelect.push( this.stations[31] );
    } else {
       this.iniciarForm();
    }
    
    this.modalService.open(modalsisrol, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  grabarSistema(){
    console.log(this.sistemasSelect);
    let datos: UsuarioSisRolDTO = new UsuarioSisRolDTO();
    datos.usuario = new Usuario();
    datos.usuario.usucod = this.idUsuarioSelect;
    datos.lstRol = null;
    datos.lstSistema = this.sistemasSelect;
    
    this.serviceUsuRolFun.registrar(datos).subscribe(data =>{
      console.log(data);
       
          this.modalService.dismissAll();
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Registrado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          //this.llenarGrid();
    });
  }

  grabarSistemaRol(){
    //console.log(this.rolesSelect);
    let datos: UsuarioSisRolDTO = new UsuarioSisRolDTO();
    datos.usuario = new Usuario();
    datos.usuario.usucod = this.idUsuarioSelect;
    datos.lstRol = this.rolesSelect
    
    console.log(datos);
    
    this.serviceUsuRolFun.registrar(datos).subscribe(data =>{
      console.log(data);
       
          this.modalService.dismissAll();
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Registrado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          //this.llenarGrid();
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

  registrar() {
    if (this.form.valid) {
      if (this.form.get('usucod').value == null) {
        this.form.get('usureg').setValue('1');
        this.service.registrar(this.form.value).subscribe(data => {
          this.modalService.dismissAll();
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Registrado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.listar();
        });
      }
      else {
          this.form.get('usumod').setValue('1')
          this.service.modificar(this.form.value).subscribe(data =>{
            console.log(data);
            this.modalService.dismissAll();
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Actualizado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
            this.listar();
          });
      }
    }
  }

}
