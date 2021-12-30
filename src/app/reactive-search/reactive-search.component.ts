import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-reactive-search',
  templateUrl: './reactive-search.component.html',
  styleUrls: ['./reactive-search.component.scss'],
})
export class ReactiveSearchComponent implements OnInit {
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';

  results$?: Observable<any>;
  total?: number;

  queryField = new FormControl();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSearch() {
    console.log(this.queryField.value);

    const fields = 'name, description,version,homepage'
    let value = this.queryField.value;

    if (value && (value = value.trim()) !== '') {

      // const params_ = {
      //   search: value,
      //   fields: fields
      // }

      let params = new HttpParams()
      params = params.set('search', value)
      params = params.set('fields', fields)

      this.results$ = this.http
        .get(this.SEARCH_URL, {params})

        .pipe(
          tap((res: any) => (this.total = res.total)),
          map((res: any) => res.results)
        );
    }
  }
}
