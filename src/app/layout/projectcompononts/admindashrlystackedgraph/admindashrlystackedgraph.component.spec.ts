import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashrlystackedgraphComponent } from './admindashrlystackedgraph.component';

describe('AdmindashrlystackedgraphComponent', () => {
  let component: AdmindashrlystackedgraphComponent;
  let fixture: ComponentFixture<AdmindashrlystackedgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmindashrlystackedgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindashrlystackedgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
