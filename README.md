### Journal Local Web & 100% Privé
Journal Local est une application web moderne, légère et entièrement sécurisée, conçue pour vous offrir un espace d'écriture intime sans compromis sur la confidentialité. Sans création de compte ni serveur distant, vos réflexions et vos notes personnelles restent physiquement stockées sur votre appareil.
https://fannyltd.github.io/JournalLocal/

## Fonctionnalités
# Confidentialité Totale (Stockage 100% Local)

Aucune donnée ne quitte votre ordinateur. L'application utilise les capacités de stockage local du navigateur (localStorage), garantissant zéro serveur externe, zéro cookie publicitaire et zéro traçage.

# Verrouillage par Code PIN (Hachage & Salage)

Protection renforcée contre les regards indiscrets : l'accès au journal peut être verrouillé par un code PIN à 4 chiffres. Le code est sécurisé localement grâce à une méthode de hachage avec sel (Hash + Salt), empêchant toute lecture directe du code PIN en clair dans la mémoire du navigateur. Attention : cela reste une protection basique, pas de chiffrement fort. Les notes en elles-mêmes ne sont pas chiffrés sur le disque, seul l'accès à l'interface l'est.

# Bilingue (Français & Anglais)

Interface multilingue fluide basée sur un dictionnaire de traduction personnalisé. Basculez d'une langue à l'autre en un seul clic sans recharger la page.

# Exportation & Importation JSON

Gardez le contrôle total sur vos données. Exportez facilement l'intégralité de vos écrits dans un fichier .json pour effectuer une sauvegarde de sécurité ou transférer vos notes vers un autre appareil. La fonction d'importation permet de restaurer une ancienne sauvegarde sans écraser vos données existantes.

 Design

Une interface raffinée déclinée autour d'une palette aux tons bordeaux, rose vif et accents dorés/bronze, pensée pour offrir une expérience d'écriture fluide.

## Stack Technique
HTML5 — Structure sémantique et accessible.

CSS3 — Architecture basée sur les variables CSS (:root), Flexbox/Grid et une mise en page entièrement responsive.

JavaScript (ES6+) — Logique applicative Vanilla (sans framework externe) :

Gestion du localStorage pour la persistance des données.

Hachage cryptographique du PIN avec sel pour la sécurité locale.

Manipulation dynamique du DOM .

API Web (File, FileReader, Blob, URL.createObjectURL) pour l'import/export de fichiers JSON.

## Structure du Projet

```text
personal-diary/
├── index.html        # Structure de l'application et des différentes vues
├── style.css         # Charte graphique, animations et styles adaptatifs
├── app.js            # Logique principale (stockage, PIN, export/import)
└── README.md         # Informations
