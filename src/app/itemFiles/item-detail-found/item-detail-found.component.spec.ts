import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailFoundComponent } from './item-detail-found.component';

describe('ItemDetailFoundComponent', () => {
  let component: ItemDetailFoundComponent;
  let fixture: ComponentFixture<ItemDetailFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
