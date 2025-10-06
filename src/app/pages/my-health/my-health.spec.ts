import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHealthComponent } from './my-health';

describe('MyHealth', () => {
  let component: MyHealthComponent;
  let fixture: ComponentFixture<MyHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyHealthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
