import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitymasterdetailComponent } from './citymasterdetail.component';

describe('CitymasterdetailComponent', () => {
  let component: CitymasterdetailComponent;
  let fixture: ComponentFixture<CitymasterdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitymasterdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitymasterdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
