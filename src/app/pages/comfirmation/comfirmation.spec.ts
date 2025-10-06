import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmationComponent } from './comfirmation';

describe('Comfirmation', () => {
  let component: ComfirmationComponent;
  let fixture: ComponentFixture<ComfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
