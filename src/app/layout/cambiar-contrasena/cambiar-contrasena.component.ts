import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { PasswordValidation } from '../../shared';


@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss']
})
export class CambiarContrasenaComponent implements OnInit {

  form: FormGroup;
  token: string;
  mensaje: string;
  error: string;
  rpta: number;
  tokenValido: boolean;
  
  constructor(fb: FormBuilder, private router: Router, private route: ActivatedRoute, private loginService: LoginService) {
    this.form = fb.group({
      password: [''],
      confirmPassword: ['']}, {
        validator: PasswordValidation.MatchPassword
      });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.token = params['token'];
        this.loginService.verificarTokenReset(this.token).subscribe(data => {
          if (data === 1) {
            this.tokenValido = true;
          } else {
            this.tokenValido = false;
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 2000);
          }
        });
      }
    )
  }

}
