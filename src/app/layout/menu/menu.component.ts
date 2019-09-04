import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Menu } from '../../models/menu';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from './menu.service';
import { Sistema } from '../../models/sistema';
import { SistemaService } from '../sistema/sistema.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  form: FormGroup;
  gridMenus: Menu[] = [];
  sistemas: Sistema[];
  total: number = 0;
  searchValue: string;
  menus: Menu[];
  page: number = 0;
  closeResult: string;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, config: NgbModalConfig, private service: MenuService, private serviceSistema: SistemaService) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit() {
    this.listarSistema();
    this.gridMenu();
    this.iniciarForm();
  }

  iniciarForm() {
    this.form = this.formBuilder.group({
        mencod: new FormControl(null),
        mennom: new FormControl('', Validators.required),
        menico: new FormControl(''),
        mensig: new FormControl('', Validators.required),
        menrut: new FormControl('', Validators.required),
        menord: new FormControl('', Validators.required),
        estreg: new FormControl('1'),
        sistema: new FormGroup({
            siscod: new FormControl('', Validators.required),
        }),
        padre: new FormGroup({
            mencod: new FormControl(null),
        }),
        usureg: null,
        usumod: null,
        fecmod: null
    });
  }


  listarSistema() {
    this.serviceSistema.listar().subscribe(data => {
      this.sistemas = data;
    })
  }

  gridMenu() {
    this.service.listar().subscribe( data => {    
      this.gridMenus = data;
      this.total = data.length;
    })
  }

  registrar() {
    if(this.form.valid) {
      let data: Menu = this.form.value;
      if(data.padre.mencod == null) {
        data.padre = null;
      }
      if(data.mencod == null){
        data.usureg = '1'
        data.menest = '1'
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
          this.gridMenu();
        });
      } else {
        data.usumod = '1'
        this.service.modificar(data).subscribe(data =>{
          this.modalService.dismissAll();
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.gridMenu();
        });
      }
    }
  }

  changeSistema() {
    let id: number = this.form.get('sistema.siscod').value
    this.menus = this.gridMenus.filter(function(l) {
      return l.sistema.siscod === id;
    });
  }

  elimnar(data: Menu){
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
        this.service.eliminar(data.mencod).subscribe( data => {
          Swal.fire(
            'Eliminado!',
            'El registro fue eliminado correctamente.',
            'success'
          );
          this.gridMenu();
        });
      }
    })
  } 

  open(content, data?: Menu) {
    if(data != null) {
        
        this.form.get('mencod').setValue(data.mencod);
        this.form.get('mennom').setValue(data.mennom);
        this.form.get('menico').setValue(data.menico);
        this.form.get('mensig').setValue(data.mensig);
        this.form.get('menrut').setValue(data.menrut);
        this.form.get('menord').setValue(data.menord);
        this.form.get('estreg').setValue(data.estreg);
        this.form.get('usureg').setValue(data.usureg);
        this.form.get('sistema.siscod').setValue(data.sistema.siscod);
        this.changeSistema();
        if(data.padre != null) {
          this.form.get('padre.mencod').setValue(data.padre.mencod);
        }
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
