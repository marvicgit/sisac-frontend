import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
        { path: 'sistema', loadChildren: () => import('./sistema/sistema.module').then(m => m.SistemaModule) },
        { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
        { path: 'rol', loadChildren: () => import('./rol/rol.module').then(m => m.RolModule) },
        { path: 'funcionalidad', loadChildren: () => import('./funcionalidad/funcionalidad.module').then(m => m.FuncionalidadModule) },
        { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
        { path: 'rol-men', loadChildren: () => import('./rol-men/rol-men.module').then(m => m.RolMenModule) },
        { path: 'rol-funcionalidad', loadChildren: () => import('./rol-funcionalidad/rol-funcionalidad.module').then(m => m.RolFuncionalidadModule) },
        { path: 'reporte', loadChildren: () => import('./reporte/reporte.module').then(m => m.ReporteModule) }
        // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
        // { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
        // { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
        // { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
        // { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
        // { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
        // { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },
        // { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
