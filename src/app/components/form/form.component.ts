import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { Role } from 'src/app/models/role';
import { Store } from '@ngrx/store';
import { partition } from 'rxjs';
import { RootState } from '../../reducers';
import { addPerson, finishEditPerson } from '../../actions/persons.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  form: FormGroup;
  promos = ['L1', 'L2', 'L3', 'M1', 'M2'];
  mode: 'ADD' | 'EDIT';

  constructor(fb: FormBuilder,
    private readonly store: Store<RootState>) {
    this.form = fb.group({
      id: [null],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      role: ['', Validators.required],
      promotion: [null]
    });

    this.form.controls.role.valueChanges.subscribe((role: Role) => {
      const promotionControl = this.form.controls.promotion;
      promotionControl.clearValidators();

      if (role === Role.Etudiant) {
        promotionControl.setValidators(Validators.required);
      } else if (role === Role.Intervenant) {
        promotionControl.setValue(null);
      }

      promotionControl.updateValueAndValidity();
    });

    this.mode = 'ADD';

    const [onEdit$, onDelete$] = partition(
      this.store.select(s => s.app.currentPerson), (person: Person) => !!person
    );

    onEdit$.subscribe(person => {
      this.mode = 'EDIT';
      this.form.patchValue(person);
    });

    onDelete$.subscribe(() => this.form.reset());
  }

  onSubmit() {
    const person = this.form.value as Person;

    if (this.mode == 'ADD') {
      this.store.dispatch(addPerson({ person }));
    } else if (this.mode == 'EDIT') {
      this.store.dispatch(finishEditPerson({ person }));
    }

    this.mode = 'ADD';
    this.form.reset();
  }
}
