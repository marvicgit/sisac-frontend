import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    usuario: string;
    password: string;
    form: FormGroup;
    constructor(private formBuilder: FormBuilder,
                public router: Router,
                private service: LoginService
    ) {}

    ngOnInit() {
      this.iniciarForm();
    }

    iniciarForm() {
      this.form = this.formBuilder.group({
        usulog: new FormControl(null, Validators.required),
        usupas: new FormControl(null, Validators.required),
        });
    }

    onLoggedin() {
      if (this.form.valid) {
        this.service.login(this.form.value).subscribe(data => {
            if (data) {
              const helper = new JwtHelperService();
              const token = JSON.stringify(data);
              sessionStorage.setItem(environment.TOKEN_NAME, token);
              const tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
              const decodedToken = helper.decodeToken(tk.access_token);
              sessionStorage.setItem(environment.TOKE_USER, decodedToken.user_name);
              //console.log(decodedToken);
      
            //   this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
            //     this.menuService.menuCambio.next(data);
            //   });
              this.router.navigate(['/sistema']);
            }
          }, err => {
            console.log(err);
              Swal.fire({
                type: 'error',
                title: 'Error al autenticar',
                text: err.error.error
              });
          });
    }
  }
}

