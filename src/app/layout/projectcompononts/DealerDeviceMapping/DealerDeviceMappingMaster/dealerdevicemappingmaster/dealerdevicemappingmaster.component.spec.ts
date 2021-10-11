import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerdevicemappingmasterComponent } from './dealerdevicemappingmaster.component';

describe('DealerdevicemappingmasterComponent', () => {
  let component: DealerdevicemappingmasterComponent;
  let fixture: ComponentFixture<DealerdevicemappingmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerdevicemappingmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerdevicemappingmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
