import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApsacdashboardComponent } from './apsacdashboard.component';

describe('ApsacdashboardComponent', () => {
  let component: ApsacdashboardComponent;
  let fixture: ComponentFixture<ApsacdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApsacdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApsacdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
