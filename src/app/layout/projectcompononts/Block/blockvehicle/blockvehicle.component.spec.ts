import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockvehicleComponent } from './blockvehicle.component';

describe('BlockvehicleComponent', () => {
  let component: BlockvehicleComponent;
  let fixture: ComponentFixture<BlockvehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockvehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
