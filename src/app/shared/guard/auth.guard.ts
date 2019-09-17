import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/login/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private service: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const helper = new JwtHelperService();
        let rpta = this.service.estaLogeado();
        console.log('rpta = ' + rpta);
        if (!rpta) {
          sessionStorage.clear();
          this.router.navigate(['/login']);
          return false;
        } else {
          let token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
          //si no esta expirado
          if (!helper.isTokenExpired(token.access_token)) {
    
            // /consulta
            // compare si /consulta puede ser accededido por el rol ADMIN
            const decodedToken = helper.decodeToken(token.access_token);
            let url = state.url;
    
            // return this.menuService.listarPorUsuario(decodedToken.user_name).pipe(map((data: Menu[]) => {
            //   this.menuService.menuCambio.next(data);
    
            //   let cont = 0;
            //   for (let m of data) {
            //     if (url.startsWith(m.url)) {
            //       cont++;
            //       break;
            //     }
            //   }
    
            //   if (cont > 0) {
            //     return true;
            //   } else {
            //     this.router.navigate(['not-401']);
            //     return false;
            //   }
            // }));
            console.log("no expirado");
            
            return true;
    
          } else {
            //si el token ya expiro
            console.log("expirado");
            sessionStorage.clear();
            this.router.navigate(['/login']);
            return false;
          }
        }
      }
}