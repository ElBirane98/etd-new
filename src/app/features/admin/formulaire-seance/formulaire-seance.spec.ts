import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireSeance } from './formulaire-seance';

describe('FormulaireSeance', () => {
  let component: FormulaireSeance;
  let fixture: ComponentFixture<FormulaireSeance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireSeance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireSeance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
