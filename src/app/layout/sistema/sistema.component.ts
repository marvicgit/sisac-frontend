import { Component, OnInit, Input } from '@angular/core';
import { Sistema } from '../../models/sistema';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SistemaService } from './sistema.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent implements OnInit {
  form: FormGroup;
  sistemas: Sistema[] = [];
  listaSistemas: Sistema[] = [];
  page = 0;
  total = 0;
  pageSize = 7;
  closeResult: string;
  activoInactivo: string[] = [ '1', '0'];
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, config: NgbModalConfig, private service: SistemaService) {
    config.backdrop = 'static';
    config.keyboard = false;
   }
  ngOnInit() {
    this.iniciarForm();
    this.listar();
  }

  iniciarForm() {
    this.form = this.formBuilder.group({
        siscod: new FormControl(null),
        sisnom: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        sisdes: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        sissig: new FormControl('', [Validators.required, Validators.maxLength(15)]),
        estreg: new FormControl(1),
        usureg: '',
        fecmod: '',
        fecreg: '',
        usumod: ''
      });
  }

  listar() {
    this.service.listar().subscribe((data: Sistema[]) => {
      this.sistemas = data;
      this.listaSistemas = data;
      this.total = data.length;
    });
  }

  applyFilter(searchValue: string = null) {
    this.listaSistemas = this.sistemas;
    if (searchValue) {
      this.listaSistemas = this.listaSistemas.filter(x => (x.sisnom.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1) ||
                                   x.sissig.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1);
      this.total = this.listaSistemas.length;
    }
  }


  registrar() {
    if (this.form.valid) {
      if (this.form.get('siscod').value == null) {
        this.form.get('fecreg').setValue(new Date());
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
        this.form.get('fecmod').setValue(new Date());
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

  elimnar(data: Sistema) {
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
        this.service.eliminar(data.siscod).subscribe(() => {
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

    open(content, sistema?: Sistema) {
        if (sistema != null) {
            this.form.setValue(sistema);
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


