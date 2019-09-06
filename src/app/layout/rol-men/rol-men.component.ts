import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Sistema } from '../../models/sistema';
import { Rol } from '../../models/rol';
import { Menu } from '../../models/menu';
import { SistemaService } from '../sistema/sistema.service';
import { RolService } from '../rol/rol.service';
import { MenuService } from '../menu/menu.service';
import { RolMenu } from '../../models/rolMenu';
import Swal from 'sweetalert2'
import { RolMenService } from './rol-men.service';
import { RolMenuDTO } from 'src/app/models/rolmenuDTO';

@Component({
  selector: 'app-rol-men',
  templateUrl: './rol-men.component.html',
  styleUrls: ['./rol-men.component.scss']
})
export class RolMenComponent implements OnInit {

  form: FormGroup;
  page: number = 0;
  rolMenus: RolMenu[];
  total: number = 0;
  roles: Rol[];
  sistemas: Sistema[];
  menus: Menu[];
  filtroMenus: Menu[];
  closeResult: string;
  constructor(private formBuilder: FormBuilder, 
              private modalService: NgbModal,
              private service: RolMenService,
              private config: NgbModalConfig, 
              private serviceSistema: SistemaService,
              private serviceMenu: MenuService,
              private serviceRol: RolService) { 
                this.config.backdrop = 'static';
                this.config.keyboard = false;
              }

  ngOnInit() {
    this.iniciarForm();
    this.llenarGrid();
    this.listarRol();
    this.listarSistema();
    this.listarMenu();
  }

  llenarGrid() {
    this.service.listar().subscribe( data => {   
      this.rolMenus = data;
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

    this.form.get('mencod').value.forEach(function(l) {
       let menu: Menu = new Menu();
       menu.mencod = l;
      lstMenu.push(menu);
    });

    if(this.form.valid) {
      let datos: RolMenuDTO = new RolMenuDTO();
      datos.rol = new Rol();
      datos.rol.rolcod = this.form.get('rolcod').value;
      datos.lstMenus = lstMenu;
      
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

  elimnar(data: RolMenu){
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
        this.service.eliminar(data.rolmencod).subscribe( data => {
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
