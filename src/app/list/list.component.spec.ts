import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { RolePipe } from '../role.pipe';
import { PromotionPipe } from '../promotion.pipe';
import { Person } from '../models/person';
import { PersonsService } from '../persons.service';

fdescribe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  const personService: Partial<PersonsService> = {
    getPersons: jasmine.createSpy('getPersons'),
    deletePerson: jasmine.createSpy('deletePerson')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent, RolePipe, PromotionPipe ],
      providers: [
        { provide: PersonsService, useValue: personService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should use delete method from service', () => {
    // Arrange
    const person: Person = {
      id: 1,
      lastname: 'Vigneron',
      firstName: 'Jean-Baptiste',
      role: 'I'
    };

    // Act
    component.delete(person);

    // Assert
    expect(personService.deletePerson).toHaveBeenCalledWith(person.id);
  });
});
