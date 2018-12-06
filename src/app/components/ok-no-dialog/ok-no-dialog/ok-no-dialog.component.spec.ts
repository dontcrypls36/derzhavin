import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OkNoDialogComponent } from './ok-no-dialog.component';

describe('OkNoDialogComponent', () => {
  let component: OkNoDialogComponent;
  let fixture: ComponentFixture<OkNoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkNoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkNoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
