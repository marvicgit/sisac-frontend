import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionalidadRoutingModule } from './funcionalidad-routing.module';
import { FuncionalidadComponent } from './funcionalidad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';


@NgModule({
  declarations: [FuncionalidadComponent],
  imports: [
    CommonModule,
    FuncionalidadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    NgSelectModule,
    HttpClientModule,
    SharedPipesModule
  ]
})
export class FuncionalidadModule { }
