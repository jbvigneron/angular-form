import { Component } from '@angular/core';
import { Person } from '../../models/person';
import { Store } from '@ngrx/store';
import { RootState } from '../../reducers';
import { Observable } from 'rxjs';
import { beginEditPerson, deletePerson } from '../../actions/persons.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  persons$: Observable<Person[]>;

  constructor(private readonly store: Store<RootState>) {
    this.persons$ = this.store.select(s => s.app.persons);
  }

  beginEdit(person: Person) {
    this.store.dispatch(beginEditPerson({ person }));
  }

  delete(person: Person) {
    this.store.dispatch(deletePerson({ id: person.id }));
  }
}
