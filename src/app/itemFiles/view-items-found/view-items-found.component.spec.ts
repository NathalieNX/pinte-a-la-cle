import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemsFoundComponent } from './view-items-found.component';

describe('ViewItemsFoundComponent', () => {
  let component: ViewItemsFoundComponent;
  let fixture: ComponentFixture<ViewItemsFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewItemsFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItemsFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
