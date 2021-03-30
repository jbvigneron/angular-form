import { Injectable, EventEmitter } from '@angular/core';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  private persons: Person[] = [];
  public onEdit = new EventEmitter<Person>();

  public getPersons() {
    return this.persons;
  }

  public addPerson(person: Person) {
    const lastPerson = this.persons[this.persons.length - 1];
    const lastId = (lastPerson && lastPerson.id) || 0;
    const newId = lastId + 1;
    person.id = newId;

    this.persons.push(person);
  }

  public prepareEditPerson(person: Person) {
    this.onEdit.emit(person);
  }

  public finishEditPerson(person: Person) {
    const index = this.persons.findIndex(p => p.id === person.id);
    this.persons.splice(index, 1, person);
  }

  public deletePerson(id: number) {
    const index = this.persons.findIndex(p => p.id === id);
    this.persons.splice(index, 1);
  }
}
