import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockentryComponent } from './blockentry.component';

describe('BlockentryComponent', () => {
  let component: BlockentryComponent;
  let fixture: ComponentFixture<BlockentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
