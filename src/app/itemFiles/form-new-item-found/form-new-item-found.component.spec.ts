import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewItemFoundComponent } from './form-new-item-found.component';

describe('FormNewItemFoundComponent', () => {
  let component: FormNewItemFoundComponent;
  let fixture: ComponentFixture<FormNewItemFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewItemFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewItemFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
