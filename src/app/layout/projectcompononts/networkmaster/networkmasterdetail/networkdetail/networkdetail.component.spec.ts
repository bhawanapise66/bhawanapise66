import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkdetailComponent } from './networkdetail.component';

describe('NetworkdetailComponent', () => {
  let component: NetworkdetailComponent;
  let fixture: ComponentFixture<NetworkdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
