import { createAction, props, union } from '@ngrx/store';
import { Person } from '../models/person';

export const addPerson = createAction('Add person', props<{ person: Person }>());
export const deletePerson = createAction('Delete person', props<{ id: number }>());
export const beginEditPerson = createAction('Begin edit person', props<{ person: Person }>());
export const finishEditPerson = createAction('Finish edit person', props<{ id: number, person: Person }>());

export const personsActions = union({
  addPerson,
  deletePerson,
  beginEditPerson,
  finishEditPerson
});
