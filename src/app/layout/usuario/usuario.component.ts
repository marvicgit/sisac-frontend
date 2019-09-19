import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  form: FormGroup;
  selectedTabId = 'acceso';
  page = 0;
  total = 0;
  closeResult: string;
  usuarios: Usuario[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(private formBuilder: FormBuilder,
              private modalService: NgbModal,
              config: NgbModalConfig,
              private service: UsuarioService,
              private router: Router) {
                config.backdrop = 'static';
                config.keyboard = false;
              }

  ngOnInit() {
    this.iniciarForm();
    this.listar();
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
      estreg: new FormControl('1'),
      usulog: new FormControl(null),
      usupas: new FormControl(null),
      usucor: new FormControl(null, [Validators.required, Validators.email]),
      usuanexo: new FormControl(null),
      usureg: '',
      usumod: ''
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
      this.listaUsuarios = data;
      this.total = data.length;
    });
  }

  applyFilter(searchValue: string = null) {
    this.listaUsuarios = this.usuarios;
    if (searchValue) {
      this.listaUsuarios = this.listaUsuarios.filter(x => (x.usunom.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1) ||
                                   x.usuapepat.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1);
      this.total = this.listaUsuarios.length;
    }
  }


  openUsuario(data?: Usuario) {
    if (data != null) {
        //this.form.setValue(data);
    } else {
      this.router.navigate(['/usuario/nuevo']);
    }
  }
  buscarUsuarioLdap(){
    this.service.buscarUsuarioLdap(this.form.get('usulog').value).subscribe(data => {
      this.form.get('usucor').setValue(data.usucor)
      this.form.get('usunom').setValue(data.usunom);
    });
  }

  open(content, data?: Usuario) {
    this.selectedTabId = 'acceso';
    if (data != null) {
      this.form.get('usucod').setValue(data.usucod);
      this.form.get('usutipdoc').setValue(data.usutipdoc);
      this.form.get('usudni').setValue(data.usudni);
      this.form.get('usunom').setValue(data.usunom);
      this.form.get('usuapepat').setValue(data.usuapepat);
      this.form.get('usuapemat').setValue(data.usuapemat);
      this.form.get('ususexo').setValue(data.ususexo.toString());
      this.form.get('usuarea').setValue(data.usuarea);
      this.form.get('usucargo').setValue(data.usucargo);
      this.form.get('usudirec').setValue(data.usudirec);
      this.form.get('estreg').setValue(data.estreg);
      this.form.get('usulog').setValue(data.usulog);
      //this.form.get('usupas').setValue(data.usupas);
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
  }

  elimnar(data: Usuario) {
    Swal.fire({
      title: '¿Estas seguro de eliminar?',
      text: 'No podras revertirlo!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.service.eliminar(data.usucod).subscribe(() => {
          Swal.fire(
            'Eliminado!',
            'El registro fue eliminado correctamente.',
            'success'
          );
          this.listar();
        });
      }
    });
  }

  registrar() {
    console.log(this.form.valid);
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
      } else {
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
