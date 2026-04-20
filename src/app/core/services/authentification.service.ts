import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthentificationService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  connexion(email: string, motDePasse: string) {
    return this.http.post(`${this.apiUrl}/login`, {
      email, password: motDePasse
    });
  }

  deconnexion() {
    localStorage.removeItem('token');
    this.router.navigate(['/connexion']);
  }

  estConnecte(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
