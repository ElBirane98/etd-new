import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleEmploiDuTemps } from './grille-emploi-du-temps';

describe('GrilleEmploiDuTemps', () => {
  let component: GrilleEmploiDuTemps;
  let fixture: ComponentFixture<GrilleEmploiDuTemps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrilleEmploiDuTemps]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrilleEmploiDuTemps);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
