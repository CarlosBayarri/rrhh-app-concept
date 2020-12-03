import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixDate'
})
export class FixDatePipe implements PipeTransform {

  transform(date: any): Date {
    var date = date.toDate().toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return date;
  }

}
