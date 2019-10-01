import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(retry(environment.REINTENTOS)).
            pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.body && event.body.error === true && event.body.errorMessage) {
                        throw new Error(event.body.errorMessage);
                    }/*else{
                        this.snackBar.open("EXITO", 'AVISO', { duration: 5000 });
                    }*/
                }
            })).pipe(catchError((err) => {
                console.log(err);
                //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                if (err.status === 400) {
                    Swal.fire(
                        'Error!',
                        err.error.error_description,
                        'error'
                      );
                   // this.snackBar.open(err.message, 'ERROR 400', { duration: 5000 });
                } else if (err.status === 401) {
                    Swal.fire(
                        'Error!',
                        err.message,
                        'error'
                      );
                    //this.snackBar.open(err.error.message, 'ERROR 401', { duration: 5000 });
                    //this.router.navigate(['/login']);
                } else if (err.status === 500) {
                    Swal.fire(
                        'Error!',
                        err.message,
                        'error'
                      );
                    //this.snackBar.open(err.error.message, 'ERROR 500', { duration: 5000 });
                } else {
                    Swal.fire(
                        'Error!',
                        err.error.mensaje,
                        'error'
                      );
                    //this.snackBar.open(err.error.message, 'ERROR', { duration: 5000 });
                }
                return EMPTY;
            }));
    }
}