import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { PersonsService } from '../persons.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  form: FormGroup;
  promos = ['L1', 'L2', 'L3', 'M1', 'M2'];
  currentPerson: Person | undefined;

  constructor(fb: FormBuilder, private readonly personsService: PersonsService) {
    this.form = fb.group({
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      role: ['', Validators.required],
      promotion: [null]
    });

    this.form.valueChanges.subscribe(value => {
      const promotion = this.form.controls.promotion;
      promotion.clearValidators();

      if (value.role === 'E') {
        promotion.setValidators(Validators.required);
      } else if (value.role === 'I') {
        value.promotion = null;
      }
    });

    this.personsService.onEdit.subscribe((person: Person) => {
      this.currentPerson = person;
      this.form.patchValue(person);
    });
  }

  onSubmit() {
    const person = this.form.value as Person;

    if (!this.currentPerson) {
      this.personsService.addPerson(person);
    } else {
      this.personsService.finishEditPerson(this.currentPerson.id, person);
    }

    this.currentPerson = null;
    this.form.reset();
  }
}
