import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolFuncionalidadComponent } from './rol-funcionalidad.component';


const routes: Routes = [
  { path: '', component: RolFuncionalidadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolFuncionalidadRoutingModule { }
