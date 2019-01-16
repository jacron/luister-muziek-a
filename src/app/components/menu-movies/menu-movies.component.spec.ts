import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMoviesComponent } from './menu-movies.component';
import {MatModule} from '../../modules/mat/mat.module';

describe('MenuMoviesComponent', () => {
  let component: MenuMoviesComponent;
  let fixture: ComponentFixture<MenuMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatModule
      ],
      declarations: [ MenuMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
