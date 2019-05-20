import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftDescriptionComponent } from './gift-description.component';

describe('GiftDescriptionComponent', () => {
  let component: GiftDescriptionComponent;
  let fixture: ComponentFixture<GiftDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
