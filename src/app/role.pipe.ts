import { Pipe, PipeTransform } from '@angular/core';
import { Person } from './models/person';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {
  transform(person: Person) {
    switch (person.role) {
      case 'E':
        return 'Etudiant';
      case 'I':
        return 'Intervenant';
      default:
        return person.role;
    }
  }
}
