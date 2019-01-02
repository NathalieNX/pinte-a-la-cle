import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModifyFoundComponent } from './view-modify-found.component';

describe('ViewModifyFoundComponent', () => {
  let component: ViewModifyFoundComponent;
  let fixture: ComponentFixture<ViewModifyFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewModifyFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModifyFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
