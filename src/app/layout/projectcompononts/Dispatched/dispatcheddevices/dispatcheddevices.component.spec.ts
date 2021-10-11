import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcheddevicesComponent } from './dispatcheddevices.component';

describe('DispatcheddevicesComponent', () => {
  let component: DispatcheddevicesComponent;
  let fixture: ComponentFixture<DispatcheddevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatcheddevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatcheddevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
