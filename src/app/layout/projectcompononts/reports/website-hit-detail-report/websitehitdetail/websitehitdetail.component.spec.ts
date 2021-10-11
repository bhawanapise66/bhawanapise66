import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitehitdetailComponent } from './websitehitdetail.component';

describe('WebsitehitdetailComponent', () => {
  let component: WebsitehitdetailComponent;
  let fixture: ComponentFixture<WebsitehitdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsitehitdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsitehitdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
