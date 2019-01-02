import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewItemLostComponent } from './form-new-item-lost.component';

describe('FormNewItemLostComponent', () => {
  let component: FormNewItemLostComponent;
  let fixture: ComponentFixture<FormNewItemLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewItemLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewItemLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
