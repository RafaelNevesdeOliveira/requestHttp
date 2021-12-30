import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveSearchComponent } from './reactive-search.component';

const routes: Routes = [
  {
    path:'', component: ReactiveSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveSearchRoutingModule { }
