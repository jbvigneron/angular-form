import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
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
  on(addPerson, (state, action) => {
    const lastPerson = state.persons[state.persons.length - 1];
    const newId = lastPerson ? (lastPerson.id + 1) : 1;

    const person = { ...action.person };
    person.id = newId;

    return {
      ...state,
      persons: state.persons.concat(person)
    };
  }),
  on(deletePerson, (state, action) => ({
    ...state,
    persons: state.persons.filter(p => p.id !== action.id)
  })),
  on(beginEditPerson, (state, action) => ({
    ...state,
    currentPerson: action.person
  })),
  on(finishEditPerson, (state, action) => ({
    ...state,
    currentPerson: null,
    persons: state.persons.filter(p => p.id !== action.id)
      .concat(action.person)
  })),
  on(loadTodosSuccess, (state, action) => ({
    ...state,
    todos: action.todos
  })),
  on(loadTodosError, (state, action) => ({
    ...state,
    error: action.error
  }))
);

export const reducers: ActionReducerMap<RootState> = {
  app: appReducer
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
