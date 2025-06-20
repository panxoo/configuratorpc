# 🖥️ API Configurateur de PC

Bienvenue dans l'API du **Configurateur de PC** — une API RESTful construite avec **Express.js** et **MongoDB** permettant la gestion des utilisateurs, des configurations de PC, des composants matériels, des partenaires, des paramètres et des prix associés.

---

## 📌 Description

Cette API permet de :

- Authentifier les utilisateurs avec JWT
- Gérer les comptes utilisateurs (création, mise à jour, suppression)
- Créer et modifier des configurations personnalisées de PC
- Gérer les composants matériels (CPU, GPU, RAM, etc.)
- Associer des prix aux composants selon les partenaires
- Gérer les partenaires et leurs informations
- Initialiser les données de base (catégories, marques, etc.)

---

## 🚀 Installation

```bash
git clone https://github.com/votre-utilisateur/configurateur-pc-api.git
cd configurateur-pc-api
npm install
```

---

## ⚙️ Configuration

Créer un fichier `.env` à la racine du projet avec la variable suivante :

```env
MONGO_CONNECTION=mongodb://localhost:27017/configurateurPC
```

---

## 🖥️ Lancement

```bash
node index.js
# ou avec nodemon
npx nodemon index.js
```

L'API sera disponible sur : [http://localhost:8091](http://localhost:8091)

---

## 🔐 Authentification

Cette API utilise **JWT (JSON Web Token)**.
Pour accéder aux routes protégées, vous devez ajouter cet en-tête HTTP :

```http
Authorization: Bearer <votre_token>
```

---

## 📂 Endpoints principaux

### 🔐 Authentification (`/auth`)

- `POST /login` – Connexion utilisateur
- `POST /register` – Création d’un nouvel utilisateur

### 👤 Utilisateurs (`/api/users`)

- `GET /` – Liste de tous les utilisateurs
- `PUT /` – Mise à jour des informations utilisateur
- `GET /detail` – Récupération du profil utilisateur connecté
- `PUT /password` – Modification du mot de passe
- `DELETE /{id}` – Suppression d’un utilisateur

### 🧹 Configurations (`/api/userConfig`)

- `GET /` – Liste des configurations utilisateur
- `POST /` – Création d’une configuration
- `PUT /` – Modification d’une configuration
- `GET /{id}` – Détail d’une configuration
- `DELETE /{id}` – Suppression d’une configuration

### 🚽 Composants (`/api/composants`)

- `GET /` – Liste des composants (filtrables par catégorie)
- `POST /` – Ajout d’un composant
- `PUT /` – Mise à jour d’un composant
- `GET /{id}` – Détail d’un composant
- `DELETE /{id}` – Suppression d’un composant

### 💰 Prix des composants (`/api/prixcomposants`)

- `GET /category_partenaire` – Prix par catégorie et partenaire
- `GET /category_prixlow` – Meilleur prix par catégorie
- `GET /composant_prix` – Prix d’un composant donné
- `POST /` – Ajout d’un prix
- `PUT /` – Mise à jour d’un prix
- `DELETE /{id}` – Suppression d’un prix

### 🤝 Partenaires (`/api/partenaires`)

- `GET /` – Liste des partenaires
- `POST /` – Création d’un partenaire
- `PUT /` – Mise à jour d’un partenaire
- `GET /{id}` – Détail d’un partenaire
- `DELETE /{id}` – Suppression d’un partenaire

### ⚙️ Paramètres (`/api/parametres`)

- `GET /categories` – Liste des catégories
- `POST /categories` – Ajout d’une catégorie
- `PUT /categories` – Mise à jour d’une catégorie
- `GET /marques` – Liste des marques
- `POST /marques` – Ajout d’une marque
- `PUT /marques` – Mise à jour d’une marque

### 🛠️ Setup (`/api/setup`)

- `POST /` – Initialisation des données de base

---

## 🧪 Exemple de requête

```http
GET /api/users
Host: localhost:8091
Authorization: Bearer <votre_token>
```

Réponse :

```json
[
  {
    "_id": "abc123",
    "name": "Jean",
    "email": "jean@example.com",
    "role": "admin"
  }
]
```

---

## 📁 Documentation OpenAPI

Une spécification OpenAPI complète est disponible dans le fichier :

```
/docs/openapi.yaml
```

Utilisable avec Swagger UI, Postman ou tout autre outil de documentation REST.

---
