import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SistemaUsuarioService } from './sistema-usuario.service';
import Swal from 'sweetalert2'
import { UsuarioSistemaRol } from 'src/app/models/usuarioSistemaRol';
import { UsuarioSistemaRolDTO } from 'src/app/models/usuarioSistemaRolDTO';
import { SistemaService } from '../sistema/sistema.service';
import { Sistema } from 'src/app/models/sistema';
import { RolMenService } from '../rol-men/rol-men.service';
import { Rol } from '../../models/rol';
import { SistemaRolDTO } from 'src/app/models/sistemaRolDTO';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../../models/usuario';
import { UsuarioSisRolDTO } from 'src/app/models/usuarioSisRolDTO';

@Component({
  selector: 'app-sistema-usuario',
  templateUrl: './sistema-usuario.component.html',
  styleUrls: ['./sistema-usuario.component.scss']
})
export class SistemaUsuarioComponent implements OnInit {

  form: FormGroup;
  usuarioSistemas: UsuarioSistemaRolDTO[] = [];
  sistemas: Sistema[] = [];
  usuarios: Usuario[] = [];
  roles: SistemaRolDTO[] = [];
  rolesFiltrados: SistemaRolDTO[] = [];
  page: number = 0;
  total: number = 0;
  searchValue: string;
  closeResult: string;
  seconds = true;
  activoInactivo: string[] = [ '1','0' ];
  constructor(private formBuilder: FormBuilder, 
              private modalService: NgbModal, 
              config: NgbModalConfig, 
              private serviceUsuario: UsuarioService,
              private service: SistemaUsuarioService,
              private serviceSistema: SistemaService,
              private serviceRolMen: RolMenService) {
    config.backdrop = 'static';
    config.keyboard = false;
   }
  
  ngOnInit() {
    this.iniciarForm();
    this.listarSistema();
    this.listarUsuario();
    this.listarUsuarioSistemaRol();
    this.listarSistemaRol();
  }

  iniciarForm() {
    this.form = this.formBuilder.group({
        usucod: new FormControl(null, Validators.required),
        siscod: new FormControl(null, Validators.required),
        rolcod: new FormControl(null, Validators.required),
        estreg: new FormControl('1'),
        usureg: '',
        fecmod: '',
        fecreg: '',
        usumod: ''
      });
  }
  
  listarUsuario() {
    this.serviceUsuario.listar().subscribe(data => {
      this.usuarios = data;  
    })
  }
  listarUsuarioSistemaRol() {
    this.service.listarUsuarioSistemaRol().subscribe((data: UsuarioSistemaRolDTO[]) => {     
      this.usuarioSistemas = data;      
      this.total = data.length;
    });
  }

  listarSistema() {
    this.serviceSistema.listar().subscribe( data => {    
      this.sistemas = data;      
    })
  }

  listarSistemaRol() {
    this.serviceRolMen.listarSistemaRol().subscribe( data => {
      this.roles = data;
    });
  }

  filtrarRolesxSistema(){
    let id: number = this.form.get('siscod').value;
    this.rolesFiltrados = this.roles.filter(x => x.siscod === id);  
    console.log(this.rolesFiltrados);
    
  }

  changeSistema() {
    this.filtrarRolesxSistema();
  }


  registrar() {
    if(this.form.valid) {
      let data: UsuarioSisRolDTO = new UsuarioSisRolDTO();
      data.rol = new Rol();
      data.rol.rolcod = this.form.get('rolcod').value;
      data.usuario = new Usuario();
      data.usuario.usucod = this.form.get('usucod').value;
      data.siscod = this.form.get('siscod').value;
      data.usureg = "1";
      console.log(data);

      this.service.registrar(data).subscribe(data =>{
          this.modalService.dismissAll();
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Registrado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.listarUsuarioSistemaRol();
        });

      // if(this.form.get('siscod').value == null){
      //   this.form.get('fecreg').setValue(new Date());
      //   this.form.get('usureg').setValue('1');
      //   this.service.registrar(this.form.value).subscribe(data =>{
      //     this.modalService.dismissAll();
      //     Swal.fire({
      //       position: 'top-end',
      //       type: 'success',
      //       title: 'Registrado correctamente',
      //       showConfirmButton: false,
      //       timer: 1500
      //     });
      //     this.listar();
      //   });
        
        
      // } else {
      //   this.form.get('fecmod').setValue(new Date())
      //   this.form.get('usumod').setValue('1')
      //   this.service.modificar(this.form.value).subscribe(data =>{
      //     console.log(data);
      //     this.modalService.dismissAll();
      //     Swal.fire({
      //       position: 'top-end',
      //       type: 'success',
      //       title: 'Actualizado correctamente',
      //       showConfirmButton: false,
      //       timer: 1500
      //     });
      //     this.listar();
      //   });
        
        
      // }
    }
  }

  applyFilter(searchValue: string = null) {

  }

  elimnar(data: UsuarioSistemaRolDTO) {
  }
  // elimnar(data: Sistema){
  //   Swal.fire({
  //     title: '¿Estas seguro de eliminar?',
  //     text: "No podras revertirlo!",
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Si, eliminarlo!',
  //     cancelButtonText: 'Cancelar'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.service.eliminar(data.siscod).subscribe( data => {
  //         Swal.fire(
  //           'Eliminado!',
  //           'El registro fue eliminado correctamente.',
  //           'success'
  //         );
  //         this.listar();
  //       });
  //     }
  //   })
  // } 

  

    open(content, sistema?: Sistema) {
        // if(sistema != null) {
        //     this.form.setValue(sistema);
        // } else {
        //     this.iniciarForm();
        // }
        
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

}
