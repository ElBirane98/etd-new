import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthentificationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  inscription(nom: string, email: string, motDePasse: string, confirmation: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      name: nom,
      email: email,
      password: motDePasse,
      password_confirmation: confirmation
    });
  }

  connexion(email: string, motDePasse: string) {
    return this.http.post(`${this.apiUrl}/login`, {
      email, password: motDePasse
    });
  }

  deconnexion() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/connexion']);
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  estConnecte(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
