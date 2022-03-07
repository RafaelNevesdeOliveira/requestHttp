import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipe-test',
  templateUrl: './pipe-test.component.html',
  styleUrls: ['./pipe-test.component.scss']
})
export class PipeTestComponent implements OnInit {
  name: string = 'josé'
  birthday = new Date(1988, 3, 15)
  cpf: string = '62185134590'
  cnpj: string = '55533976000111'
  celcius: any;
  Fahrenheit: any;

  constructor() { }

  ngOnInit(): void {
  }

}
