import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthentificationService } from '../../../core/services/authentification.service';

@Component({
  selector: 'app-barre-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './barre-navigation.html',
  styleUrl: './barre-navigation.css'
})
export class BarreNavigationComponent {
  constructor(private authService: AuthentificationService) {}

  get estConnecte(): boolean {
    return this.authService.estConnecte();
  }

  deconnexion() {
    this.authService.deconnexion();
  }
}
