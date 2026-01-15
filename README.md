# Manuel Utilisateur - Chrono Race Pro ⏱️

**Version 3.0 - Application de chronométrage sportif**

---

## Table des matières

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Démarrage rapide](#démarrage-rapide)
4. [Modes de fonctionnement](#modes-de-fonctionnement)
5. [Import de participants](#import-de-participants)
6. [Démarrage des coureurs](#démarrage-des-coureurs)
7. [Gestion des courses](#gestion-des-courses)
8. [Classement et export](#classement-et-export)
9. [Mode multi-téléphones (SMS)](#mode-multi-téléphones)
10. [Dépannage](#dépannage)

---

## 1. Introduction

### Qu'est-ce que Chrono Race Pro ?

Chrono Race Pro est une application Android de chronométrage pour courses et compétitions sportives. Elle permet de :

- ✅ Chronométrer plusieurs coureurs simultanément
- ✅ Gérer des départs séparés ou groupés
- ✅ Importer une liste de participants depuis Excel
- ✅ Utiliser 2 téléphones (départ/arrivée) via SMS
- ✅ Exporter les résultats en CSV

### Public cible

- Organisateurs de courses
- Chronométreurs sportifs
- Clubs et associations
- Événements sportifs amateurs

---

## 2. Installation

### Prérequis

- Appareil Android 5.0 ou supérieur
- 50 Mo d'espace de stockage
- Permissions requises :
  - 📂 Stockage (pour import/export)
  - 📱 SMS (pour mode multi-téléphones)
  - 🎤 Microphone (pour dictée vocale)
  - 👤 Contacts (optionnel)

### Installation via APK

1. Téléchargez le fichier `ChronoRacePro.apk`
2. Autorisez l'installation depuis des sources inconnues
3. Installez l'application
4. Accordez les permissions demandées

---

## 3. Démarrage rapide

### Premier lancement

1. **Ouvrez l'application**
   - L'écran principal s'affiche avec le titre "⏱️ Chrono Race Pro"

2. **Choisissez votre mode de fonctionnement**
   - 🏠 LOCAL : 1 seul téléphone (recommandé pour débuter)
   - 🚀 DÉPART : Téléphone au départ (mode avancé)
   - 🏁 ARRIVÉE : Téléphone à l'arrivée (mode avancé)

3. **Démarrez votre première course**
   - Cliquez sur "▶️ DÉMARRER LE CHRONO"
   - Le chronomètre démarre automatiquement

---

## 4. Modes de fonctionnement

### 🏠 Mode LOCAL (1 téléphone)

**Usage :** Chronométrage complet sur un seul appareil

**Avantages :**
- Simple et rapide
- Pas de configuration
- Idéal pour petites courses

**Fonctionnement :**
1. Démarrez les coureurs au départ
2. Enregistrez les arrivées sur le même téléphone
3. Consultez le classement en temps réel

---

### 🚀 Mode DÉPART (téléphone 1)

**Usage :** Placement au point de départ

**Configuration requise :**
1. Activez le mode DÉPART
2. Entrez le numéro du téléphone ARRIVÉE
3. Utilisez le bouton 👤 CONTACTS pour sélectionner

**Fonctionnement :**
- Enregistre l'heure de départ
- Envoie automatiquement un SMS au téléphone ARRIVÉE
- Affiche la liste des départs enregistrés

**Format du SMS envoyé :**
```
DEPART|42|Jean Dupont|1703254789123
```

---

### 🏁 Mode ARRIVÉE (téléphone 2)

**Usage :** Placement au point d'arrivée

**Fonctionnement automatique :**
1. Reçoit les SMS du téléphone DÉPART
2. Crée automatiquement les chronos
3. Affiche les coureurs en course
4. Enregistre les arrivées

**Indicateur visuel :**
- ✅ Réception SMS activée (bandeau vert)
- 📩 Icône SMS sur les coureurs reçus par SMS

---

## 5. Import de participants

### Formats de fichiers acceptés

- 📊 Excel (.xlsx, .xls)
- 📋 OpenDocument (.ods)
- 📄 CSV

### Structure du fichier

**Colonnes requises :**
| Nom | Numero |
|-----|--------|
| Jean Dupont | 42 |
| Marie Martin | 15 |
| Pierre Durand | 8 |

**Colonnes acceptées :**
- `Nom` / `nom` / `NAME` / `Prenom` / `prenom`
- `Numero` / `numero` / `Dossard` / `dossard` / `Number`

---

### Procédure d'import

1. **Cliquez sur "📥 IMPORTER"**
2. **Sélectionnez votre fichier**
3. **Vérifiez le message de confirmation**
   - Exemple : "25 participants importés !"
4. **Les participants apparaissent dans la liste déroulante**

**Message de succès :**
```
✅ 25 participants importés !
```

**Message d'erreur :**
```
❌ Erreur : Aucun participant trouvé
```

---

## 6. Démarrage des coureurs

### Mode LISTE (avec import)

**Prérequis :** Avoir importé des participants

**Étapes :**
1. Cliquez sur "📋 LISTE"
2. Sélectionnez un participant dans la liste
3. Vérifiez les informations affichées
4. Cliquez sur "▶️ DÉMARRER LE CHRONO"

**Indicateurs visuels :**
- ✅ Participant déjà arrivé (grisé)
- Nom et numéro de dossard affichés

---

### Mode MANUEL (sans import)

**Usage :** Ajout de coureurs à la volée

**Méthode 1 : Saisie manuelle**
1. Cliquez sur "✏️ MANUEL"
2. Entrez le nom du coureur
3. Cliquez sur "▶️ DÉMARRER LE CHRONO"

**Méthode 2 : Dictée vocale**
1. Cliquez sur le bouton "🎤 DICTER"
2. Autorisez l'accès au microphone
3. Dictez le nom du coureur
4. Le nom s'inscrit automatiquement

**Numérotation automatique :**
- Les dossards sont attribués automatiquement (1, 2, 3...)
- Ou laissez vide pour "Coureur 1", "Coureur 2"...

---

### Liste d'attente (Mode Manuel avancé)

**Fonction :** Préparer plusieurs coureurs avant le départ

**Procédure :**
1. Entrez un nom et cliquez "➕ AJOUTER À LA LISTE"
2. Répétez pour tous les coureurs
3. Cliquez "🚀 DÉMARRER" pour un départ groupé

**Actions disponibles :**
- ▶️ Démarrer un coureur individuellement
- ❌ Supprimer un coureur de la liste
- 🚀 DÉMARRER : Départ groupé de tous
- 💾 EXPORT : Exporter la liste d'attente
- 🗑️ VIDER : Effacer toute la liste

**Avantage :** Départs simultanés précis au centième de seconde !

---

## 7. Gestion des courses

### Coureurs en course

**Affichage en temps réel :**
- 💙 Nom du coureur en bleu
- 🏷️ Numéro de dossard en or
- ⏱️ Chronomètre en vert (mis à jour en continu)
- 📩 Icône pour coureurs reçus par SMS

---

### Actions disponibles

#### ✅ ARRIVÉE (bouton vert)
- **Action :** Enregistre l'arrivée du coureur
- **Effet :** 
  - Chronomètre stoppé
  - Temps enregistré
  - Coureur ajouté au classement
  - Message : "Dossard 42 arrivé en 00:15:23.5 !"

#### ⏸️ PAUSE / ▶️ REPRENDRE (bouton orange)
- **Action :** Met en pause ou reprend le chronomètre
- **Usage :** 
  - Incident de course
  - Attente d'un passage
  - Ne compte pas dans le temps final

#### ❌ ANNULER (bouton rouge)
- **Action :** Supprime le coureur de la course
- **Usage :** 
  - Abandon
  - Erreur de départ
  - Disqualification
- **Confirmation requise**

---

### Animation visuelle

**Effet de pulsation :**
- Les cartes de coureurs "pulsent" pour attirer l'attention
- Facilite le repérage sur l'écran
- Plus visible en extérieur / plein soleil

**Codes couleurs :**
- 🔵 Bleu : Coureur actif
- 🟢 Vert : Bouton d'arrivée
- 🟠 Orange : Bouton pause
- 🔴 Rouge : Bouton annulation

---

## 8. Classement et export

### Affichage du classement

**Classement automatique :**
- Tri par temps (plus rapide en premier)
- Position affichée (1er, 2e, 3e...)
- Médailles pour le podium :
  - 🥇 1er place
  - 🥈 2e place
  - 🥉 3e place

**Informations affichées :**
- Position
- Nom du coureur
- Numéro de dossard
- Temps formaté (HH:MM:SS.d)

---

### Export des résultats

**Format CSV exporté :**
```csv
Position,Nom,Numero,Temps,Date_Heure
1,"Jean Dupont","42","00:15:23.5","22/12/2024 14:30:45"
2,"Marie Martin","15","00:16:12.3","22/12/2024 14:31:34"
```

**Procédure d'export :**
1. Cliquez sur "💾 EXPORTER"
2. Le fichier est sauvegardé automatiquement
3. Emplacement : Dossier "Téléchargements"
4. Nom : `resultats_AAAAMMJJ_HHMM.csv`

**Message de confirmation :**
```
✅ FICHIER EXPORTÉ !
📂 Dossier: Téléchargements
📄 Nom: resultats_20241222_1430.csv
```

---

### Ouverture des résultats

**Sur Android :**
1. Ouvrez l'application "Fichiers" ou "Mes fichiers"
2. Allez dans "Téléchargements"
3. Ouvrez avec Excel, Google Sheets ou Numbers

**Sur ordinateur :**
1. Connectez votre téléphone en USB
2. Copiez le fichier CSV
3. Ouvrez avec Excel, LibreOffice, etc.

---

### Effacer les données

**Bouton "🗑️ EFFACER" :**

**Données supprimées :**
- ✓ Tous les coureurs en course
- ✓ Tous les résultats
- ✓ Historique des départs (mode SMS)
- ✓ Statuts "déjà arrivé" des participants

**Données conservées :**
- ✓ Liste des participants importés
- ✓ Configuration mode SMS
- ✓ Numéros de téléphone

**Confirmation requise avant suppression**

**[INSÉRER CAPTURE : Dialogue de confirmation d'effacement]**

---

## 9. Mode multi-téléphones (SMS)

### Configuration initiale

**Téléphone DÉPART (1):**
1. Mode : 🚀 DÉPART
2. Entrez le numéro du téléphone ARRIVÉE
3. Format : +33612345678 ou 0612345678
4. Sauvegarde automatique

**Téléphone ARRIVÉE (2):**
1. Mode : 🏁 ARRIVÉE
2. Vérifiez le bandeau "✅ Réception SMS activée"
3. Prêt à recevoir

---

### Utilisation du carnet de contacts

**Sélection rapide :**
1. Cliquez sur "👤 CONTACTS"
2. Autorisez l'accès aux contacts
3. Recherchez le contact
4. Sélectionnez le numéro
5. Sauvegarde automatique

**Recherche intelligente :**
- Par nom
- Par numéro
- Compteur de résultats affichés

---

### Flux de communication

**Scénario type :**

1. **Au DÉPART (téléphone 1) :**
   - Coureur prêt au départ
   - Clic sur "▶️ DÉMARRER LE CHRONO"
   - SMS envoyé automatiquement
   - Départ enregistré dans la liste

2. **À l'ARRIVÉE (téléphone 2) :**
   - Réception du SMS (automatique)
   - Coureur créé automatiquement
   - Icône 📩 visible
   - Chronomètre démarré

3. **Arrivée du coureur :**
   - Clic sur "✅ ARRIVÉE"
   - Temps calculé depuis le SMS de départ
   - Classement mis à jour

---

### Avantages du mode SMS

✅ **Précision maximale**
- Timestamp exact du départ
- Pas de décalage horaire

✅ **Distance illimitée**
- Fonctionne même sans internet
- Utilise le réseau GSM

✅ **Automatisation complète**
- Pas de saisie manuelle
- Moins d'erreurs

✅ **Traçabilité**
- Historique complet des départs
- Export possible

---

### Permissions SMS requises

**Lors du premier lancement :**
1. Autoriser l'envoi de SMS
2. Autoriser la réception de SMS
3. Autoriser la lecture de SMS

**Si les permissions sont refusées :**
1. Menu Android → Paramètres
2. Applications → Chrono Race Pro
3. Autorisations
4. Activer SMS

**Redémarrage de l'app recommandé après activation**

---

## 10. Dépannage

### Problèmes courants

#### ❌ "Plugin File non disponible"

**Cause :** Permission de stockage refusée

**Solution :**
1. Paramètres Android → Applications → Chrono Race Pro
2. Autorisations → Stockage
3. Autoriser
4. Redémarrer l'app

---

#### ❌ Import échoue

**Symptômes :** Message "Aucun participant trouvé"

**Solutions :**
1. Vérifiez les noms de colonnes (Nom, Numero)
2. Vérifiez que le fichier n'est pas vide
3. Essayez de convertir en .xlsx
4. Supprimez les lignes vides

**Format correct :**
```
Nom         | Numero
------------|--------
Jean Dupont | 42
```

---

#### ❌ SMS non reçus

**Vérifications :**
1. **Permissions SMS** : Autorisées sur les 2 téléphones
2. **Réseau** : Signal GSM présent
3. **Numéro** : Format correct (+33... ou 06...)
4. **Redémarrage** : Redémarrer les 2 apps

**Test manuel :**
1. Envoyez un SMS normal entre les 2 téléphones
2. Vérifiez la réception
3. Si OK, testez avec l'app

**Utilisation du menu debug 🔧 :**
- Bouton en haut à droite
- "📩 Simuler 1 SMS" pour tester
- "📡 Logs" pour voir les détails

---

#### ❌ Dictée vocale ne fonctionne pas

**Causes possibles :**
1. Permission microphone refusée
2. Pas de connexion internet (requise pour reconnaissance vocale)
3. Langue du téléphone non française

**Solutions :**
1. Autoriser le microphone
2. Connecter en WiFi ou 4G
3. Paramètres → Langue → Français

---

#### ❌ Export bloqué

**Message :** "Erreur accès au dossier Téléchargements"

**Solution :**
1. Vérifier les permissions de stockage
2. Vérifier l'espace disponible (>10 Mo)
3. Redémarrer le téléphone

---

### Fonctionnalités avancées

#### 🔧 Menu Debug

**Accès :** Bouton 🔧 en haut à droite

**Outils disponibles :**
- 📩 Simuler 1 SMS : Tester la réception
- 📩📩 Plusieurs SMS : Test de charge
- 🔍 Test format : Vérifier un SMS
- 📡 Logs : Afficher les logs en temps réel
- 📱 Envoi test : Envoyer un SMS test
- 🔌 Test plugins : Vérifier les plugins installés

---

#### 💾 Export de la liste d'attente

**Usage :** Sauvegarder vos coureurs en attente

**Procédure :**
1. Ajoutez des coureurs à la liste
2. Cliquez "💾 EXPORT"
3. Fichier sauvegardé : `liste_attente_AAAAMMJJ_HHMM.csv`

**Format :**
```csv
Numero,Nom
"1","Jean Dupont"
"2","Marie Martin"
```

---

### Sauvegarde automatique

**Données sauvegardées automatiquement :**
- ✓ Liste des participants importés
- ✓ Résultats des arrivées
- ✓ Numéro de téléphone ARRIVÉE
- ✓ Mode sélectionné (LOCAL/DÉPART/ARRIVÉE)
- ✓ Prochain numéro de dossard
- ✓ Liste d'attente
- ✓ Historique des départs (mode SMS)

**Persistance :** Les données restent après fermeture de l'app

---

### Réinitialisation complète

**Si l'application ne fonctionne plus correctement :**

1. **Exporter vos données** (si possible)
2. **Désinstaller l'application**
3. **Supprimer les données :**
   - Paramètres → Applications → Chrono Race Pro
   - Stockage → Effacer les données
4. **Réinstaller l'application**
5. **Réimporter vos participants**

---

## Conseils d'utilisation

### 📱 En compétition

**Préparation :**
1. Charger complètement les téléphones
2. Tester la connexion SMS si mode multi-téléphones
3. Importer la liste des participants la veille
4. Faire des tests à blanc

**Pendant la course :**
1. Mode avion OFF (pour SMS)
2. Luminosité au maximum
3. Ne pas fermer l'application
4. Faire des exports réguliers

---

### ⚡ Performance

**Optimisation :**
- Fermer les autres applications
- Désactiver les notifications
- Utiliser un support/trépied pour stabilité
- Prévoir une batterie externe

---

### 🌧️ Conditions difficiles

**Protection :**
- Utiliser un étui étanche si pluie
- Gants tactiles pour le froid
- Pare-soleil pour la luminosité

**Visibilité optimale :**
- Design haute visibilité (vert/or/bleu)
- Gros boutons faciles à toucher
- Animations pour attirer l'œil

---

## Annexes

### Raccourcis clavier

- **Entrée** en mode manuel : Ajouter à la liste d'attente

### Codes couleur

---

### Mises à jour

**Vérifier la version :**
- Version actuelle : 3.0
- Consultez régulièrement les mises à jour

---

## Annexes

### Raccourcis clavier

- **Entrée** en mode manuel : Ajouter à la liste d'attente

### Codes couleur

| Couleur | Signification |
|---------|---------------|
| 🟢 Vert | Action positive (Arrivée, Démarrer) |
| 🟠 Orange | Action intermédiaire (Pause, Info) |
| 🔴 Rouge | Action destructive (Annuler, Supprimer) |
| 🔵 Bleu | Coureur actif |
| 🟣 Violet | Liste d'attente |
| 🟡 Or | Titres et numéros |

---

### Limites techniques

- **Coureurs simultanés :** Illimité (limité par la RAM)
- **Participants importables :** Illimité
- **Taille fichier export :** Illimité
- **Précision chronomètre :** 1/10e de seconde affiché, 1ms en interne
- **Distance SMS :** Limitée par le réseau GSM

---

## Historique des versions

### Version 3.0 (Actuelle)
- ➕ Mode LOCAL / DÉPART / ARRIVÉE
- ➕ Communication SMS entre téléphones
- ➕ Liste d'attente pour départs groupés
- ➕ Dictée vocale
- ➕ Sélection dans contacts
- ➕ Export liste d'attente
- ➕ Menu debug avancé
- ➕ Design haute visibilité optimisé neige
- ➕ Sauvegarde automatique complète

---

**FIN DU MANUEL UTILISATEUR**

*Document créé le 22/12/2025
*Chrono Race Pro - Tous droits réservés*
---

## 📱 Installation

### Via F-Droid (Recommandé)

L'application est disponible sur F-Droid, le catalogue d'applications libres pour Android.

[<img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png"
     alt="Get it on F-Droid"
     height="80">](https://f-droid.org/packages/com.monapp.chronorace/)

### Via APK

Téléchargez la dernière version depuis la [page des releases](https://github.com/vinc38300/Chrono_Ski_Vinc/releases).

---

## 📄 Licence

Ce projet est distribué sous licence **GPL-3.0-only**.

Voir le fichier [LICENSE](LICENSE) pour plus de détails.

Cette application est :
- ✅ 100% gratuite
- ✅ Sans publicité
- ✅ Sans tracking
- ✅ Respectueuse de votre vie privée
- ✅ Code source ouvert

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

- 🐛 Signaler des bugs dans les [Issues](https://github.com/vinc38300/Chrono_Ski_Vinc/issues)
- 💡 Proposer des améliorations
- 🔧 Soumettre des Pull Requests
- 📖 Améliorer la documentation

---

## 👨‍💻 Auteur

Développé par **vinc38300**

- GitHub: [@vinc38300](https://github.com/vinc38300)
- Projet: [Chrono_Ski_Vinc](https://github.com/vinc38300/Chrono_Ski_Vinc)

---

## 🙏 Remerciements

- Communauté Apache Cordova
- Contributeurs F-Droid
- Tous les utilisateurs et testeurs

---

## 📊 Statistiques

![GitHub release](https://img.shields.io/github/v/release/vinc38300/Chrono_Ski_Vinc)
![GitHub](https://img.shields.io/github/license/vinc38300/Chrono_Ski_Vinc)
![GitHub stars](https://img.shields.io/github/stars/vinc38300/Chrono_Ski_Vinc)

---

**Chrono Race Pro** - Chronométrage sportif professionnel open source
