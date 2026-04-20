import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanneauFiltres } from './panneau-filtres';

describe('PanneauFiltres', () => {
  let component: PanneauFiltres;
  let fixture: ComponentFixture<PanneauFiltres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanneauFiltres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanneauFiltres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
