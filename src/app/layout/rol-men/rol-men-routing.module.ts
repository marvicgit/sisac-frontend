import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolMenComponent } from './rol-men.component';


const routes: Routes = [
  { path: '', component: RolMenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolMenRoutingModule { }
