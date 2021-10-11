import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindispatchinstalledgraphComponent } from './admindispatchinstalledgraph.component';

describe('AdmindispatchinstalledgraphComponent', () => {
  let component: AdmindispatchinstalledgraphComponent;
  let fixture: ComponentFixture<AdmindispatchinstalledgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmindispatchinstalledgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindispatchinstalledgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
