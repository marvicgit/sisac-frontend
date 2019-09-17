import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'olvide-contrasena', loadChildren: () => import('./olvide-contrasena/olvide-contrasena.module').then(m => m.OlvideContrasenaModule) },
  { path: 'recuperar/:token', loadChildren: () => import('./recuperar/recuperar.module').then(m => m.RecuperarModule) },
  // { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
  // { path: 'error', loadChildren: () => import('./server-error/server-error.module').then(m => m.ServerErrorModule) },
  // { path: 'access-denied', loadChildren: () => import('./access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
  // { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
