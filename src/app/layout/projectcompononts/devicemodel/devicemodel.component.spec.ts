import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicemodelComponent } from './devicemodel.component';

describe('DevicemodelComponent', () => {
  let component: DevicemodelComponent;
  let fixture: ComponentFixture<DevicemodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicemodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
