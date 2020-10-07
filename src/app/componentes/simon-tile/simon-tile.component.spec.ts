import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimonTileComponent } from './simon-tile.component';

describe('SimonTileComponent', () => {
  let component: SimonTileComponent;
  let fixture: ComponentFixture<SimonTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimonTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimonTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
