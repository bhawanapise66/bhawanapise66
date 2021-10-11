import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipmasterEntryComponent } from './tipmaster-entry.component';

describe('TipmasterEntryComponent', () => {
  let component: TipmasterEntryComponent;
  let fixture: ComponentFixture<TipmasterEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipmasterEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipmasterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
