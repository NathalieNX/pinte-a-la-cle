import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModifyItemFoundComponent } from './form-modify-item-found.component';

describe('FormModifyItemFoundComponent', () => {
  let component: FormModifyItemFoundComponent;
  let fixture: ComponentFixture<FormModifyItemFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModifyItemFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModifyItemFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
