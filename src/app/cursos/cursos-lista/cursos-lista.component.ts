import { Curso } from './curso-lista';
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos?: Curso[];

  // VARIAVEL COM DOLAR = Adotada pela comunidade para se trabalhar com observable
  cursos$?: Observable<Curso[]>

  constructor( private service: CursosService) { }

  ngOnInit(): void {
    // this.service.getList().subscribe(dados => this.cursos = dados);
    this.cursos$ = this.service.getList()
  }

}
