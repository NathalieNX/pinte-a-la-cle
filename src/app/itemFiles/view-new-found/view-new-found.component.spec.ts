import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewFoundComponent } from './view-new-found.component';

describe('ViewNewFoundComponent', () => {
  let component: ViewNewFoundComponent;
  let fixture: ComponentFixture<ViewNewFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNewFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
