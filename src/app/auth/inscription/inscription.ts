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
        // Rediriger vers la connexion après inscription
        this.router.navigate(['/connexion']);
      },

      error: (err) => {
        console.error('Registration error:', err);
        this.chargement = false;
        
        if (err.status === 422 && err.error.errors) {
          // Extraire le premier message d'erreur de la validation Laravel
          const firstError = Object.values(err.error.errors)[0] as string[];
          this.erreur = firstError[0];
        } else if (err.error && err.error.error) {
          // Si le backend renvoie un champ 'error' détaillé (notre try-catch)
          this.erreur = err.error.error;
        } else if (err.error && err.error.message) {
          this.erreur = err.error.message;
        } else {
          this.erreur = 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';
        }

      }

    });
  }
}
