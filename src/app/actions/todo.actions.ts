import { createAction, props, union } from '@ngrx/store';

export const loadTodos = createAction('Load todos');
export const loadTodosSuccess = createAction('Load todos success', props<{ todos: any[] }>());
export const loadTodosError = createAction('Load todos failed', props<{ error: any }>());

export const todosActions = union({
  loadTodos,
  loadTodosSuccess,
  loadTodosError
});
