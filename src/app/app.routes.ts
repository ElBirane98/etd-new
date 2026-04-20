import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirection racine
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },

  // Connexion (sans layout)
  {
    path: 'connexion',
    loadComponent: () =>
      import('./auth/connexion/connexion').then(m => m.ConnexionComponent)
  },

  // Espace Visiteur (sans sidebar admin)
  {
    path: 'visiteur',
    loadComponent: () =>
      import('./shared/composants/layout-visiteur/layout-visiteur').then(m => m.LayoutVisiteurComponent),
    children: [
      {
        path: 'grille',
        loadComponent: () =>
          import('./features/visiteur/grille-edt/grille-emploi-du-temps').then(m => m.GrilleEdtComponent)
      },
      { path: '', redirectTo: 'grille', pathMatch: 'full' }
    ]
  },

  // Espace Admin (avec layout sidebar)
  {
    path: 'admin',
    loadComponent: () =>
      import('./shared/composants/layout-admin/layout-admin').then(m => m.LayoutAdminComponent),
    children: [
      {
        path: 'tableau-de-bord',
        loadComponent: () =>
          import('./features/admin/tableau-de-bord/tableau-de-bord').then(m => m.TableauDeBordComponent)
      },
      {
        path: 'grille-edt',
        loadComponent: () =>
          import('./features/admin/grille-edt-admin/grille-edt-admin').then(m => m.GrilleEdtAdminComponent)
      },
      {
        path: 'formulaire-seance',
        loadComponent: () =>
          import('./features/admin/formulaire-seance/formulaire-seance').then(m => m.FormulaireSeanceComponent)
      },
      {
        path: 'formulaire-seance/:id',
        loadComponent: () =>
          import('./features/admin/formulaire-seance/formulaire-seance').then(m => m.FormulaireSeanceComponent)
      },
      {
        path: 'liste-seances',
        loadComponent: () =>
          import('./features/admin/liste-seances/liste-seances').then(m => m.ListeSeancesComponent)
      },
      {
        path: 'liste-cours',
        loadComponent: () =>
          import('./features/admin/liste-cours/liste-cours').then(m => m.ListeCoursComponent)
      },
      {
        path: 'liste-enseignants',
        loadComponent: () =>
          import('./features/admin/liste-enseignants/liste-enseignants').then(m => m.ListeEnseignantsComponent)
      },
      {
        path: 'liste-salles',
        loadComponent: () =>
          import('./features/admin/liste-salles/liste-salles').then(m => m.ListeSallesComponent)
      },
      {
        path: 'liste-classes',
        loadComponent: () =>
          import('./features/admin/liste-classes/liste-classes').then(m => m.ListeClassesComponent)
      },
      {
        path: 'liste-departements',
        loadComponent: () =>
          import('./features/admin/liste-departements/liste-departements').then(m => m.ListeDepartementsComponent)
      },
      {
        path: 'liste-filieres',
        loadComponent: () =>
          import('./features/admin/liste-filieres/liste-filieres').then(m => m.ListeFilieresComponent)
      },
      { path: '', redirectTo: 'tableau-de-bord', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'connexion' }
];
