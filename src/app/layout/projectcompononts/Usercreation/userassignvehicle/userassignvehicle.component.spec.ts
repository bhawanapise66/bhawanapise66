import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserassignvehicleComponent } from './userassignvehicle.component';

describe('UserassignvehicleComponent', () => {
  let component: UserassignvehicleComponent;
  let fixture: ComponentFixture<UserassignvehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserassignvehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserassignvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
