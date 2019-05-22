import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGiftOrderComponent } from './user-gift-order.component';

describe('UserGiftOrderComponent', () => {
  let component: UserGiftOrderComponent;
  let fixture: ComponentFixture<UserGiftOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGiftOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGiftOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
