import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ListeEnseignantsComponent } from './liste-enseignants';

describe('ListeEnseignantsComponent', () => {
  let component: ListeEnseignantsComponent;
  let fixture: ComponentFixture<ListeEnseignantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeEnseignantsComponent],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeEnseignantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
