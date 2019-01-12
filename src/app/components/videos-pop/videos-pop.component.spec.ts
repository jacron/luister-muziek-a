import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosPopComponent } from './videos-pop.component';

describe('VideosPopComponent', () => {
  let component: VideosPopComponent;
  let fixture: ComponentFixture<VideosPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
