import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthentificationService } from '../../../core/services/authentification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-visiteur',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './layout-visiteur.html',
  styleUrl: './layout-visiteur.css'
})
export class LayoutVisiteurComponent {
  readonly annee = new Date().getFullYear();

  constructor(public authService: AuthentificationService) {}

  deconnexion() {
    this.authService.deconnexion();
  }
}
