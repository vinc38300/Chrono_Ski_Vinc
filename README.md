 
📱 CHRONO RACE PRO - Notice Utilisateur 
📖 Table des matières 
Introduction
Installation
Modes de fonctionnement
Mode LOCAL - 1 téléphone
Mode DÉPART + ARRIVÉE - 2 téléphones
Import de participants
Chronométrage
Export des résultats
Dépannage 
 🎯 Introduction {#introduction} 
Chrono Race Pro est une application de chronométrage pour courses de ski et autres compétitions sportives. 
Fonctionnalités principales : 
⏱️ Chronométrage précis au dixième de seconde
👥 Multi-coureurs avec départs séparés
📱 Mode 1 ou 2 téléphones (avec SMS)
📊 Import Excel/CSV de participants
🏆 Classement automatique avec podium
💾 Export CSV des résultats 
 📲 Installation {#installation} 
Prérequis 
Android 5.0 minimum
Permissions : SMS (pour mode 2 téléphones)
Espace : ~10 MB 
Installation 
Téléchargez le fichier APK
Autorisez l'installation depuis sources inconnues
Lancez l'installation
Acceptez les permissions SMS si demandées 
 🔄 Modes de fonctionnement {#modes-de-fonctionnement} 
L'application propose 3 modes :Mode Téléphones Usage🏠 LOCAL 1 Départs et arrivées sur le même appareil🚀 DÉPART 2 Enregistre les départs et envoie par SMS🏁 ARRIVÉE 2 Reçoit les départs par SMS et enregistre les arrivées 
Comment choisir ? 
Utilisez le MODE LOCAL si : - Vous avez 1 seul téléphone - Départ et arrivée sont proches - Simple et rapide à mettre en place 
Utilisez le MODE 2 TÉLÉPHONES si : - Départ et arrivée sont éloignés - Vous voulez plus de précision - Vous avez 2 téléphones disponibles 
 🏠 Mode LOCAL - 1 téléphone {#mode-local} 
ConfigurationSélectionnez le mode “🏠 LOCAL”
C'est tout ! Vous êtes prêt. 
Utilisation pas à pas 
Étape 1 : Importer les participants (optionnel) 
Préparez un fichier Excel avec 2 colonnes : 
Nom : Nom du participant
Numero : Numéro de dossard
Cliquez sur “📂 Importer fichier”
Sélectionnez votre fichier
✅ Confirmation : “X participants importés” 
Étape 2 : Démarrer un coureur 
Avec liste de participants : 1. Mode “📋 Liste” actif 2. Sélectionnez un participant dans le menu déroulant 3. Vérifiez les informations affichées 4.
Cliquez sur “▶️ Démarrer le chrono” 
Sans liste (mode manuel) : 1. Cliquez sur “✏️ Manuel” 2. Cliquez sur “▶️ Démarrer le chrono” 3. Un dossard est automatiquement attribué 
Étape 3 : Pendant la course 
Le coureur apparaît dans “🏃‍♂️ Coureurs en course” avec : - Son nom et dossard - Le temps qui défile en temps réel - 3 boutons d'action 
Boutons disponibles : - ✅ ARRIVÉE : Enregistre l'arrivée du coureur - ⏸️ PAUSE : Met le chrono en pause (reprise possible) - ❌ ANNULER : Annule
la course (supprime le coureur) 
Étape 4 : Arrivée 
Quand le coureur franchit la ligne, cliquez sur “✅ ARRIVÉE”
Le coureur est automatiquement ajouté au classement
Les positions (🥇🥈🥉) sont attribuées automatiquement 
Exemple d'utilisation 
09:00:00 - Départ Coureur #1
09:00:30 - Départ Coureur #2
09:01:45 - Arrivée Coureur #1 → Temps : 01:45.2
09:02:10 - Arrivée Coureur #2 → Temps : 01:40.5
→ Classement : #2 (1er), #1 (2ème)

 📱📱 Mode 2 téléphones (DÉPART + ARRIVÉE) {#mode-2-telephones} 
Configuration initiale 
Sur le TÉLÉPHONE 1 (Départ) 
Sélectionnez “🚀 DÉPART”
Entrez le numéro du téléphone arrivée : +33612345678
Le numéro est sauvegardé automatiquement ✅
Importez vos participants (optionnel) 
Sur le TÉLÉPHONE 2 (Arrivée) 
Sélectionnez “🏁 ARRIVÉE”
Attendez les SMS de départ 
Utilisation synchronisée 
Au DÉPART (Téléphone 1) 
Démarrez un coureur (comme en mode LOCAL)
Un SMS est automatiquement envoyé au téléphone arrivée
Le départ est enregistré dans la liste des départs
Le chrono ne tourne PAS sur ce téléphone 
À L'ARRIVÉE (Téléphone 2) 
Réception automatique (si plugin SMS activé) : - Le SMS arrive - Le coureur apparaît automatiquement dans “Coureurs en course” - Le chronodéfile en temps réel - Cliquez sur “✅ ARRIVÉE” quand il franchit la ligne 
Réception manuelle (si problème SMS) : 1. Ouvrez l'application SMS native 2. Copiez le contenu du SMS (ex: DEPART|1|Jean Dupont
1703248920000) 3. Dans l'app, collez-le dans le champ “📩 Réception SMS” 4. Cliquez sur “✅ TRAITER CE SMS” 5. Le coureur apparaît dans
“Coureurs en course” 
Format du SMS 
DEPART|[Numéro]|[Nom]|[Timestamp]
 Exemple :
DEPART|42|Jean Dupont|1703248920000

Schéma de fonctionnement 
TÉLÉPHONE DÉPART SMS TÉLÉPHONE ARRIVÉE
─────────────────────────────────────────────────────────
  [Démarrer] ─────────────────> [Coureur reçu]
Coureur #1 Chrono démarre
  [SMS envoyé] [Chrono défile]
⏱️ 00:45.2
  [✅ ARRIVÉE]
Temps enregistré

 📊 Import de participants {#import-participants} 
Formats supportés 
✅ Excel (.xlsx, .xls)
✅ OpenOffice (.ods)
✅ CSV (.csv) 
Structure du fichier 
Colonnes obligatoires :Nom NumeroJean Dupont 1Marie Martin 2Pierre Durand 3 
Variantes acceptées : - Nom : Nom, nom, NAME, name, Prenom, prenom - Numero : Numero, numero, Dossard, dossard, Number 
Exemple de fichier Excel 
A | B
─────────────────────
Nom | Numero
Jean Dupont| 1
Marie Martin| 2
Pierre Durand| 3

Procédure d'import 
Cliquez sur “📂 Importer fichier”
Sélectionnez votre fichier
Attendez le message : “X participants importés ✅”
Les participants apparaissent dans le menu déroulant 
Que faire en cas d'erreur ? 
Erreur : “Aucun participant trouvé” - Vérifiez que les colonnes sont nommées Nom et Numero - Assurez-vous qu'il y a au moins 1 ligne de
données - Supprimez les lignes videsErreur : “Erreur de lecture” - Vérifiez que le fichier n'est pas corrompu - Essayez de le sauvegarder dans un autre format - Fermez le fichier s'il est
ouvert dans Excel 
 ⏱️ Chronométrage {#chronometrage} 
Précision 
Affichage : Au dixième de seconde (0.1s)
Précision interne : À la milliseconde (0.001s) 
Format du temps 
HH:MM:SS.D
 Exemples :
00:01:23.4 = 1 minute 23 secondes et 4 dixièmes
01:45:32.8 = 1 heure 45 minutes 32 secondes et 8 dixièmes

Actions disponibles pendant la courseBouton Action Réversible ?✅ ARRIVÉE Enregistre l'arrivée ❌ Non⏸️ PAUSE Met le chrono en pause ✅ Oui▶️ REPRENDRE Reprend le chrono -❌ ANNULER Supprime le coureur ✅ Oui (si confirmé) 
Classement automatique 
Le classement est calculé automatiquement par ordre de temps : - 🥇 1er : Meilleur temps - 🥈 2ème : Deuxième meilleur temps - 🥉 3ème :
Troisième meilleur temps - Puis positions 4, 5, 6... 
 💾 Export des résultats {#export-resultats} 
Format d'export : CSV 
Le fichier CSV contient : - Position finale - Nom du coureur - Numéro de dossard - Temps (format HH:MM:SS.D) - Date et heure d'arrivée 
Exemple de fichier exporté 
Position,Nom,Numero,Temps,Date_Heure
1,"Jean Dupont","42","00:01:23.4","22/12/2024 14:30:45"
2,"Marie Martin","15","00:01:25.8","22/12/2024 14:31:02"
3,"Pierre Durand","8","00:01:28.2","22/12/2024 14:31:15"

Procédure d'export 
Cliquez sur “💾 Exporter”
Le fichier est téléchargé automatiquement
Nom du fichier : resultats_AAAAMMJJ_HHMM.csv
Ouvrez avec Excel, Google Sheets, ou tout tableur 
Où trouver le fichier ? 
Sur Android, le fichier est dans : /storage/emulated/0/Download/ ou Téléchargements/ 
Ouvrir le fichier 
Avec Excel : 1. Ouvrez Excel 2. Fichier → Ouvrir 3. Sélectionnez le fichier CSV 4. Choisissez “Délimité” avec séparateur “,” 
Avec Google Sheets : 1. Ouvrez Google Sheets 2. Fichier → Importer 3. Sélectionnez votre fichier 4. ✅ Validation 
 🗑️ Effacer les donnéesBouton “🗑️ Effacer” 
Supprime : - ✅ Tous les arrivants - ✅ Tous les coureurs en course - ✅ Tous les départs enregistrés - ✅ L'historique des courses 
Conserve : - ✅ La liste des participants importés - ✅ Le mode sélectionné - ✅ Le numéro de téléphone arrivée 
Confirmation 
Un message de confirmation apparaît : Voulez-vous vraiment tout effacer ? [Annuler] [OK] 
⚠️ Attention : Cette action est irréversible ! 
Conseil : Exportez vos résultats AVANT d'effacer. 
 🔧 Dépannage {#depannage} 
Problème : L'application ne démarre pas 
Solutions : 1. Vérifiez la version Android (minimum 5.0) 2. Réinstallez l'application 3. Redémarrez le téléphone 4. Vérifiez l'espace de stockage
disponible 
Problème : Les SMS ne sont pas reçus 
Solutions : 
Vérifiez les permissions SMS 
Paramètres → Applications → Chrono Race Pro
Permissions → SMS → Autorisé ✅
Testez en mode manuel 
Mode ARRIVÉE
Copiez le SMS depuis l'app SMS native
Collez dans le champ “Réception SMS”
Vérifiez le numéro de téléphone 
Format international : +33612345678
Pas d'espaces, pas de tirets
Redémarrez la réception SMS 
Fermez complètement l'app
Relancez-la
Mode ARRIVÉE 
Problème : Import de fichier échoue 
Solutions : 
Vérifiez le format du fichier 
Extensions acceptées : .xlsx, .xls, .ods, .csv
Pas de fichiers .numbers (Mac)
Vérifiez les colonnes 
Colonnes requises : Nom et Numero
Respectez la casse (majuscules/minuscules acceptées)
Vérifiez le contenu 
Au moins 1 ligne de données
Pas de lignes vides au début
Caractères spéciaux acceptés
Recréez le fichier 
Créez un nouveau fichier Excel
Copiez-collez les données
Sauvegardez en .xlsxProblème : Le chrono ne démarre pas 
Solutions : 
Vérifiez le mode 
En mode DÉPART, le chrono ne tourne pas localement
Passez en mode LOCAL ou ARRIVÉE
Vérifiez la sélection 
En mode Liste : sélectionnez un participant
En mode Manuel : cliquez directement sur “Démarrer”
Redémarrez l'application 
Fermez complètement
Relancez 
Problème : Le temps affiche 00:00:00.0 
Causes possibles : - Le coureur a été démarré en mode DÉPART - Le SMS n'est pas arrivé sur le téléphone ARRIVÉE - Vérifiez le mode de
fonctionnement 
Problème : Export CSV ne fonctionne pas 
Solutions : 
Vérifiez qu'il y a des résultats 
Au moins 1 arrivée enregistrée
Vérifiez les permissions de stockage 
Paramètres → Applications → Chrono Race Pro
Permissions → Stockage → Autorisé ✅
Vérifiez l'espace disponible 
Besoin : ~1 KB par résultat
Libérez de l'espace si nécessaire 
Problème : Participant marqué “Déjà arrivé” 
Explication : - Le participant a déjà terminé sa course - Il apparaît grisé dans la liste 
Solutions : - Utilisez le bouton “🗑️ Effacer” pour réinitialiser - Ou sélectionnez un autre participant 
 📝 Conseils d'utilisation 
Avant la course 
✅ Chargez les téléphones à 100% ✅ Testez la réception SMS (mode 2 téléphones) ✅ Importez la liste des participants à l'avance ✅ Faites un
test complet avec 2-3 coureurs fictifs ✅ Vérifiez l'heure des téléphones (synchronisation)Pendant la course 
✅ Gardez l'écran allumé (empêche la mise en veille) ✅ Ne fermez pas l'application ✅ Évitez les appels téléphoniques ✅ Exportez
régulièrement les résultats (sécurité) 
Après la course 
✅ Exportez les résultats finaux ✅ Sauvegardez le fichier CSV dans le cloud ✅ Effacez les données si nouvelle course ✅ Rechargez les
téléphones 
 🎯 Astuces 
Astuce 1 : Numérotation des dossards 
Numérotez vos dossards de manière logique : - 1-99 : Catégorie A - 100-199 : Catégorie B - 200-299 : Catégorie C 
Astuce 2 : Tests préalables 
Testez TOUJOURS avant une vraie course : 1. Créez 3 coureurs fictifs 2. Démarrez-les à 10 secondes d'intervalle 3. Enregistrez les arrivées 4.
Vérifiez le classement 5. Exportez le CSV 6. Effacez tout 
Astuce 3 : Batterie 
Pour économiser la batterie : - Réduisez la luminosité - Désactivez le WiFi - Désactivez le Bluetooth - Mode avion (sauf si SMS nécessaires) 
Astuce 4 : Visibilité en extérieur 
Par temps ensoleillé : - Luminosité au maximum - Utilisez un film protecteur anti-reflet - Positionnez-vous dos au soleil 
Astuce 5 : Organisation 
Téléphone DÉPART : - Placez-le près du portillon de départ - Une personne dédiée pour déclencher 
Téléphone ARRIVÉE : - Placez-le près de la ligne d'arrivée - Bonne visibilité sur la ligne - À l'abri des intempéries 
 ⚖️ Mentions légales 
Chrono Race Pro v1.0.0 
© 2024 - Tous droits réservés 
Cette application est fournie “telle quelle” sans garantie d'aucune sorte. L'utilisateur assume tous les risques liés à son utilisation. 
 🔄 Historique des versions 
Version 1.0.0 (Décembre 2024) 
🎉 Version initiale
⏱️ Chronométrage multi-coureurs
📱 Mode 1 et 2 téléphones
📊 Import Excel/CSV
💾 Export CSV
📩 Envoi/réception SMS 
 Bonne course ! ?
