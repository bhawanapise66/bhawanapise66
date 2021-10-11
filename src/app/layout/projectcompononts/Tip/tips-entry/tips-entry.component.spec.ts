import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsEntryComponent } from './tips-entry.component';

describe('TipsEntryComponent', () => {
  let component: TipsEntryComponent;
  let fixture: ComponentFixture<TipsEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipsEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
