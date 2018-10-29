import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewLostComponent } from './view-new-lost.component';

describe('ViewNewLostComponent', () => {
  let component: ViewNewLostComponent;
  let fixture: ComponentFixture<ViewNewLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNewLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
