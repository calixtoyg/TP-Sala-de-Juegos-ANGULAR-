import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimonBoardComponent } from './simon-board.component';

describe('SimonBoardComponent', () => {
  let component: SimonBoardComponent;
  let fixture: ComponentFixture<SimonBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimonBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimonBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
