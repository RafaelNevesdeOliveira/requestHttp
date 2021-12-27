import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Resolve,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Curso } from '../cursos-lista/curso-lista';
import { CursosService } from '../cursos.service';

@Injectable({
  providedIn: 'root',
})
export class CursoResolverGuard implements Resolve<Curso> {
  constructor(private cursoService: CursosService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Curso | Observable<any> | Promise<Curso> {
    if (route.params && route.params['id']) {
      return this.cursoService.update(route.params['id']);
    }
    return of({
      id: null,
      nome: null,
    });
  }
}
