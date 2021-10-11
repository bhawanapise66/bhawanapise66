import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionlogComponent } from './transactionlog.component';

describe('TransactionlogComponent', () => {
  let component: TransactionlogComponent;
  let fixture: ComponentFixture<TransactionlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
