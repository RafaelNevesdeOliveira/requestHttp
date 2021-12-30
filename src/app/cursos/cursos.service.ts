import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './cursos-lista/curso-lista';
import { delay, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private readonly API = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) { }

  getList() {
    let list = this.http.get<Curso[]>(this.API)
    .pipe(
      delay(500),
      tap(console.log));
    return list;
  }


  create(curso: any){
    return this.http.post(this.API, curso).pipe(take(1))
  }

  update(id:any){
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1))
  }

  updateCurso(curso: any){
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1))
  }

  save(curso:any){
    if(curso.id){
      return this.updateCurso(curso)
    }else{
      return this.create(curso)
    }
  }

  delete(id?: any){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1))
  }
}
