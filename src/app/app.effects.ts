import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { todosActions, loadTodos, loadTodosSuccess, loadTodosError } from './actions/todo.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'; import { of } from 'rxjs';
;

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions<typeof todosActions>, private httpClient: HttpClient) { }

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        this.httpClient.get<any[]>('https://jsonplaceholder.typicode.com/todos').pipe(
          map(todos => loadTodosSuccess({ todos })),
          catchError(error => of(loadTodosError({ error })))
        )
      )
    )
  );
}
