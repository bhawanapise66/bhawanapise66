import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RailwaydashspeedoComponent } from './railwaydashspeedo.component';

describe('RailwaydashspeedoComponent', () => {
  let component: RailwaydashspeedoComponent;
  let fixture: ComponentFixture<RailwaydashspeedoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RailwaydashspeedoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailwaydashspeedoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
