import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemsLostComponent } from './view-items-lost.component';

describe('ViewItemsLostComponent', () => {
  let component: ViewItemsLostComponent;
  let fixture: ComponentFixture<ViewItemsLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewItemsLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItemsLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
