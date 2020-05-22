import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../reducers';
import { loadTodos } from '../actions/todo.actions';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent {
  todos$: Observable<any[]>;

  constructor(private readonly store: Store<RootState>) {
    this.todos$ = this.store.select(s => s.app.todos);

    this.store.dispatch(loadTodos());
  }
}
