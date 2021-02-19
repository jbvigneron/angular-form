import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '../models/person';

@Pipe({
  name: 'promotion'
})
export class PromotionPipe implements PipeTransform {
  transform(person: Person) {
    return person.promotion ? person.promotion : 'Non concerné';
  }
}
