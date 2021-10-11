import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquecomplaintComponent } from './uniquecomplaint.component';

describe('UniquecomplaintComponent', () => {
  let component: UniquecomplaintComponent;
  let fixture: ComponentFixture<UniquecomplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniquecomplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquecomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
