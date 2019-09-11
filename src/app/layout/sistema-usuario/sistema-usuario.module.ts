import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaUsuarioRoutingModule } from './sistema-usuario-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { SistemaUsuarioComponent } from './sistema-usuario.component';


@NgModule({
  declarations: [SistemaUsuarioComponent],
  imports: [
    CommonModule,
    SistemaUsuarioRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    HttpClientModule,
    SharedPipesModule
  ]
})
export class SistemaUsuarioModule { }
