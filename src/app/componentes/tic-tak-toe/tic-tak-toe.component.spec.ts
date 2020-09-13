import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTakToeComponent } from './tic-tak-toe.component';

describe('TicTakToeComponent', () => {
  let component: TicTakToeComponent;
  let fixture: ComponentFixture<TicTakToeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicTakToeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTakToeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
