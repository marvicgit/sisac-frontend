import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SistemaRoutingModule } from './sistema-routing.module';
import { SistemaComponent } from './sistema.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';


@NgModule({
  declarations: [SistemaComponent],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxUpperCaseDirectiveModule,
    NgbModule,
    HttpClientModule,
    SharedPipesModule
  ]
})
export class SistemaModule { }
