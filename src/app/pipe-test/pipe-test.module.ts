import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipeTestRoutingModule } from './pipe-test-routing.module';
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';
import { PipeTestComponent } from './pipe-test.component';


@NgModule({
  declarations: [
    CpfCnpjPipe,
    PipeTestComponent
  ],
  imports: [
    CommonModule,
    PipeTestRoutingModule,
  ],
  exports:[
    CpfCnpjPipe
  ],
  providers:[CpfCnpjPipe]
})
export class PipeTestModule { }
