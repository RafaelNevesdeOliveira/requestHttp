import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempConverter'
})
export class TempConverterPipe implements PipeTransform {

  transform(value: number, unit: string) {
    if(value && !isNaN(value)){
      if(unit === 'C'){
        let temperature = (value - 32)/ 1.8;
        return temperature.toFixed(2)
      }else if( unit === 'F'){
        let temperature = (value * 1.8) + 32
        return temperature.toFixed(2)
      }
    }
    return
  }

}
