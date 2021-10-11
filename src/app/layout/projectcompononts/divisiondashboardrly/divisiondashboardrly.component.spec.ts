import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisiondashboardrlyComponent } from './divisiondashboardrly.component';

describe('DivisiondashboardrlyComponent', () => {
  let component: DivisiondashboardrlyComponent;
  let fixture: ComponentFixture<DivisiondashboardrlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisiondashboardrlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisiondashboardrlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
