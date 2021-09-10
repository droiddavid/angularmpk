import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpkFooterComponent } from './mpk-footer.component';

describe('MpkFooterComponent', () => {
  let component: MpkFooterComponent;
  let fixture: ComponentFixture<MpkFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpkFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpkFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
