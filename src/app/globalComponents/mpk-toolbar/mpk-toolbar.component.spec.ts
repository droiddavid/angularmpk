import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpkToolbarComponent } from './mpk-toolbar.component';

describe('MpkToolbarComponent', () => {
  let component: MpkToolbarComponent;
  let fixture: ComponentFixture<MpkToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpkToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpkToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
