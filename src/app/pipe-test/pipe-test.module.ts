import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipeTestRoutingModule } from './pipe-test-routing.module';
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';
import { PipeTestComponent } from './pipe-test.component';
import { TempConverterPipe } from './pipes/temp-converter.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CpfCnpjPipe,
    PipeTestComponent,
    TempConverterPipe
  ],
  imports: [
    CommonModule,
    PipeTestRoutingModule,
    FormsModule
  ],
  exports:[
    CpfCnpjPipe,
    TempConverterPipe
  ],
  providers:[CpfCnpjPipe]
})
export class PipeTestModule { }
