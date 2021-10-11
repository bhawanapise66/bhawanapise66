import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashboardrlyComponent } from './admindashboardrly.component';

describe('AdmindashboardrlyComponent', () => {
  let component: AdmindashboardrlyComponent;
  let fixture: ComponentFixture<AdmindashboardrlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmindashboardrlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindashboardrlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
