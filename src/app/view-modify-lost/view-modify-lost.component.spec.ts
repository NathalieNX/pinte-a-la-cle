import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModifyLostComponent } from './view-modify-lost.component';

describe('ViewModifyLostComponent', () => {
  let component: ViewModifyLostComponent;
  let fixture: ComponentFixture<ViewModifyLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewModifyLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModifyLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
