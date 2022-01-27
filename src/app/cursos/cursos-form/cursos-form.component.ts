import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Curso } from '../cursos-lista/curso-lista';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  cursos$?: Observable<Curso[]>

  form!: FormGroup;
  submitted = false;

  constructor(
    private modal: AlertModalService,
    private formBuilder: FormBuilder,
    private service: CursosService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const curso = this.route.snapshot.data['curso']

    this.form = this.formBuilder.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
    // this.route.params
    // .pipe(
    //   map((params:any)=> params['id']),
    //   switchMap(id =>
    //     this.service.update(id))
    // )
    // .subscribe(
    //   (curso) => {
    //     this.updateForm(curso)
    //   }
    // )
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSuccess = 'Curso criado com sucesso'
      let msgErro = 'Erro ao criar curso, tente novamente'

      if(this.form.value.id){
        msgSuccess = 'Curso atualizado com sucesso'
        msgErro = 'Erro ao atualizar curso, tente novamente'
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess)
          this.location.back()
      },
        error => {this.modal.showAlertDanger(msgErro) }
      )
      // if(this.form.value.id){
      //   this.service.updateCurso(this.form.value).subscribe(
      //     (success) => {
      //       this.modal.showAlertSuccess('Curso atualizado com sucesso'),
      //         this.router.navigateByUrl("/cursos")
      //     },
      //     (error) =>
      //       this.modal.showAlertDanger('Erro ao atualizar curso, tente novamente'),
      //     () => console.log('request completo')
      //   );
      // }else{
      //   this.service.create(this.form.value).subscribe(
      //     (success) => {
      //       this.modal.showAlertSuccess('Curso criado com sucesso'),
      //         this.router.navigateByUrl("/cursos")
      //     },
      //     (error) =>
      //       this.modal.showAlertDanger('Erro ao criar curso, tente novamente'),
      //     () => console.log('request completo')
      //   );
      // }
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    console.log(this.form.value);
    if (!this.form.valid) {
      console.log('cancel');
      this.router.navigate([''])
    }

  }



  // formulario
}
