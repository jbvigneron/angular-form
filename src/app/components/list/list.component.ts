import { Component } from '@angular/core';
import { Person } from '../../models/person';
import { PersonsService } from '../../services/persons.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  persons: Person[];

  constructor(private readonly personsService: PersonsService) {
    this.persons = this.personsService.get();
  }

  beginEdit(person: Person) {
    this.personsService.beginEdit(person);
  }

  delete(person: Person) {
    this.personsService.delete(person.id);
    this.personsService.onDelete.emit();
  }
}
