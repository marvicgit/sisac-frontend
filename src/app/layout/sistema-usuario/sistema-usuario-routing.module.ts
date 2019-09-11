import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SistemaUsuarioComponent } from './sistema-usuario.component';


const routes: Routes = [
  { path: '', component: SistemaUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaUsuarioRoutingModule { }
