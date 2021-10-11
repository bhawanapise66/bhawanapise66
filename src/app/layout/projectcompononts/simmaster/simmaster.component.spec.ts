import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimmasterComponent } from './simmaster.component';

describe('SimmasterComponent', () => {
  let component: SimmasterComponent;
  let fixture: ComponentFixture<SimmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
