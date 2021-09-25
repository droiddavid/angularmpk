import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpkToastComponent } from './mpk-toast.component';

describe('MpkToastComponent', () => {
  let component: MpkToastComponent;
  let fixture: ComponentFixture<MpkToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpkToastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpkToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
