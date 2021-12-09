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
      delay(1000),
      tap(console.log));
    return list;
  }


  create(curso: any){
    return this.http.post(this.API, curso).pipe(take(1))
  }

  update(id:any){
    return this.http.get(`${this.API}/${id}`).pipe(take(1))
  }
}
