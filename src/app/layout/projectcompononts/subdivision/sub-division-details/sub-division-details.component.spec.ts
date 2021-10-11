import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDivisionDetailsComponent } from './sub-division-details.component';

describe('SubDivisionDetailsComponent', () => {
  let component: SubDivisionDetailsComponent;
  let fixture: ComponentFixture<SubDivisionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubDivisionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDivisionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
