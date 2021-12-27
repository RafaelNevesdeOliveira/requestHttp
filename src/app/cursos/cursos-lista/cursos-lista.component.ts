import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { Curso } from './curso-lista';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CursosService } from '../cursos.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal: any
  // cursos?: Curso[];
  modalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;

  // VARIAVEL COM DOLAR = Adotada pela comunidade para se trabalhar com observable
  cursos$?: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  cursoSelecionado?: Curso;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CursosService,
    private alertServce: AlertModalService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    // this.service.getList().subscribe(dados => this.cursos = dados);
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.getList().pipe(
      //map(),
      //tap(),
      //switchMap(),
      catchError((error) => {
        console.log(error);
        //this.error$.next(true);
        this.handleError();
        return EMPTY;
      })
    );
  }

  handleError() {
    this.alertServce.showAlertDanger(
      'Erro ao Carregar curso. Tente novamente mais tarde'
    );
  }

  onEdit(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(curso: any) {
    this.cursoSelecionado = curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal,{
      class: 'modal-sm'
    })
  }

  onConfirmDelete(){
    this.service.delete(this.cursoSelecionado?.id).subscribe(
      (success) => {
        this.alertServce.showAlertSuccess(
          'Curso removido com sucesso.'
        ),
        this.onRefresh(),
        this.onDeclineDelete()
      },
      (error) =>{
        this.alertServce.showAlertDanger(
          'Erro ao remover curso. Tente novamente mais tarde'
        ),
        this.onDeclineDelete()
      }
    )
  }

  onDeclineDelete(){
    this.deleteModalRef?.hide()
  }

}
