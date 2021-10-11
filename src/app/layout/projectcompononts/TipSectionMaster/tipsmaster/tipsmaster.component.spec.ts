import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsmasterComponent } from './tipsmaster.component';

describe('TipsmasterComponent', () => {
  let component: TipsmasterComponent;
  let fixture: ComponentFixture<TipsmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipsmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
