import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-visiteur',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './layout-visiteur.html',
  styleUrl: './layout-visiteur.css'
})
export class LayoutVisiteurComponent {
  readonly annee = new Date().getFullYear();
}
