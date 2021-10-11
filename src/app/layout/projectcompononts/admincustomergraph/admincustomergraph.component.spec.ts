import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincustomergraphComponent } from './admincustomergraph.component';

describe('AdmincustomergraphComponent', () => {
  let component: AdmincustomergraphComponent;
  let fixture: ComponentFixture<AdmincustomergraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincustomergraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincustomergraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
