import { Injectable, EventEmitter } from '@angular/core';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  private persons: Person[] = [];
  public onEdit = new EventEmitter<Person>();

  public get() {
    return this.persons;
  }

  public add(person: Person) {
    person.id = new Date().getTime();
    this.persons.push(person);
  }

  public beginEdit(person: Person) {
    this.onEdit.emit(person);
  }

  public finishEdit(person: Person) {
    const index = this.persons.findIndex(p => p.id === person.id);
    this.persons.splice(index, 1, person);
  }

  public delete(id: number) {
    const index = this.persons.findIndex(p => p.id === id);
    this.persons.splice(index, 1);
  }
}
