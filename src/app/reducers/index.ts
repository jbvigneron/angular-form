import { ActionReducerMap, MetaReducer, createReducer, on } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Person } from '../models/person';
import { addPerson, deletePerson, beginEditPerson, finishEditPerson } from '../actions/persons.actions';
import { loadTodosSuccess, loadTodosError } from '../actions/todo.actions';

export const stateFeatureKey = 'state';

export interface RootState {
  app: AppState;
}

export interface AppState {
  currentPerson: Person | undefined;
  persons: Person[];
  todos: any[];
  error: any | undefined;
}

export const initialState: AppState = {
  currentPerson: undefined,
  persons: [],
  todos: [],
  error: undefined
};

export const appReducer = createReducer(
  initialState,
  on(addPerson, (state: AppState, { person }) => ({
    ...state,
    persons: state.persons.concat({
      ...person,
      id: new Date().getTime()
    })
  })),
  on(beginEditPerson, (state: AppState, { person }) => ({
    ...state,
    currentPerson: person
  })),
  on(finishEditPerson, (state: AppState, { person }) => ({
    ...state,
    currentPerson: null,
    persons: state.persons.filter(p => p.id !== person.id).concat(person)
  })),
  on(deletePerson, (state: AppState, { id }) => ({
    ...state,
    currentPerson: null,
    persons: state.persons.filter(p => p.id !== id)
  })),
  on(loadTodosSuccess, (state: AppState, { todos }) => ({
    ...state,
    todos
  })),
  on(loadTodosError, (state: AppState, { error }) => ({
    ...state,
    error
  }))
);

export const reducers: ActionReducerMap<RootState> = {
  app: appReducer
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
