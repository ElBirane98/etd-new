import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { TableauDeBordComponent } from './tableau-de-bord';

describe('TableauDeBordComponent', () => {
  let component: TableauDeBordComponent;
  let fixture: ComponentFixture<TableauDeBordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauDeBordComponent],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauDeBordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
