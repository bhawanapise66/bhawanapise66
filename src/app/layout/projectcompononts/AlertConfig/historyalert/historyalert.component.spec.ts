import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryalertComponent } from './historyalert.component';

describe('HistoryalertComponent', () => {
  let component: HistoryalertComponent;
  let fixture: ComponentFixture<HistoryalertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryalertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
