import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbar } from '@angular/material/toolbar';
import { MenuPrincipalComponent } from './menu-principal.component';

describe('MenuPrincipalComponent', () => {
  let component: MenuPrincipalComponent;
  let fixture: ComponentFixture<MenuPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
