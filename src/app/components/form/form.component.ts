import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { RootState } from '../../reducers';
import { addPerson, finishEditPerson } from '../../actions/persons.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  form: FormGroup;
  promos = ['L1', 'L2', 'L3', 'M1', 'M2'];
  currentPersonId: number | undefined;

  constructor(fb: FormBuilder,
    private readonly store: Store<RootState>) {
    this.form = fb.group({
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      role: ['', Validators.required],
      promotion: [null]
    });

    this.form.controls.role.valueChanges.subscribe(role => {
      const promotionControl = this.form.controls.promotion;
      promotionControl.clearValidators();

      if (role === 'E') {
        promotionControl.setValidators(Validators.required);
      } else if (role === 'I') {
        promotionControl.setValue(null);
      }

      promotionControl.updateValueAndValidity();
    });

    this.store.select(s => s.app.currentPerson).pipe(
      filter(person => !!person)
    ).subscribe(person => {
      this.currentPersonId = person.id;
      this.form.patchValue(person);
    });
  }

  onSubmit() {
    const person = this.form.value as Person;

    if (!this.currentPersonId) {
      this.store.dispatch(addPerson({ person }));
    } else {
      this.store.dispatch(finishEditPerson({ id: this.currentPersonId, person }));
    }

    this.form.reset();
  }
}
