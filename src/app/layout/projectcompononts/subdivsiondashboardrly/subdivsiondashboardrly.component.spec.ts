import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivsiondashboardrlyComponent } from './subdivsiondashboardrly.component';

describe('SubdivsiondashboardrlyComponent', () => {
  let component: SubdivsiondashboardrlyComponent;
  let fixture: ComponentFixture<SubdivsiondashboardrlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdivsiondashboardrlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivsiondashboardrlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
