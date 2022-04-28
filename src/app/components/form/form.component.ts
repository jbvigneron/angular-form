import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { Role } from 'src/app/models/role';
import { PersonsService } from '../../services/persons.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  form: FormGroup;
  promos = ['L1', 'L2', 'L3', 'M1', 'M2'];
  mode: 'ADD' | 'EDIT';

  constructor(fb: FormBuilder, private readonly personsService: PersonsService) {
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

    this.personsService.onEdit.subscribe((person: Person) => {
      this.mode = 'EDIT';
      this.form.patchValue(person);
    });

    this.personsService.onDelete.subscribe(() => this.form.reset());
  }

  onSubmit() {
    const person = this.form.value as Person;

    if (this.mode == 'ADD') {
      this.personsService.add(person);
    } else if (this.mode == 'EDIT') {
      this.personsService.finishEdit(person);
    }

    this.mode = 'ADD';
    this.form.reset();
  }
}
