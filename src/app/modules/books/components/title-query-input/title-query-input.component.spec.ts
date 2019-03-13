import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleQueryInputComponent } from './title-query-input.component';

describe('TitleQueryInputComponent', () => {
  let component: TitleQueryInputComponent;
  let fixture: ComponentFixture<TitleQueryInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleQueryInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleQueryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
