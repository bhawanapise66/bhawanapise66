import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeldetailsComponent } from './modeldetails.component';

describe('ModeldetailsComponent', () => {
  let component: ModeldetailsComponent;
  let fixture: ComponentFixture<ModeldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
