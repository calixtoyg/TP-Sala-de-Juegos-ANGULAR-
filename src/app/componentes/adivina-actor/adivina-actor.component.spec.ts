import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdivinaActorComponent } from './adivina-actor.component';

describe('AdivinaActorComponent', () => {
  let component: AdivinaActorComponent;
  let fixture: ComponentFixture<AdivinaActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdivinaActorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdivinaActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
