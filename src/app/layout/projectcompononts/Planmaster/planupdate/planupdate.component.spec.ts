import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanupdateComponent } from './planupdate.component';

describe('PlanupdateComponent', () => {
  let component: PlanupdateComponent;
  let fixture: ComponentFixture<PlanupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
