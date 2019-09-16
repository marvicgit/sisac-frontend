import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        { path: '', redirectTo: 'sistema', pathMatch: 'prefix' },
        { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
        { path: 'sistema', loadChildren: () => import('./sistema/sistema.module').then(m => m.SistemaModule), canActivate: [AuthGuard] },
        { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule), canActivate: [AuthGuard] },
        { path: 'rol', loadChildren: () => import('./rol/rol.module').then(m => m.RolModule), canActivate: [AuthGuard]  },
        { path: 'funcionalidad', loadChildren: () => import('./funcionalidad/funcionalidad.module').then(m => m.FuncionalidadModule), canActivate: [AuthGuard]  },
        { path: 'rol-men', loadChildren: () => import('./rol-men/rol-men.module').then(m => m.RolMenModule), canActivate: [AuthGuard]  },
        { path: 'rol-funcionalidad', loadChildren: () => import('./rol-funcionalidad/rol-funcionalidad.module').then(m => m.RolFuncionalidadModule), canActivate: [AuthGuard]  },
        { path: 'reporte', loadChildren: () => import('./reporte/reporte.module').then(m => m.ReporteModule), canActivate: [AuthGuard]  },
        { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule), canActivate: [AuthGuard]  },
        { path: 'sis-usuario', loadChildren: () => import('./sistema-usuario/sistema-usuario.module').then(m => m.SistemaUsuarioModule), canActivate: [AuthGuard]  },
        { path: 'cambiar-contrasena', loadChildren: () => import('./cambiar-contrasena/cambiar-contrasena.module').then(m => m.CambiarContrasenaModule), canActivate: [AuthGuard] },
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
