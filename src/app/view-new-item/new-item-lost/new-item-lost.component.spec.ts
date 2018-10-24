import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemLostComponent } from './new-item-lost.component';

describe('NewItemLostComponent', () => {
  let component: NewItemLostComponent;
  let fixture: ComponentFixture<NewItemLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewItemLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
