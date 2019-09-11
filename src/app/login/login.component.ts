import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    usuario: string;
    password: string;
    constructor(public router: Router,
                private service: LoginService
    ) {}

    ngOnInit() {}

    onLoggedin() {
        this.service.login(this.usuario, this.password).subscribe(data => {
            if (data) {
              const helper = new JwtHelperService();
      
              let token = JSON.stringify(data);
              sessionStorage.setItem(environment.TOKEN_NAME, token);
      
              let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
              const decodedToken = helper.decodeToken(tk.access_token);
              //console.log(decodedToken);
      
            //   this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
            //     this.menuService.menuCambio.next(data);
            //   });
              this.router.navigate(['/sistema']);        
            }
          });
    }
}

