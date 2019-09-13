import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Rol } from '../../models/rol';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { RolService } from './rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {
  form: FormGroup;
  roles: Rol[] = [];
  listaRoles: Rol[] = [];
  total = 0;
  page = 0;
  closeResult: string;

  constructor(private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private config: NgbModalConfig,
              private service: RolService) {
                this.config.backdrop = 'static';
                this.config.keyboard = false;
              }

  ngOnInit() {
    this.listar();
    this.iniciarForm();
  }

  listar() {
    this.service.listar().subscribe((data: Rol[]) => {
      this.roles = data;
      this.listaRoles = data;
      this.total = data.length;
    });
  }

  iniciarForm() {
    this.form = this.formBuilder.group({
      rolcod: new FormControl(null),
      rolnom: new FormControl('', Validators.required),
      rolsig: new FormControl('', Validators.required),
      roldes: new FormControl('', Validators.required),
      estreg: new FormControl('1'),
      usureg: new FormControl(''),
      usumod: new FormControl('')
    });
  }
  applyFilter(searchValue: string = null) {
    this.listaRoles = this.roles;
    if (searchValue) {
      this.listaRoles = this.listaRoles.filter(x => (x.rolnom.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1) ||
                                               x.rolnom.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1);
      this.total = this.listaRoles.length;
    }
  }

  registrar() {
    if (this.form.valid) {
      if (this.form.get('rolcod').value == null) {
        this.form.get('usureg').setValue('1');
        this.service.registrar(this.form.value).subscribe(() => {
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
        this.form.get('usumod').setValue('1');
        this.service.modificar(this.form.value).subscribe(data => {
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

  elimnar(data: Rol) {
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
        this.service.eliminar(data.rolcod).subscribe(() => {
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

  open(content, data?: Rol) {
    if (data != null) {
      this.form.get('rolcod').setValue(data.rolcod);
      this.form.get('rolnom').setValue(data.rolnom);
      this.form.get('roldes').setValue(data.roldes);
      this.form.get('rolsig').setValue(data.rolsig);
      this.form.get('estreg').setValue(data.estreg);
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

}
