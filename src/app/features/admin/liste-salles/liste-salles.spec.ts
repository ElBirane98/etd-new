import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ListeSallesComponent } from './liste-salles';

describe('ListeSallesComponent', () => {
  let component: ListeSallesComponent;
  let fixture: ComponentFixture<ListeSallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeSallesComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeSallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
