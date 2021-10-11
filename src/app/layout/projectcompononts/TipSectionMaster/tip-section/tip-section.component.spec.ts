import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipSectionComponent } from './tip-section.component';

describe('TipSectionComponent', () => {
  let component: TipSectionComponent;
  let fixture: ComponentFixture<TipSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
