import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailLostComponent } from './item-detail-lost.component';

describe('ItemDetailLostComponent', () => {
  let component: ItemDetailLostComponent;
  let fixture: ComponentFixture<ItemDetailLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
