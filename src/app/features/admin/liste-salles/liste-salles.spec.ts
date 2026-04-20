import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSalles } from './liste-salles';

describe('ListeSalles', () => {
  let component: ListeSalles;
  let fixture: ComponentFixture<ListeSalles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeSalles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeSalles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
