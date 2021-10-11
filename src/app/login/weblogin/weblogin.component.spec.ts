import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebloginComponent } from './weblogin.component';

describe('WebloginComponent', () => {
  let component: WebloginComponent;
  let fixture: ComponentFixture<WebloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
