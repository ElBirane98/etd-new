import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthentificationService } from '../../../core/services/authentification.service';

interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: NavItem[];
  expanded?: boolean;
}

import { NotificationService, Notification } from '../../../core/services/notification.service';
import { NotificationComponent } from '../notification/notification';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterOutlet, NotificationComponent],
  templateUrl: './layout-admin.html',
  styleUrl: './layout-admin.css'
})

export class LayoutAdminComponent {
  readonly annee = new Date().getFullYear();
  afficherNotifications = false;

  navItems: NavItem[] = [
    { label: 'Tableau de bord', icon: 'bi-speedometer2', route: '/admin/tableau-de-bord' },
    { label: 'Emploi du Temps',  icon: 'bi-calendar3',   route: '/admin/grille-edt' },
    {
      label: 'Séances', icon: 'bi-calendar-plus', expanded: false,
      children: [
        { label: 'Créer une séance',  icon: 'bi-plus-circle',      route: '/admin/formulaire-seance' },
        { label: 'Liste des séances', icon: 'bi-list-ul',         route: '/admin/liste-seances' },
      ]
    },
    { label: 'Enseignants', icon: 'bi-person-badge',   route: '/admin/liste-enseignants' },
    { label: 'Cours',       icon: 'bi-book-half',      route: '/admin/liste-cours' },
    { label: 'Salles',      icon: 'bi-door-open',      route: '/admin/liste-salles' },
    { label: 'Classes',     icon: 'bi-diagram-3',      route: '/admin/liste-classes' },
    { label: 'Départements',icon: 'bi-building',       route: '/admin/liste-departements' },
    { label: 'Filières',    icon: 'bi-mortarboard',    route: '/admin/liste-filieres' },
    { label: 'Créneaux Horaires', icon: 'bi-clock-history', route: '/admin/liste-creneaux' },
  ];


  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  get notifications(): Notification[] {
    return this.notificationService.getHistory();
  }

  get nbNotifications(): number {
    return this.notifications.length;
  }

  toggleNotifications() {
    this.afficherNotifications = !this.afficherNotifications;
  }

  clearNotifications() {
    this.notificationService.clearHistory();
    this.afficherNotifications = false;
  }

  get nomUtilisateur(): string {
    const user = this.authService.getUser();
    return user ? user.name : 'Administrateur';
  }

  get initialesUtilisateur(): string {
    const name = this.nomUtilisateur;
    return name ? name.charAt(0).toUpperCase() : 'A';
  }

  toggleSubmenu(item: NavItem) {
    item.expanded = !item.expanded;
  }

  deconnexion() {
    this.authService.deconnexion();
  }
}
