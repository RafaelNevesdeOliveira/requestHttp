import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpj',
})
export class CpfCnpjPipe implements PipeTransform {
  transform(value: string): any {
    if (!value) {
      return null;
    }

    const identicacao = value.replace(/[^0-9]/g, '');

    if (identicacao.length === 11) {
      return identicacao.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/g,
        '$1.$2.$3-$4'
      );
    } else if (identicacao.length === 14) {
      return identicacao.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
        '$1.$2.$3/$4-$5'
      );
    }

    return value;
  }
}
