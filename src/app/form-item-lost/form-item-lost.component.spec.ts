import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemLostComponent } from './form-item-lost.component';

describe('FormItemLostComponent', () => {
  let component: FormItemLostComponent;
  let fixture: ComponentFixture<FormItemLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
