import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModifyItemLostComponent } from './form-modify-item-lost.component';

describe('FormModifyItemLostComponent', () => {
  let component: FormModifyItemLostComponent;
  let fixture: ComponentFixture<FormModifyItemLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModifyItemLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModifyItemLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
