import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicalinstallationComponent } from './vehicalinstallation.component';

describe('VehicalinstallationComponent', () => {
  let component: VehicalinstallationComponent;
  let fixture: ComponentFixture<VehicalinstallationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicalinstallationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicalinstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
