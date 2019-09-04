import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolMenRoutingModule } from './rol-men-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { RolMenComponent } from './rol-men.component';


@NgModule({
  declarations: [RolMenComponent],
  imports: [
    CommonModule,
    RolMenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    NgSelectModule,
    HttpClientModule,
    SharedPipesModule
  ]
})
export class RolMenModule { }
