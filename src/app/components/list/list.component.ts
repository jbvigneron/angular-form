import { Component } from '@angular/core';
import { Person } from '../../models/person';
import { PersonsService } from '../../services/persons.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  persons: Person[];

  constructor(private readonly personsService: PersonsService) {
    this.persons = this.personsService.getPersons();
  }

  prepareEdit(person: Person) {
    this.personsService.prepareEditPerson(person);
  }

  delete(person: Person) {
    this.personsService.deletePerson(person.id);
  }
}
