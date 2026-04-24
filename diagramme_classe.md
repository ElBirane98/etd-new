# Diagramme de Classe - Système SamaPlan

Ce diagramme illustre les relations entre les principales entités du système de gestion d'emploi du temps.

```mermaid
classDiagram
    class User {
        +int id
        +string name
        +string email
        +string role
        +string password
    }

    class Departement {
        +int id
        +string nom
        +string code
    }

    class Filiere {
        +int id
        +string nom
        +int departement_id
    }

    class Niveau {
        +int id
        +string nom
        +string niveau
        +int departement_id
    }

    class Professeur {
        +int id
        +string nom
        +string prenom
        +string specialite
        +string grade
        +int departement_id
    }

    class Salle {
        +int id
        +string nom
        +int capacite
        +string type
        +boolean disponible
    }

    class Cours {
        +int id
        +string nom
        +string code
        +int credits
        +int volume_horaire
        +int niveau_id
        +int filiere_id
        +int professeur_id
    }

    class CreneauHoraire {
        +int id
        +string jour
        +time debut
        +time fin
    }

    class Seance {
        +int id
        +string type
        +int annee
        +int numero_debut_semaine
        +int numero_fin_semaine
        +int cour_id
        +int professeur_id
        +int salle_id
        +int creneau_horaire_id
    }

    Departement "1" -- "*" Filiere : contient
    Departement "1" -- "*" Professeur : emploie
    Departement "1" -- "*" Niveau : gère
    
    Niveau "1" -- "*" Cours : possède
    Filiere "1" -- "*" Cours : inclut
    Professeur "1" -- "*" Cours : enseigne
    
    Seance "*" -- "1" Cours : appartient à
    Seance "*" -- "1" Professeur : dispensée par
    Seance "*" -- "1" Salle : se déroule dans
    Seance "*" -- "1" CreneauHoraire : planifiée sur
```

### Description des relations clés :
1.  **Cœur du système (Séance) :** La `Seance` est l'entité centrale qui lie un `Cours`, un `Professeur`, une `Salle` et un `CreneauHoraire`. C'est ici que les conflits sont vérifiés.
2.  **Structure Académique :** Le `Departement` est la racine qui regroupe les enseignants, les filières et les niveaux (classes).
3.  **Planification :** Les `CreneauHoraire` définissent les plages disponibles (ex: Lundi 08h-10h) qui peuvent être réutilisées par plusieurs séances de différentes classes/salles.
