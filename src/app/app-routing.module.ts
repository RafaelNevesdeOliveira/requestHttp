import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'cursos'
  },
  {
    path: 'cursos',
    loadChildren: ()=> import('./cursos/cursos.module').then(m=> m.CursosModule)
  },
  {
    path: 'busca-reativa',
    loadChildren: ()=> import('./reactive-search/reactive-search.module').then(m=> m.ReactiveSearchModule)
  },
  {
    path: 'upload',
    loadChildren: ()=> import('./upload-file/upload-file.module').then(m=> m.UploadFileModule)
  },
  {
    path: 'rxjs-poc',
    loadChildren: ()=> import('./unsubscribe-rxjs/unsubscribe-rxjs.module').then(m=> m.UnsubscribeRxjsModule)
  },
  {
    path: 'pipe',
    loadChildren: ()=> import('./pipe-test/pipe-test.module').then(m => m.PipeTestModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
