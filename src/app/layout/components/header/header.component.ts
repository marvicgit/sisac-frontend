import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../../../login/login.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    username: string;
    constructor(private translate: TranslateService,
                public router: Router,
                private service: LoginService ) {
        this.username = sessionStorage.getItem(environment.TOKE_USER);
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.service.cerrarSesion();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    irCambiarClave(){
        let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
        let token = tk != null ? tk.access_token : '';
        this.router.navigate(['/cambiar-contrasena/' + token]);    
    }
}
