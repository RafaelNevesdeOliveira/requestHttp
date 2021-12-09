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
    this.form = this.formBuilder.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
    this.route.params
    .pipe(
      map((params:any)=> params['id']),
      switchMap(id =>
        this.service.update(id))
    )
    .subscribe(
      (curso) => {
        this.updateForm(curso)
      }
    )
  }

  updateForm(curso:any){
    this.form.patchValue({
      id: curso.id,
      nome : curso.nome
    })
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      this.service.create(this.form.value).subscribe(
        (success) => {
          this.modal.showAlertSuccess('Curso criado com sucesso'),
            this.router.navigateByUrl("/cursos")
        },
        (error) =>
          this.modal.showAlertDanger('Erro ao criar curso, tente novamente'),
        () => console.log('request completo')
      );
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
