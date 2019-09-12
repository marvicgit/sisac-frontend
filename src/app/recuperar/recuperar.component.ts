import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PasswordValidation } from '../shared';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent implements OnInit {
  form: FormGroup;
  token: string;
  mensaje: string;
  error: string;
  rpta: number;
  tokenValido: boolean;

  constructor(private formBuilder: FormBuilder,
              private service: LoginService,
              private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.iniciarForm();
    this.verificarTokenReset();
  }

  iniciarForm() {
    this.form = this.formBuilder.group({
      password: [''],
      confirmPassword: ['']}, {
        validator: PasswordValidation.MatchPassword
      });
  }

  verificarTokenReset() {
    this.route.params.subscribe((params: Params) => {
      this.token = params['token'];
      this.service.verificarTokenReset(this.token).subscribe(data => {
        if (data === 1) {
          this.tokenValido = true;
        } else {
          this.tokenValido = false;
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        }
      });
    });
  }

  onSubmit() {
    let clave: string = this.form.value.confirmPassword;
    this.service.restablecer(this.token, clave).subscribe(data => {
      if (data === 1) {
        this.rpta = 1;
      }
    }, (err => {
      this.rpta = 0;
    }));
  }

}
