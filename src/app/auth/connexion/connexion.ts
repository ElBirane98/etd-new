import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthentificationService } from '../../core/services/authentification.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css'
})
export class ConnexionComponent {
  email = '';
  motDePasse = '';
  erreur = '';
  chargement = false;
  afficherMDP = false;

  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) {}

  seConnecter() {
    this.chargement = true;
    this.erreur = '';

    // Mode démo : connexion directe sans API
    const emailsDemo = ['admin@ugb.edu.sn', 'admin', ''];
    const mdpDemo    = ['admin123', 'admin', ''];

    if (emailsDemo.includes(this.email) || mdpDemo.includes(this.motDePasse) || this.email.length > 0) {
      setTimeout(() => {
        localStorage.setItem('token', 'demo-token-2026');
        this.router.navigate(['/admin/tableau-de-bord']);
      }, 800);
      return;
    }

    this.authService.connexion(this.email, this.motDePasse).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/admin/tableau-de-bord']);
      },
      error: () => {
        this.erreur = 'Email ou mot de passe incorrect.';
        this.chargement = false;
      }
    });
  }
}
