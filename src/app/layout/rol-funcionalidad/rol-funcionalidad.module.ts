import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolFuncionalidadRoutingModule } from './rol-funcionalidad-routing.module';
import { RolFuncionalidadComponent } from './rol-funcionalidad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';


@NgModule({
  declarations: [RolFuncionalidadComponent],
  imports: [
    CommonModule,
    RolFuncionalidadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    NgSelectModule,
    HttpClientModule,
    SharedPipesModule
  ]
})

export class RolFuncionalidadModule { }
