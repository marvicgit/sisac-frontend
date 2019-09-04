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
  sistemas: Sistema[] = [];
  sistemasSelect: Sistema[] = [];
  key: string = 'rolmencod';
  display: any = 'rol.rolnom';
  sorter = true;
  filter = true;
  roles: Observable<Rol[]>;
  rolesMenus: RolMenu[] = [];
  sistemaRoles: SistemaRolDTO[] = [];
  sistemaRolesFil: SistemaRolDTO[] = [];
  funcionalidades: Observable<Funcionalidad[]>;
  idSistema: number = 0;
  usuarios: Usuario[];
  format = { add: 'Agregar', remove: 'Elimnar', all: 'Todos', none: 'Ninguno',
        direction: DualListComponent.LTR, draggable: true, locale: 'es' }

  constructor(private formBuilder: FormBuilder,
              private modalService: NgbModal, 
              config: NgbModalConfig,
              private service: UsuarioService, 
              private serviceSistema: SistemaService,
              private serviceRM: RolMenService,
              private serviceRol: RolService,
              private serviceFuncion: FuncionalidadService,
              private router: Router) { 
                config.backdrop = 'static';
                config.keyboard = false;
              }

  ngOnInit() {
    this.iniciarForm();
    this.listar();
    this.listarSistema();
    this.listarSistemaRoles();
    this.roles = this.serviceRol.getRoles();
    this.funcionalidades = this.serviceFuncion.getFuncionalidades();
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
      usulog: new FormControl('', Validators.required),
      usupas: new FormControl('', Validators.required),
      usucor: new FormControl('', [Validators.required, Validators.email]),
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

  listarSistema() {
    this.serviceSistema.listar().subscribe((data: Sistema[]) => {     
      this.sistemas = data;
      this.total = data.length;
    });
  }

  listarSistemaRoles() {
    this.serviceRM.listarSistemaRol().subscribe((data: SistemaRolDTO[]) => {     
      this.sistemaRoles = data;
      this.total = data.length;
    });
  }

  changeSistema() {
    let id: number = this.idSistema;
    console.log(this.idSistema);
    
    this.sistemaRolesFil = this.sistemaRoles.filter(function(l) {
      return l.sistema.siscod === id;
    });

    console.log(this.sistemaRolesFil);
    
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
    
    this.modalService.open(modalsistema, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  grabarSistema(){
    console.log(this.sistemasSelect);
    
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
