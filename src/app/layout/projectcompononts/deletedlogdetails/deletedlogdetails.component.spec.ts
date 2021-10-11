import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedlogdetailsComponent } from './deletedlogdetails.component';

describe('DeletedlogdetailsComponent', () => {
  let component: DeletedlogdetailsComponent;
  let fixture: ComponentFixture<DeletedlogdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedlogdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedlogdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
