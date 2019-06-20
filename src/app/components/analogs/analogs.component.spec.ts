import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalogsComponent} from './analogs.component';

describe('AnalogsComponent', () => {
  let component: AnalogsComponent;
  let fixture: ComponentFixture<AnalogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
