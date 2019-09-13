import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Funcionalidad } from '../../models/funcionalidad';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FuncionalidadService } from './funcionalidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionalidad',
  templateUrl: './funcionalidad.component.html',
  styleUrls: ['./funcionalidad.component.scss']
})
export class FuncionalidadComponent implements OnInit {
  form: FormGroup;
  funcionalidades: Funcionalidad[] = [];
  listaFunc: Funcionalidad[] = [];
  total = 0;
  page = 0;
  closeResult: string;
  idSistema = 1;

  constructor(private formBuilder: FormBuilder,
              private modalService: NgbModal,
              config: NgbModalConfig,
              private service: FuncionalidadService) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit() {
    this.listar();
    this.iniciarForm();
  }

  listar() {
    this.service.listar().subscribe((data: Funcionalidad[]) => {
      this.funcionalidades = data;
      this.listaFunc = data;
      this.total = data.length;
    });
  }

  iniciarForm() {
    this.form = this.formBuilder.group({
      funcod: new FormControl(null),
      funnom: new FormControl('', Validators.required),
      fundes: new FormControl('', Validators.required),
      funsig: new FormControl('', Validators.required),
      estreg: new FormControl('1'),
      usureg: new FormControl(''),
      usumod: new FormControl('')
    });
  }

  applyFilter(searchValue: string = null) {
    this.listaFunc = this.funcionalidades;
    if (searchValue) {
      this.listaFunc = this.listaFunc.filter(x => (x.funnom.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1) ||
                                   x.funsig.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1);
      this.total = this.listaFunc.length;
    }
  }

  registrar() {
    if (this.form.valid) {
      if (this.form.get('funcod').value == null) {
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
        this.service.modificar(this.form.value).subscribe(() => {
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

  elimnar(data: Funcionalidad) {
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
        this.service.eliminar(data.funcod).subscribe(() => {
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

  open(content, data?: Funcionalidad) {
    if (data != null) {
      this.form.get('funcod').setValue(data.funcod);
      this.form.get('funnom').setValue(data.funnom);
      this.form.get('fundes').setValue(data.fundes);
      this.form.get('funsig').setValue(data.funsig);
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
