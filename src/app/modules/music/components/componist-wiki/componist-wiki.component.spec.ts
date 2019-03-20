import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponistWikiComponent } from './componist-wiki.component';

describe('ComponistWikiComponent', () => {
  let component: ComponistWikiComponent;
  let fixture: ComponentFixture<ComponistWikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponistWikiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponistWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
