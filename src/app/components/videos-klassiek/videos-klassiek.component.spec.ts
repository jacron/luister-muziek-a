import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosKlassiekComponent } from './videos-klassiek.component';

describe('VideosKlassiekComponent', () => {
  let component: VideosKlassiekComponent;
  let fixture: ComponentFixture<VideosKlassiekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosKlassiekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosKlassiekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
