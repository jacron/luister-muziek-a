import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsComponent } from './tools.component';
import {MatAutocompleteModule} from '@angular/material';
import {MusicService} from '../services/music.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

describe('ToolsComponent', () => {
  let component: ToolsComponent;
  let fixture: ComponentFixture<ToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsComponent ],
      imports: [ MatAutocompleteModule, HttpClientModule, FormsModule],
      providers: [MusicService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
