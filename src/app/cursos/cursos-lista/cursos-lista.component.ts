import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { Curso } from './curso-lista';
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos?: Curso[];
  modalRef?: BsModalRef
  // VARIAVEL COM DOLAR = Adotada pela comunidade para se trabalhar com observable
  cursos$?: Observable<Curso[]>
  error$ = new Subject<boolean>()

  constructor( private service: CursosService,private modalService: BsModalService) { }

  ngOnInit(): void {
    // this.service.getList().subscribe(dados => this.cursos = dados);
    this.onRefresh()
  }

  onRefresh(){
    this.cursos$ = this.service.getList()
      .pipe(
        //map(),
        //tap(),
        //switchMap(),
        catchError(error =>{
          console.log(error);
          //this.error$.next(true);
          this.handleError();
          return EMPTY
        })
      )
  }

  handleError(){
    this.modalRef = this.modalService.show(AlertModalComponent);
    this.modalRef.content.type = 'danger'
    this.modalRef.content.message = 'Erro ao Carregar curso. Tente novamente mais tarde'
  }


}
