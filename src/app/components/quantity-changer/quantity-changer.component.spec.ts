import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityChangerComponent } from './quantity-changer.component';

describe('QuantityChangerComponent', () => {
  let component: QuantityChangerComponent;
  let fixture: ComponentFixture<QuantityChangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityChangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
