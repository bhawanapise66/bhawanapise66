import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcondetailsComponent } from './icondetails.component';

describe('IcondetailsComponent', () => {
  let component: IcondetailsComponent;
  let fixture: ComponentFixture<IcondetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcondetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
