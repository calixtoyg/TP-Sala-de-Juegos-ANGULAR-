import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuCardPrincipalComponent} from './menu-card-principal.component';

describe('MenuCardPrincipalComponent', () => {
  let component: MenuCardPrincipalComponent;
  let fixture: ComponentFixture<MenuCardPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCardPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCardPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
