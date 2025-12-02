# API Users - Endpoints CRUD

## Entité Utilisateurs

L'entité `Utilisateurs` possède les propriétés suivantes :
- `id` : ObjectId (MongoDB)
- `username` : string
- `email` : string
- `password` : string
- `active` : boolean (défaut: false)

## Endpoints Disponibles

### 1. Créer un utilisateur
**POST** `/users`

Crée un nouvel utilisateur avec la propriété `active = false` par défaut.

**Body :**
```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "motdepasse123"
}
```

**Réponse :** `201 Created`
```json
{
  "id": "674e1a2b3c4d5e6f7g8h9i0j",
  "username": "John Doe",
  "email": "john@example.com",
  "password": "motdepasse123",
  "active": false
}
```

---

### 2. Récupérer tous les utilisateurs
**GET** `/users`

Retourne la liste de tous les utilisateurs.

**Réponse :** `200 OK`
```json
[
  {
    "id": "674e1a2b3c4d5e6f7g8h9i0j",
    "username": "John Doe",
    "email": "john@example.com",
    "password": "motdepasse123",
    "active": false
  }
]
```

---

### 3. Trouver un utilisateur par ID
**GET** `/users/:id`

Retourne un utilisateur spécifique par son ID.

**Paramètres :**
- `id` : ObjectId de l'utilisateur

**Réponse :** `200 OK`
```json
{
  "id": "674e1a2b3c4d5e6f7g8h9i0j",
  "username": "John Doe",
  "email": "john@example.com",
  "password": "motdepasse123",
  "active": false
}
```

**Erreurs possibles :**
- `400 Bad Request` : ID invalide
- `404 Not Found` : Utilisateur non trouvé

---

### 4. Trouver un utilisateur par Email
**GET** `/users/email/:email`

Retourne un utilisateur spécifique par son email.

**Paramètres :**
- `email` : Email de l'utilisateur

**Réponse :** `200 OK`
```json
{
  "id": "674e1a2b3c4d5e6f7g8h9i0j",
  "username": "John Doe",
  "email": "john@example.com",
  "password": "motdepasse123",
  "active": false
}
```

**Erreurs possibles :**
- `404 Not Found` : Utilisateur non trouvé

---

### 5. Récupérer tous les utilisateurs actifs
**GET** `/users/active`

Retourne tous les utilisateurs avec `active = true`.

**Réponse :** `200 OK`
```json
[
  {
    "id": "674e1a2b3c4d5e6f7g8h9i0j",
    "username": "Jane Doe",
    "email": "jane@example.com",
    "password": "password456",
    "active": true
  }
]
```

---

### 6. Mettre à jour partiellement un utilisateur (PATCH)
**PATCH** `/users/:id`

Met à jour partiellement les propriétés d'un utilisateur en utilisant `PartialType`.

**Paramètres :**
- `id` : ObjectId de l'utilisateur

**Body (tous les champs sont optionnels) :**
```json
{
  "username": "John Smith"
}
```

**Réponse :** `200 OK`
```json
{
  "id": "674e1a2b3c4d5e6f7g8h9i0j",
  "username": "John Smith",
  "email": "john@example.com",
  "password": "motdepasse123",
  "active": false
}
```

**Erreurs possibles :**
- `400 Bad Request` : ID invalide
- `404 Not Found` : Utilisateur non trouvé

---

### 7. Mettre à jour un utilisateur (PUT)
**PUT** `/users/:id`

Met à jour un utilisateur (fonctionne comme PATCH avec mise à jour partielle).

**Paramètres :**
- `id` : ObjectId de l'utilisateur

**Body :**
```json
{
  "username": "John Updated",
  "email": "john.updated@example.com",
  "password": "newpassword789"
}
```

**Réponse :** `200 OK`

---

### 8. Supprimer un utilisateur
**DELETE** `/users/:id`

Supprime un utilisateur de la base de données.

**Paramètres :**
- `id` : ObjectId de l'utilisateur

**Réponse :** `204 No Content`

**Erreurs possibles :**
- `400 Bad Request` : ID invalide
- `404 Not Found` : Utilisateur non trouvé

---

### 9. Activer un compte utilisateur
**POST** `/users/:id/activate`

Active un compte utilisateur en vérifiant le mot de passe.

**Paramètres :**
- `id` : ObjectId de l'utilisateur

**Body :**
```json
{
  "password": "motdepasse123"
}
```

**Réponse :** `200 OK`
```json
{
  "id": "674e1a2b3c4d5e6f7g8h9i0j",
  "username": "John Doe",
  "email": "john@example.com",
  "password": "motdepasse123",
  "active": true
}
```

**Erreurs possibles :**
- `400 Bad Request` : ID invalide ou mot de passe incorrect
- `404 Not Found` : Utilisateur non trouvé

---

## DTOs Utilisés

### CreateUserDto
```typescript
{
  username: string;    // Requis, non vide
  email: string;       // Requis, format email valide
  password: string;    // Requis, minimum 6 caractères
}
```

### UpdateUserDto
```typescript
{
  username?: string;   // Optionnel
  email?: string;      // Optionnel, format email valide
  password?: string;   // Optionnel, minimum 6 caractères
}
```

### ActivateUserDto
```typescript
{
  password: string;    // Requis pour vérification
}
```

---

## Notes Importantes

1. ✅ La propriété `active` est automatiquement définie à `false` lors de la création
2. ✅ `UpdateUserDto` utilise `PartialType` pour permettre des mises à jour partielles
3. ✅ L'activation du compte nécessite la vérification du mot de passe
4. ✅ Tous les endpoints sont asynchrones et utilisent TypeORM avec MongoDB
5. ✅ Les validations sont gérées par `class-validator`
