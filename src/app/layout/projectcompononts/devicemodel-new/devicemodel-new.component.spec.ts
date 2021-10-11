import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicemodelNewComponent } from './devicemodel-new.component';

describe('DevicemodelNewComponent', () => {
  let component: DevicemodelNewComponent;
  let fixture: ComponentFixture<DevicemodelNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicemodelNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicemodelNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
