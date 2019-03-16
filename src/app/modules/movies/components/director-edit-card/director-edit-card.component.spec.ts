import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorEditCardComponent } from './director-edit-card.component';

describe('DirectorEditCardComponent', () => {
  let component: DirectorEditCardComponent;
  let fixture: ComponentFixture<DirectorEditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorEditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
