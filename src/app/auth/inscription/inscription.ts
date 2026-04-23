import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthentificationService } from '../../core/services/authentification.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css'
})
export class InscriptionComponent {
  nom = '';
  email = '';
  motDePasse = '';
  confirmation = '';
  erreur = '';
  chargement = false;

  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) {}

  sInscrire() {
    if (this.motDePasse !== this.confirmation) {
      this.erreur = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.chargement = true;
    this.erreur = '';

    this.authService.inscription(this.nom, this.email, this.motDePasse, this.confirmation).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        // Après inscription, on est un visiteur par défaut
        this.router.navigate(['/visiteur/grille']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.erreur = 'Erreur lors de l\'inscription. Vérifiez vos informations.';
        this.chargement = false;
      }
    });
  }
}
