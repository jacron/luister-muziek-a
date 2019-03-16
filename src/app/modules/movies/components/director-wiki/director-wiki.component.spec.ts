import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorWikiComponent } from './director-wiki.component';

describe('DirectorWikiComponent', () => {
  let component: DirectorWikiComponent;
  let fixture: ComponentFixture<DirectorWikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorWikiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
