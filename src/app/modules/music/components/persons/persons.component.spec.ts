import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsComponent } from './persons.component';
import {MockPipe} from '../../../../../test-helpers/mock-pipe';
import {MatModule} from '../../../mat/mat.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('PersonsComponent', () => {
  let component: PersonsComponent;
  let fixture: ComponentFixture<PersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [
        PersonsComponent,
        MockPipe,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
