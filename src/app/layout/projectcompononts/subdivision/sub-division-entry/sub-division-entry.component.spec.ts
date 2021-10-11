import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDivisionEntryComponent } from './sub-division-entry.component';

describe('SubDivisionEntryComponent', () => {
  let component: SubDivisionEntryComponent;
  let fixture: ComponentFixture<SubDivisionEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubDivisionEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDivisionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
