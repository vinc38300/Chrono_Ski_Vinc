// Variables globales
let arrivants = [];
let participants = [];
let modeListe = true;
let coureurs = [];
let prochainDossard = 1;
let modeApp = 'local';
let departs = [];
let telephoneArrivee = '';
let inputNomManuel;
let coureursEnAttente = [];

// Éléments DOM
let btnDemarrer, btnExporter, btnEffacer, btnImport;
let selectParticipant, participantInfo;
let listeArrivants, countSpan, totalSpan;
let fileInput, importStatus;
let btnModeListe, btnModeManuel;
let modeListeContainer, modeManuelContainer;
let coureursActifsContainer;
let btnModeLocal, btnModeDepart, btnModeArrivee;
let configSmsSection, inputTelArrivee;

// Initialisation
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Cordova is ready!');
    initApp();
}

function initApp() {
    console.log('Debut initApp');
    
    btnDemarrer = document.getElementById('btn-demarrer');
    btnExporter = document.getElementById('btn-exporter');
    btnEffacer = document.getElementById('btn-effacer');
    btnImport = document.getElementById('btn-import');
    selectParticipant = document.getElementById('select-participant');
    participantInfo = document.getElementById('participant-info');
    listeArrivants = document.getElementById('liste-arrivants');
    countSpan = document.getElementById('count');
    totalSpan = document.getElementById('total');
    fileInput = document.getElementById('file-input');
    importStatus = document.getElementById('import-status');
    btnModeListe = document.getElementById('btn-mode-liste');
    btnModeManuel = document.getElementById('btn-mode-manuel');
    modeListeContainer = document.getElementById('mode-liste');
    modeManuelContainer = document.getElementById('mode-manuel');
    coureursActifsContainer = document.getElementById('coureurs-actifs');
    btnModeLocal = document.getElementById('btn-mode-local');
    btnModeDepart = document.getElementById('btn-mode-depart');
    btnModeArrivee = document.getElementById('btn-mode-arrivee');
    configSmsSection = document.getElementById('config-sms');
    inputTelArrivee = document.getElementById('input-tel-arrivee');
    inputNomManuel = document.getElementById('input-nom-manuel');
    
    loadData();
    
    btnDemarrer.addEventListener('click', demarrerCoureur);
    btnExporter.addEventListener('click', exporterCSV);
    btnEffacer.addEventListener('click', effacerListe);
    btnImport.addEventListener('click', function() { fileInput.click(); });
    fileInput.addEventListener('change', handleFileSelect);
    selectParticipant.addEventListener('change', onParticipantSelect);
    btnModeListe.addEventListener('click', function() { switchMode(true); });
    btnModeManuel.addEventListener('click', function() { switchMode(false); });
    btnModeLocal.addEventListener('click', function() { switchModeApp('local'); });
    btnModeDepart.addEventListener('click', function() { switchModeApp('depart'); });
    btnModeArrivee.addEventListener('click', function() { switchModeApp('arrivee'); });
    
    if (inputTelArrivee) {
        inputTelArrivee.addEventListener('input', saveTelephoneArrivee);
        inputTelArrivee.addEventListener('blur', saveTelephoneArrivee);
    }
    
    var btnMicro = document.getElementById('btn-micro');
    if (btnMicro) {
        btnMicro.addEventListener('click', dicterNomCoureur);
    }
    
    var btnAjouterListe = document.getElementById('btn-ajouter-liste');
    if (btnAjouterListe) {
        btnAjouterListe.addEventListener('click', ajouterCoureurAttente);
    }
    
    var btnDemarrerTous = document.getElementById('btn-demarrer-tous');
    if (btnDemarrerTous) {
        btnDemarrerTous.addEventListener('click', demarrerTousCoureurs);
    }
    
    var btnViderListe = document.getElementById('btn-vider-liste');
    if (btnViderListe) {
        btnViderListe.addEventListener('click', viderListeAttente);
    }
    
    var btnExporterAttente = document.getElementById('btn-exporter-attente');
    if (btnExporterAttente) {
        btnExporterAttente.addEventListener('click', exporterListeAttente);
    }
    
    if (inputNomManuel) {
        inputNomManuel.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                ajouterCoureurAttente();
            }
        });
    }
    
    initSMSPlugin();
    
    updateListe();
    updateParticipantsList();
    updateCoureursActifs();
    updateModeAppDisplay();
    updateListeAttente();
    
    console.log('Fin initApp - App prete');
}

// ========================================
// LISTE D'ATTENTE DES COUREURS
// ========================================

function ajouterCoureurAttente() {
    if (!inputNomManuel || !inputNomManuel.value.trim()) {
        showToast('⚠️ Entrez un nom');
        return;
    }
    
    var nom = inputNomManuel.value.trim();
    var numero = prochainDossard.toString();
    
    coureursEnAttente.push({
        id: Date.now(),
        nom: nom,
        numero: numero
    });
    
    prochainDossard++;
    localStorage.setItem('prochainDossard', prochainDossard);
    
    // SAUVEGARDER LA LISTE D'ATTENTE
    saveListeAttente();
    
    inputNomManuel.value = '';
    inputNomManuel.focus();
    
    updateListeAttente();
    showToast('✅ ' + nom + ' ajouté (#' + numero + ')');
}

function updateListeAttente() {
    var section = document.getElementById('liste-attente-section');
    var liste = document.getElementById('liste-attente');
    var countSpan = document.getElementById('count-attente');
    
    if (!section || !liste || !countSpan) return;
    
    countSpan.textContent = coureursEnAttente.length;
    
    if (coureursEnAttente.length === 0) {
        section.style.display = 'none';
        return;
    }
    
    section.style.display = 'block';
    
    var html = '';
    coureursEnAttente.forEach(function(coureur) {
        html += '<div class="coureur-attente-item">';
        html += '<div class="coureur-attente-numero">#' + coureur.numero + '</div>';
        html += '<div class="coureur-attente-nom">' + coureur.nom + '</div>';
        html += '<div class="coureur-attente-actions">';
        html += '<button class="btn-attente-action btn-attente-demarrer" onclick="demarrerUnCoureurAttente(' + coureur.id + ')">▶️</button>';
        html += '<button class="btn-attente-action btn-attente-supprimer" onclick="supprimerCoureurAttente(' + coureur.id + ')">❌</button>';
        html += '</div>';
        html += '</div>';
    });
    
    liste.innerHTML = html;
}

function demarrerUnCoureurAttente(coureurId) {
    var coureur = coureursEnAttente.find(function(c) { return c.id === coureurId; });
    if (!coureur) return;
    
    demarrerCoureurAvecNomNumero(coureur.nom, coureur.numero);
    
    coureursEnAttente = coureursEnAttente.filter(function(c) { return c.id !== coureurId; });
    
    // SAUVEGARDER LA LISTE D'ATTENTE
    saveListeAttente();
    
    updateListeAttente();
}

function supprimerCoureurAttente(coureurId) {
    var coureur = coureursEnAttente.find(function(c) { return c.id === coureurId; });
    if (!coureur) return;
    
    if (confirm('Supprimer ' + coureur.nom + ' de la liste ?')) {
        coureursEnAttente = coureursEnAttente.filter(function(c) { return c.id !== coureurId; });
        
        // SAUVEGARDER LA LISTE D'ATTENTE
        saveListeAttente();
        
        updateListeAttente();
        showToast('🗑️ ' + coureur.nom + ' supprimé');
    }
}

function demarrerTousCoureurs() {
    if (coureursEnAttente.length === 0) {
        showToast('⚠️ Aucun coureur en attente');
        return;
    }
    
    if (!confirm('Démarrer les ' + coureursEnAttente.length + ' coureurs en même temps ?')) {
        return;
    }
    
    var maintenant = Date.now();
    
    coureursEnAttente.forEach(function(coureur) {
        demarrerCoureurAvecNomNumero(coureur.nom, coureur.numero, maintenant);
    });
    
    showToast('🚀 ' + coureursEnAttente.length + ' coureurs démarrés !');
    
    coureursEnAttente = [];
    
    // SAUVEGARDER LA LISTE D'ATTENTE (vide)
    saveListeAttente();
    
    updateListeAttente();
}

function viderListeAttente() {
    if (coureursEnAttente.length === 0) {
        showToast('⚠️ Liste déjà vide');
        return;
    }
    
    if (confirm('Vider la liste des ' + coureursEnAttente.length + ' coureurs ?')) {
        coureursEnAttente = [];
        
        // SAUVEGARDER LA LISTE D'ATTENTE (vide)
        saveListeAttente();
        
        updateListeAttente();
        showToast('🗑️ Liste vidée');
    }
}

function exporterListeAttente() {
    if (coureursEnAttente.length === 0) {
        showToast('⚠️ Aucun coureur en attente');
        return;
    }
    
    // Créer le CSV
    var csv = 'Numero,Nom\n';
    
    coureursEnAttente.forEach(function(coureur) {
        csv += '"' + coureur.numero + '","' + coureur.nom + '"\n';
    });
    
    var now = new Date();
    var filename = 'liste_attente_' + now.getFullYear() + pad(now.getMonth()+1) + pad(now.getDate()) + '_' + pad(now.getHours()) + pad(now.getMinutes()) + '.csv';
    
    console.log('📁 Export liste attente:', filename);
    
    if (typeof cordova === 'undefined' || !cordova.file) {
        console.error('❌ Plugin File non disponible');
        alert('❌ Plugin File non disponible!');
        return;
    }
    
    var downloadPath = cordova.file.externalRootDirectory + 'Download/';
    
    window.resolveLocalFileSystemURL(downloadPath, 
        function(dirEntry) {
            dirEntry.getFile(filename, { create: true, exclusive: false }, 
                function(fileEntry) {
                    fileEntry.createWriter(
                        function(fileWriter) {
                            fileWriter.onwriteend = function() {
                                alert('✅ LISTE EXPORTÉE!\n\n📁 Dossier: Téléchargements\n📄 ' + coureursEnAttente.length + ' coureurs\n📄 Nom: ' + filename);
                                showToast('✅ Liste exportée!');
                            };
                            
                            fileWriter.onerror = function(e) {
                                console.error('❌ Erreur écriture:', e);
                                alert('❌ Erreur écriture fichier');
                            };
                            
                            var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                            fileWriter.write(blob);
                            
                        }, 
                        function(error) {
                            console.error('❌ Erreur createWriter:', error);
                            alert('❌ Erreur création writer: ' + error.code);
                        }
                    );
                }, 
                function(error) {
                    console.error('❌ Erreur getFile:', error);
                    alert('❌ Erreur création fichier: ' + error.code);
                }
            );
        }, 
        function(error) {
            console.error('❌ Erreur accès dossier:', error);
            alert('❌ Erreur accès au dossier Téléchargements\nCode: ' + error.code);
        }
    );
}

function demarrerCoureurAvecNomNumero(nom, numero, timestamp) {
    var maintenant = timestamp || Date.now();
    
    if (modeApp === 'depart') {
        saveTelephoneArrivee();
        
        if (!telephoneArrivee) {
            showToast('Entrez le numero du telephone arrivee');
            return;
        }
        
        var depart = {
            numero: numero,
            nom: nom,
            heureDepart: maintenant,
            timestamp: new Date(maintenant).toISOString()
        };
        
        departs.push(depart);
        localStorage.setItem('departs', JSON.stringify(departs));
        
        if (typeof sms !== 'undefined' && sms.send) {
            var message = 'DEPART|' + numero + '|' + nom + '|' + maintenant;
            var options = {
                replaceLineBreaks: false,
                android: { intent: '' }
            };
            
            sms.send(telephoneArrivee, message, options, function() {
                console.log('SMS envoye');
                updateDepartsListe();
            }, function(error) {
                console.error('Erreur SMS:', error);
                updateDepartsListe();
            });
        } else if (typeof SMS !== 'undefined' && SMS.sendSMS) {
            var message = 'DEPART|' + numero + '|' + nom + '|' + maintenant;
            SMS.sendSMS(telephoneArrivee, message, function() {
                console.log('SMS envoye');
                updateDepartsListe();
            }, function(error) {
                console.error('Erreur SMS:', error);
                updateDepartsListe();
            });
        } else {
            updateDepartsListe();
        }
        
        return;
    }
    
    var coureur = {
        id: maintenant + Math.random(),
        nom: nom,
        numero: numero,
        startTime: maintenant,
        elapsedTime: 0,
        isRunning: true,
        interval: null,
        fromSMS: false
    };
    
    coureur.interval = setInterval(function() {
        coureur.elapsedTime = Date.now() - coureur.startTime;
        updateCoureurDisplay(coureur.id);
    }, 100);
    
    coureurs.push(coureur);
    updateCoureursActifs();
}

// Fonction de dictée vocale
function dicterNomCoureur() {
    console.log('🎤 Démarrage dictée vocale');
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('❌ Reconnaissance vocale non disponible sur ce téléphone');
        return;
    }
    
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    
    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = function() {
        console.log('🎤 Écoute en cours...');
        var btnMicro = document.getElementById('btn-micro');
        if (btnMicro) {
            btnMicro.innerHTML = '⏺️<br><small>ÉCOUTE</small>';
            btnMicro.style.background = '#FF0000';
            btnMicro.style.animation = 'pulse 1s infinite';
        }
        showToast('🎤 Dictez le nom du coureur...');
    };
    
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        console.log('✅ Texte reconnu:', transcript);
        
        var nomFormate = transcript.charAt(0).toUpperCase() + transcript.slice(1);
        
        if (inputNomManuel) {
            inputNomManuel.value = nomFormate;
            inputNomManuel.focus();
        }
        
        showToast('✅ Nom enregistré: ' + nomFormate);
    };
    
    recognition.onerror = function(event) {
        console.error('❌ Erreur reconnaissance:', event.error);
        
        var message = '❌ Erreur: ';
        switch(event.error) {
            case 'no-speech':
                message += 'Aucune parole détectée';
                break;
            case 'audio-capture':
                message += 'Microphone non disponible';
                break;
            case 'not-allowed':
                message += 'Permission microphone refusée';
                break;
            default:
                message += event.error;
        }
        
        showToast(message);
    };
    
    recognition.onend = function() {
        console.log('🎤 Écoute terminée');
        var btnMicro = document.getElementById('btn-micro');
        if (btnMicro) {
            btnMicro.innerHTML = '🎤<br><small>DICTER</small>';
            btnMicro.style.background = '#FF1493';
            btnMicro.style.animation = 'none';
        }
    };
    
    try {
        recognition.start();
    } catch (error) {
        console.error('Erreur démarrage:', error);
        showToast('❌ Impossible de démarrer la dictée');
    }
}

function initSMSPlugin() {
    console.log('Init SMS Plugin');
    
    if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.permissions) {
        var permissions = cordova.plugins.permissions;
        var permissionsList = [
            permissions.RECEIVE_SMS,
            permissions.READ_SMS,
            permissions.SEND_SMS
        ];
        
        permissions.requestPermissions(permissionsList, 
            function(status) {
                console.log('✅ Permissions SMS accordées:', status);
                alert('✅ Permissions SMS OK!\nRedémarrez l\'app.');
            }, 
            function(error) {
                console.error('❌ Permissions refusées:', error);
                alert('❌ PERMISSIONS SMS REFUSÉES!\nAllez dans Paramètres → Apps → Chrono Race → Autorisations → Activez SMS');
            }
        );
    }
    
    if (typeof sms !== 'undefined') {
        console.log('Plugin cordova-plugin-sms (complet) disponible');
        
        if (sms.hasPermission) {
            sms.hasPermission(function(hasPermission) {
                if (hasPermission) {
                    console.log('Permission SMS deja accordee');
                } else {
                    console.log('Demande permission SMS');
                    sms.requestPermission(function() {
                        console.log('Permission accordee');
                    }, function(error) {
                        console.error('Permission refusee:', error);
                    });
                }
            });
        }
        
    } else if (typeof SMS !== 'undefined' && SMS.sendSMS) {
        console.log('Plugin SMS GitHub disponible');
    } else {
        console.warn('Aucun plugin SMS disponible');
    }
    
    initSMSReceiver();
}

function initSMSReceiver() {
    console.log('🔧 Init SMS Receiver - MULTI-PLUGIN');
    
    var pluginTrouve = false;
    
    if (typeof window.plugins !== 'undefined' && window.plugins.smsReceive) {
        console.log('✅ METHODE 1: android-sms-receiver');
        pluginTrouve = true;
        
        window.plugins.smsReceive.startReception(
            function(msg) {
                console.log('📩 SMS RECU (methode 1)');
                console.log('De:', msg.address, 'Message:', msg.body);
                handleSMSReceived({
                    address: msg.address || 'INCONNU',
                    body: msg.body || ''
                });
            },
            function(error) {
                console.error('❌ Erreur reception:', error);
            }
        );
    }
    
    if (!pluginTrouve && typeof sms !== 'undefined' && sms.startWatch) {
        console.log('✅ METHODE 2: startWatch');
        pluginTrouve = true;
        
        sms.startWatch(
            function() {
                console.log('📡 Watch active');
            },
            function(error) {
                console.error('❌ Erreur watch:', error);
            }
        );
        
        document.addEventListener('onSMSArrive', function(e) {
            console.log('📩 SMS via onSMSArrive');
            var smsData = e.data || e;
            console.log('Data:', smsData);
            handleSMSReceived({
                address: smsData.address || smsData.from || 'INCONNU',
                body: smsData.body || smsData.message || ''
            });
        }, false);
    }
    
    if (typeof SMS !== 'undefined' && SMS.enableIntercept) {
        console.log('✅ METHODE 3: enableIntercept');
        pluginTrouve = true;
        
        SMS.enableIntercept(true, function() {
            console.log('📡 Intercept actif');
        }, function(error) {
            console.error('❌ Erreur intercept:', error);
        });
        
        var events = ['onSMSArrive', 'sms.received', 'smsReceived', 'SMS_RECEIVED'];
        events.forEach(function(eventName) {
            console.log('📡 Ecoute:', eventName);
            document.addEventListener(eventName, function(e) {
                console.log('📩 EVENT:', eventName);
                var smsData = e.data || e;
                handleSMSReceived({
                    address: smsData.address || smsData.from || 'INCONNU',
                    body: smsData.body || smsData.message || ''
                });
            }, false);
        });
        
        if (SMS.startWatch) {
            SMS.startWatch(function() {
                console.log('✅ StartWatch OK');
            }, function(error) {
                console.error('StartWatch error:', error);
            });
        }
    }
    
    if (!pluginTrouve) {
        console.warn('❌ AUCUN plugin de reception trouve');
    }
}

function handleSMSReceived(smsData) {
    try {
        console.log('=== TRAITEMENT SMS ===');
        
        if (!smsData) {
            console.error('SMS data null');
            return;
        }
        
        var message = smsData.body || smsData.message || '';
        var expediteur = smsData.address || smsData.from || 'INCONNU';
        
        console.log('De:', expediteur);
        console.log('Message:', message);
        
        if (!message) {
            console.error('Message vide');
            showToast('SMS vide');
            return;
        }
        
        if (message.indexOf('DEPART|') === 0) {
            console.log('✅ SMS DEPART detecte');
            
            var parts = message.split('|');
            console.log('Parts:', parts);
            
            if (parts.length !== 4) {
                console.error('Format invalide:', parts.length, 'parties');
                showToast('Format SMS invalide');
                return;
            }
            
            var numero = parts[1];
            var nom = parts[2];
            var heureDepart = parseInt(parts[3]);
            
            if (isNaN(heureDepart)) {
                console.error('Heure invalide');
                showToast('Heure invalide');
                return;
            }
            
            console.log('✅ Création coureur:', {numero: numero, nom: nom});
            
            var coureur = {
                id: Date.now(),
                nom: nom,
                numero: numero,
                startTime: heureDepart,
                elapsedTime: Date.now() - heureDepart,
                isRunning: true,
                interval: null,
                fromSMS: true
            };
            
            coureur.interval = setInterval(function() {
                coureur.elapsedTime = Date.now() - coureur.startTime;
                updateCoureurDisplay(coureur.id);
            }, 100);
            
            coureurs.push(coureur);
            console.log('✅ Coureur ajouté! Total:', coureurs.length);
            
            updateCoureursActifs();
            showToast('✅ Dossard ' + numero + ' reçu par SMS!');
            
        } else {
            console.log('SMS non reconnu');
            showToast('SMS non reconnu');
        }
        
    } catch (error) {
        console.error('❌ ERREUR:', error);
        alert('❌ ERREUR: ' + error.message);
    }
}

function switchModeApp(mode) {
    modeApp = mode;
    localStorage.setItem('modeApp', mode);
    saveTelephoneArrivee();
    updateModeAppDisplay();
    showToast('Mode ' + mode.toUpperCase() + ' active');
}

function saveTelephoneArrivee() {
    if (inputTelArrivee && inputTelArrivee.value.trim()) {
        telephoneArrivee = inputTelArrivee.value.trim();
        localStorage.setItem('telephoneArrivee', telephoneArrivee);
        console.log('Numero sauvegarde:', telephoneArrivee);
        
        var indicator = document.getElementById('tel-saved-indicator');
        if (indicator) {
            indicator.style.display = 'block';
            setTimeout(function() {
                indicator.style.display = 'none';
            }, 2000);
        }
    }
}

function updateModeAppDisplay() {
    btnModeLocal.classList.remove('active');
    btnModeDepart.classList.remove('active');
    btnModeArrivee.classList.remove('active');
    
    saveTelephoneArrivee();
    
    var helpText = document.getElementById('help-text');
    var receptionSmsSection = document.getElementById('reception-sms-section');
    
    if (modeApp === 'local') {
        btnModeLocal.classList.add('active');
        configSmsSection.style.display = 'none';
        if (receptionSmsSection) receptionSmsSection.style.display = 'none';
        document.getElementById('label-mode').textContent = 'Multi-coureurs avec departs separes';
        if (helpText) {
            helpText.innerHTML = '<strong>MODE LOCAL :</strong> Chronometrez avec 1 seul telephone. Departs et arrivees sur le meme appareil.';
        }
    } else if (modeApp === 'depart') {
        btnModeDepart.classList.add('active');
        configSmsSection.style.display = 'block';
        if (receptionSmsSection) receptionSmsSection.style.display = 'none';
        document.getElementById('label-mode').textContent = 'TELEPHONE DEPART';
        if (helpText) {
            helpText.innerHTML = '<strong>MODE DEPART :</strong> Envoie les departs par SMS au telephone arrivee quand tu clic sur "DEMARRER LE CHRONO".';
        }
        if (telephoneArrivee && inputTelArrivee) {
            inputTelArrivee.value = telephoneArrivee;
        }
    } else if (modeApp === 'arrivee') {
        btnModeArrivee.classList.add('active');
        configSmsSection.style.display = 'none';
        if (receptionSmsSection) receptionSmsSection.style.display = 'block';
        document.getElementById('label-mode').textContent = 'TELEPHONE ARRIVEE';
        if (helpText) {
            helpText.innerHTML = '<strong>MODE ARRIVEE :</strong> Recoit les departs par SMS. Et tu cli dans "Coureurs en course" sur le bouton "ARRIVEE" quant ils arrivent.';
        }
    }
    
    var departsSection = document.getElementById('departs-section');
    if (departsSection) {
        departsSection.style.display = modeApp === 'depart' ? 'block' : 'none';
        if (modeApp === 'depart') {
            updateDepartsListe();
        }
    }
}

function switchMode(liste) {
    modeListe = liste;
    
    if (liste) {
        btnModeListe.classList.add('active');
        btnModeManuel.classList.remove('active');
        modeListeContainer.style.display = 'block';
        modeManuelContainer.style.display = 'none';
    } else {
        btnModeListe.classList.remove('active');
        btnModeManuel.classList.add('active');
        modeListeContainer.style.display = 'none';
        modeManuelContainer.style.display = 'block';
    }
}

function demarrerCoureur() {
    console.log('Demarrage coureur');
    
    var nom, numero;
    
    if (modeListe && participants.length > 0) {
        var index = selectParticipant.value;
        if (!index) {
            showToast('Selectionnez un participant');
            return;
        }
        
        var participant = participants[index];
        nom = participant.nom;
        numero = participant.numero;
        
        if (modeApp !== 'depart' && coureurs.find(function(c) { return c.numero === numero && c.nom === nom; })) {
            showToast('Ce coureur est deja en course');
            return;
        }
        
        selectParticipant.value = '';
        participantInfo.classList.remove('visible');
        
    } else {
        if (inputNomManuel && inputNomManuel.value.trim()) {
            nom = inputNomManuel.value.trim();
            inputNomManuel.value = '';
        } else {
            nom = 'Coureur ' + prochainDossard;
        }
        
        numero = prochainDossard.toString();
        prochainDossard++;
        localStorage.setItem('prochainDossard', prochainDossard);
    }
    
    demarrerCoureurAvecNomNumero(nom, numero);
    showToast('Dossard ' + numero + ' demarre!');
}

function updateCoureurDisplay(coureurId) {
    var element = document.getElementById('coureur-' + coureurId);
    if (element) {
        var coureur = coureurs.find(function(c) { return c.id === coureurId; });
        if (coureur) {
            var timeElement = element.querySelector('.coureur-time');
            if (timeElement) {
                timeElement.textContent = formatTime(coureur.elapsedTime);
            }
        }
    }
}

function updateCoureursActifs() {
    var coureursSection = document.querySelector('.coureurs-section');
    if (coureursSection) {
        if (modeApp === 'depart') {
            coureursSection.style.display = 'none';
            return;
        } else {
            coureursSection.style.display = 'block';
        }
    }
    
    if (coureurs.length === 0) {
        coureursActifsContainer.innerHTML = '<p class="empty-message">Aucun coureur en course</p>';
        return;
    }
    
    var html = '';
    coureurs.forEach(function(coureur) {
        var smsIcon = coureur.fromSMS ? '📩 ' : '';
        html += '<div class="coureur-actif" id="coureur-' + coureur.id + '">';
        html += '<div class="coureur-info-left">';
        html += '<div class="coureur-nom">' + smsIcon + coureur.nom + '</div>';
        html += '<div class="coureur-numero">Dossard: ' + coureur.numero + '</div>';
        html += '</div>';
        html += '<div class="coureur-actions">';
        html += '<div class="coureur-time">' + formatTime(coureur.elapsedTime) + '</div>';
        html += '<button class="btn-coureur btn-arrivee" onclick="arriverCoureur(' + coureur.id + ')">✅ ARRIVEE</button>';
        html += '<button class="btn-coureur btn-stop" onclick="pauseCoureur(' + coureur.id + ')">⏸️ ' + (coureur.isRunning ? 'PAUSE' : 'REPRENDRE') + '</button>';
        html += '<button class="btn-coureur btn-cancel" onclick="annulerCoureur(' + coureur.id + ')">❌ ANNULER</button>';
        html += '</div>';
        html += '</div>';
    });
    
    coureursActifsContainer.innerHTML = html;
}

function updateDepartsListe() {
    var container = document.getElementById('departs-liste');
    if (!container) return;
    
    if (departs.length === 0) {
        container.innerHTML = '<p class="empty-message">Aucun depart enregistre</p>';
        return;
    }
    
    var html = '';
    departs.slice().reverse().forEach(function(depart) {
        var heureDepart = new Date(depart.heureDepart).toLocaleTimeString('fr-FR');
        html += '<div class="depart-item">';
        html += '<span class="depart-numero">#' + depart.numero + '</span>';
        html += '<div class="depart-info">';
        html += '<div class="depart-nom">' + depart.nom + '</div>';
        html += '<div class="depart-heure">⏱️ ' + heureDepart + '</div>';
        html += '</div>';
        html += '</div>';
    });
    
    container.innerHTML = html;
}

function pauseCoureur(coureurId) {
    var coureur = coureurs.find(function(c) { return c.id === coureurId; });
    if (!coureur) return;
    
    if (coureur.isRunning) {
        clearInterval(coureur.interval);
        coureur.isRunning = false;
        coureur.pausedTime = coureur.elapsedTime;
    } else {
        coureur.startTime = Date.now() - coureur.pausedTime;
        coureur.interval = setInterval(function() {
            coureur.elapsedTime = Date.now() - coureur.startTime;
            updateCoureurDisplay(coureur.id);
        }, 100);
        coureur.isRunning = true;
    }
    
    updateCoureursActifs();
}

function arriverCoureur(coureurId) {
    var coureur = coureurs.find(function(c) { return c.id === coureurId; });
    if (!coureur) return;
    
    clearInterval(coureur.interval);
    
    var arrivant = {
        position: arrivants.length + 1,
        nom: coureur.nom,
        numero: coureur.numero,
        temps: coureur.elapsedTime,
        tempsFormate: formatTime(coureur.elapsedTime),
        dateHeure: new Date().toISOString()
    };
    
    arrivants.push(arrivant);
    
    if (modeListe) {
        var participant = participants.find(function(p) { return p.nom === coureur.nom && p.numero === coureur.numero; });
        if (participant) {
            participant.arrived = true;
            saveParticipants();
            updateParticipantsList();
        }
    }
    
    coureurs = coureurs.filter(function(c) { return c.id !== coureurId; });
    
    saveArrivants();
    updateListe();
    updateCoureursActifs();
    showToast('Dossard ' + coureur.numero + ' arrive en ' + formatTime(coureur.elapsedTime) + '!');
}

function annulerCoureur(coureurId) {
    var coureur = coureurs.find(function(c) { return c.id === coureurId; });
    if (!coureur) return;
    
    if (confirm('Annuler la course de ' + coureur.nom + ' ?')) {
        clearInterval(coureur.interval);
        coureurs = coureurs.filter(function(c) { return c.id !== coureurId; });
        updateCoureursActifs();
        showToast('Course annulee');
    }
}

function handleFileSelect(event) {
    var file = event.target.files[0];
    if (!file) return;
    
    importStatus.textContent = 'Chargement...';
    importStatus.className = 'import-status';
    
    var reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, {type: 'array'});
            
            var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            var jsonData = XLSX.utils.sheet_to_json(firstSheet);
            
            participants = [];
            jsonData.forEach(function(row) {
                var nom = row.Nom || row.nom || row.NAME || row.name || row.Prenom || row.prenom || '';
                var numero = row.Numero || row.numero || row.Dossard || row.dossard || row.Number || '';
                
                if (nom || numero) {
                    participants.push({
                        nom: String(nom).trim(),
                        numero: String(numero).trim(),
                        arrived: false
                    });
                }
            });
            
            if (participants.length === 0) {
                throw new Error('Aucun participant trouve');
            }
            
            saveParticipants();
            updateParticipantsList();
            
            importStatus.textContent = participants.length + ' participants importes!';
            importStatus.className = 'import-status success';
            
            switchMode(true);
            
        } catch (error) {
            console.error('Erreur import:', error);
            importStatus.textContent = 'Erreur: ' + error.message;
            importStatus.className = 'import-status error';
        }
    };
    
    reader.onerror = function() {
        importStatus.textContent = 'Erreur de lecture du fichier';
        importStatus.className = 'import-status error';
    };
    
    reader.readAsArrayBuffer(file);
}

function updateParticipantsList() {
    totalSpan.textContent = participants.length;
    
    if (participants.length === 0) {
        selectParticipant.innerHTML = '<option value="">-- Aucun participant importe --</option>';
        selectParticipant.disabled = true;
        return;
    }
    
    selectParticipant.disabled = false;
    selectParticipant.innerHTML = '<option value="">-- Selectionnez un participant --</option>';
    
    var sorted = participants.slice().sort(function(a, b) {
        var numA = parseInt(a.numero) || 9999;
        var numB = parseInt(b.numero) || 9999;
        return numA - numB;
    });
    
    sorted.forEach(function(p, index) {
        var option = document.createElement('option');
        option.value = index;
        option.textContent = (p.numero ? '#' + p.numero : '') + ' ' + p.nom + (p.arrived ? ' ✅' : '');
        if (p.arrived) option.style.color = '#999';
        selectParticipant.appendChild(option);
    });
}

function onParticipantSelect() {
    var index = selectParticipant.value;
    
    if (!index) {
        participantInfo.classList.remove('visible');
        return;
    }
    
    var participant = participants[index];
    participantInfo.innerHTML = '<strong>Nom:</strong> ' + participant.nom + '<br><strong>Dossard:</strong> ' + (participant.numero || '-');
    if (participant.arrived) {
        participantInfo.innerHTML += '<br><span style="color:orange">⚠️ Deja arrive</span>';
    }
    participantInfo.classList.add('visible');
}

function formatTime(ms) {
    var totalSeconds = Math.floor(ms / 1000);
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    var deciseconds = Math.floor((ms % 1000) / 100);
    
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds) + '.' + deciseconds;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function updateListe() {
    countSpan.textContent = arrivants.length;
    
    if (arrivants.length === 0) {
        listeArrivants.innerHTML = '<p class="empty-message">Aucun arrivant enregistre</p>';
        return;
    }
    
    var sorted = arrivants.slice().sort(function(a, b) { return a.temps - b.temps; });
    
    var html = '';
    sorted.forEach(function(arrivant, index) {
        var medal = '';
        if (index === 0) medal = '🥇 ';
        else if (index === 1) medal = '🥈 ';
        else if (index === 2) medal = '🥉 ';
        
        html += '<div class="arrivant-item">';
        html += '<span class="arrivant-position">' + medal + (index + 1) + '</span>';
        html += '<div class="arrivant-info">';
        html += '<div class="arrivant-nom">' + arrivant.nom + '</div>';
        html += '<div class="arrivant-numero">Dossard: ' + arrivant.numero + '</div>';
        html += '<div class="arrivant-temps">' + arrivant.tempsFormate + '</div>';
        html += '</div>';
        html += '</div>';
    });
    
    listeArrivants.innerHTML = html;
}

function effacerListe() {
    if (arrivants.length === 0 && coureurs.length === 0 && departs.length === 0) {
        showToast('Rien a effacer');
        return;
    }
    
    if (confirm('Voulez-vous vraiment tout effacer ?')) {
        coureurs.forEach(function(c) { 
            if (c.interval) clearInterval(c.interval); 
        });
        coureurs = [];
        arrivants = [];
        departs = [];
        participants.forEach(function(p) { p.arrived = false; });
        prochainDossard = 1;
        saveArrivants();
        saveParticipants();
        localStorage.setItem('prochainDossard', prochainDossard);
        localStorage.setItem('departs', JSON.stringify(departs));
        updateListe();
        updateParticipantsList();
        updateCoureursActifs();
        updateDepartsListe();
        showToast('Tout efface');
    }
}

function exporterCSV() {
    if (arrivants.length === 0) {
        showToast('Aucun arrivant a exporter');
        return;
    }
    
    var sorted = arrivants.slice().sort(function(a, b) { return a.temps - b.temps; });
    
    var csv = 'Position,Nom,Numero,Temps,Date_Heure\n';
    
    sorted.forEach(function(arrivant, index) {
        var date = new Date(arrivant.dateHeure).toLocaleString('fr-FR');
        csv += (index + 1) + ',"' + arrivant.nom + '","' + arrivant.numero + '","' + arrivant.tempsFormate + '","' + date + '"\n';
    });
    
    var now = new Date();
    var filename = 'resultats_' + now.getFullYear() + pad(now.getMonth()+1) + pad(now.getDate()) + '_' + pad(now.getHours()) + pad(now.getMinutes()) + '.csv';
    
    console.log('📁 Export CSV:', filename);
    
    if (typeof cordova === 'undefined' || !cordova.file) {
        console.error('❌ Plugin File non disponible');
        alert('❌ Plugin File non disponible!');
        return;
    }
    
    var downloadPath = cordova.file.externalRootDirectory + 'Download/';
    
    console.log('📂 Chemin:', downloadPath);
    
    window.resolveLocalFileSystemURL(downloadPath, 
        function(dirEntry) {
            console.log('✅ Dossier trouvé');
            
            dirEntry.getFile(filename, { create: true, exclusive: false }, 
                function(fileEntry) {
                    console.log('✅ Fichier créé:', fileEntry.nativeURL);
                    
                    fileEntry.createWriter(
                        function(fileWriter) {
                            fileWriter.onwriteend = function() {
                                console.log('✅ Écriture terminée');
                                alert('✅ FICHIER EXPORTÉ!\n\n📁 Dossier: Téléchargements\n📄 Nom: ' + filename);
                                showToast('✅ Fichier exporté!');
                            };
                            
                            fileWriter.onerror = function(e) {
                                console.error('❌ Erreur écriture:', e);
                                alert('❌ Erreur écriture fichier');
                            };
                            
                            var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                            fileWriter.write(blob);
                            
                        }, 
                        function(error) {
                            console.error('❌ Erreur createWriter:', error);
                            alert('❌ Erreur création writer: ' + error.code);
                        }
                    );
                }, 
                function(error) {
                    console.error('❌ Erreur getFile:', error);
                    alert('❌ Erreur création fichier: ' + error.code);
                }
            );
        }, 
        function(error) {
            console.error('❌ Erreur accès dossier:', error);
            alert('❌ Erreur accès au dossier Téléchargements\nCode: ' + error.code);
        }
    );
}

function saveArrivants() {
    try {
        localStorage.setItem('arrivants', JSON.stringify(arrivants));
    } catch (error) {
        console.error('Erreur sauvegarde arrivants:', error);
    }
}

function saveParticipants() {
    try {
        localStorage.setItem('participants', JSON.stringify(participants));
    } catch (error) {
        console.error('Erreur sauvegarde participants:', error);
    }
}

function saveListeAttente() {
    try {
        localStorage.setItem('coureursEnAttente', JSON.stringify(coureursEnAttente));
        console.log('💾 Liste d\'attente sauvegardée:', coureursEnAttente.length, 'coureurs');
    } catch (error) {
        console.error('Erreur sauvegarde liste attente:', error);
    }
}

function loadData() {
    try {
        var savedArrivants = localStorage.getItem('arrivants');
        if (savedArrivants) {
            arrivants = JSON.parse(savedArrivants);
        }
        
        var savedParticipants = localStorage.getItem('participants');
        if (savedParticipants) {
            participants = JSON.parse(savedParticipants);
        }
        
        var savedDossard = localStorage.getItem('prochainDossard');
        if (savedDossard) {
            prochainDossard = parseInt(savedDossard);
        }
        
        var savedMode = localStorage.getItem('modeApp');
        if (savedMode) {
            modeApp = savedMode;
        }
        
        var savedTel = localStorage.getItem('telephoneArrivee');
        if (savedTel) {
            telephoneArrivee = savedTel;
            if (inputTelArrivee) {
                inputTelArrivee.value = telephoneArrivee;
            }
        }
        
        var savedDeparts = localStorage.getItem('departs');
        if (savedDeparts) {
            departs = JSON.parse(savedDeparts);
        }
        
        // CHARGER LA LISTE D'ATTENTE
        var savedListeAttente = localStorage.getItem('coureursEnAttente');
        if (savedListeAttente) {
            coureursEnAttente = JSON.parse(savedListeAttente);
            console.log('📋 Liste d\'attente chargée:', coureursEnAttente.length, 'coureurs');
        }
    } catch (error) {
        console.error('Erreur chargement donnees:', error);
    }
}

function showToast(message) {
    var toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = 'position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 15px 30px; border-radius: 25px; font-size: 16px; z-index: 1000; animation: fadeInOut 2s;';
    
    document.body.appendChild(toast);
    
    setTimeout(function() {
        if (toast.parentNode) {
            document.body.removeChild(toast);
        }
    }, 2000);
}

// ========================================
// FONCTIONS DE DEBUG SMS
// ========================================

function simulerSMSDepart() {
    console.log('=== SIMULATION SMS DEPART ===');
    
    var numero = prompt('Numéro de dossard:', '42');
    var nom = prompt('Nom du coureur:', 'Test Coureur');
    
    if (!numero || !nom) {
        alert('Simulation annulée');
        return;
    }
    
    var heureDepart = Date.now() - 5000;
    var messageSMS = 'DEPART|' + numero + '|' + nom + '|' + heureDepart;
    
    console.log('SMS simulé:', messageSMS);
    alert('📩 Simulation SMS:\n' + messageSMS);
    
    try {
        handleSMSReceived({
            address: '+33612345678',
            body: messageSMS
        });
        alert('✅ SMS traité avec succès!');
    } catch (error) {
        alert('❌ ERREUR: ' + error.message);
        console.error('Erreur simulation:', error);
    }
}

function simulerPlusieursDeparts() {
    var nombre = parseInt(prompt('Combien de coureurs ?', '3'));
    
    if (isNaN(nombre) || nombre < 1) {
        alert('Nombre invalide');
        return;
    }
    
    var delai = 0;
    for (var i = 1; i <= nombre; i++) {
        setTimeout(function(num) {
            var heureDepart = Date.now() - (num * 30000);
            var messageSMS = 'DEPART|' + num + '|Coureur ' + num + '|' + heureDepart;
            
            console.log('SMS ' + num + ':', messageSMS);
            
            handleSMSReceived({
                address: '+33612345678',
                body: messageSMS
            });
            
            showToast('📩 SMS ' + num + ' reçu');
        }, delai, i);
        
        delai += 1000;
    }
    
    alert('⏳ Envoi de ' + nombre + ' SMS simulés...');
}

function testerFormatSMS() {
    var message = prompt('Collez le SMS à tester:', 'DEPART|1|Test|1234567890');
    
    if (!message) {
        alert('Test annulé');
        return;
    }
    
    console.log('=== TEST FORMAT SMS ===');
    console.log('Message:', message);
    
    if (message.indexOf('DEPART|') === 0) {
        var parts = message.split('|');
        console.log('Parts:', parts);
        console.log('Nombre de parties:', parts.length);
        
        if (parts.length === 4) {
            console.log('✅ Format VALIDE');
            console.log('Numéro:', parts[1]);
            console.log('Nom:', parts[2]);
            console.log('Timestamp:', parts[3]);
            console.log('Timestamp valide?', !isNaN(parseInt(parts[3])));
            
            alert('✅ FORMAT VALIDE\n\n' +
                  'Numéro: ' + parts[1] + '\n' +
                  'Nom: ' + parts[2] + '\n' +
                  'Timestamp: ' + parts[3]);
            
            if (confirm('Voulez-vous traiter ce SMS ?')) {
                handleSMSReceived({
                    address: 'TEST',
                    body: message
                });
            }
        } else {
            console.error('❌ Format INVALIDE: ' + parts.length + ' parties au lieu de 4');
            alert('❌ FORMAT INVALIDE\n\n' +
                  'Attendu: 4 parties\n' +
                  'Reçu: ' + parts.length + ' parties\n\n' +
                  parts.join('\n'));
        }
    } else {
        alert('❌ Le message ne commence pas par "DEPART|"');
    }
}

function afficherLogsSMS() {
    var logsDiv = document.getElementById('debug-logs');
    
    if (!logsDiv) {
        logsDiv = document.createElement('div');
        logsDiv.id = 'debug-logs';
        logsDiv.style.cssText = 'position: fixed; bottom: 0; left: 0; right: 0; ' +
                                'max-height: 200px; overflow-y: auto; ' +
                                'background: rgba(0,0,0,0.95); color: #00FF00; ' +
                                'padding: 15px; font-family: monospace; font-size: 12px; ' +
                                'border-top: 3px solid #00FF00; z-index: 9999;';
        
        var closeBtn = document.createElement('button');
        closeBtn.textContent = '✖ FERMER';
        closeBtn.style.cssText = 'position: absolute; top: 5px; right: 5px; ' +
                                 'background: #FF0000; color: white; border: none; ' +
                                 'padding: 5px 10px; border-radius: 5px; cursor: pointer;';
        closeBtn.onclick = function() {
            document.body.removeChild(logsDiv);
        };
        
        logsDiv.appendChild(closeBtn);
        
        var content = document.createElement('div');
        content.id = 'debug-logs-content';
        content.innerHTML = '<strong>📡 LOGS SMS EN TEMPS RÉEL</strong><br><br>';
        logsDiv.appendChild(content);
        
        document.body.appendChild(logsDiv);
    }
    
    var originalLog = console.log;
    console.log = function() {
        originalLog.apply(console, arguments);
        
        var content = document.getElementById('debug-logs-content');
        if (content) {
            var message = Array.from(arguments).join(' ');
            content.innerHTML += '<div>' + new Date().toLocaleTimeString() + ' - ' + message + '</div>';
            logsDiv.scrollTop = logsDiv.scrollHeight;
        }
    };
    
    alert('✅ Logs SMS activés!\nIls s\'afficheront en bas de l\'écran.');
}

function envoyerSMSTest() {
    var monNumero = prompt('Votre numéro de téléphone:', telephoneArrivee || '+33612345678');
    
    if (!monNumero) {
        alert('Numéro requis');
        return;
    }
    
    var numero = '99';
    var nom = 'Test Auto';
    var heureDepart = Date.now();
    var message = 'DEPART|' + numero + '|' + nom + '|' + heureDepart;
    
    console.log('Envoi SMS test à:', monNumero);
    console.log('Message:', message);
    
    if (typeof sms !== 'undefined' && sms.send) {
        var options = {
            replaceLineBreaks: false,
            android: { intent: '' }
        };
        
        sms.send(monNumero, message, options, 
            function() {
                alert('✅ SMS envoyé!\nVérifiez vos SMS.');
            },
            function(error) {
                alert('❌ Erreur: ' + error);
            }
        );
    } else if (typeof SMS !== 'undefined' && SMS.sendSMS) {
        SMS.sendSMS(monNumero, message,
            function() {
                alert('✅ SMS envoyé!\nVérifiez vos SMS.');
            },
            function(error) {
                alert('❌ Erreur: ' + error);
            }
        );
    } else {
        alert('❌ Plugin SMS non disponible');
    }
}

function ouvrirMenuDebug() {
    var menu = document.getElementById('debug-menu');
    
    if (menu) {
        document.body.removeChild(menu);
        return;
    }
    
    menu = document.createElement('div');
    menu.id = 'debug-menu';
    menu.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); ' +
                         'background: #2a2a2a; border: 4px solid #FFD700; border-radius: 15px; ' +
                         'padding: 15px; z-index: 10000; max-width: 85%; box-shadow: 0 0 50px rgba(0,0,0,0.8);';
    
    var btnStyle = 'display: block; width: 100%; padding: 15px; margin: 8px 0; ' +
                   'background: #FFD700; color: #000; border: 3px solid #000; ' +
                   'border-radius: 10px; font-size: 18px; font-weight: 900; cursor: pointer;';
    
    menu.innerHTML = '<h2 style="color: #FFD700; margin: 0 0 12px 0; text-align: center; font-size: 22px;">🔧 DEBUG SMS</h2>' +
                     '<button onclick="simulerSMSDepart()" style="' + btnStyle + '">📩 Simuler 1 SMS</button>' +
                     '<button onclick="simulerPlusieursDeparts()" style="' + btnStyle + '">📩📩 Plusieurs SMS</button>' +
                     '<button onclick="testerFormatSMS()" style="' + btnStyle + '">🔍 Test format</button>' +
                     '<button onclick="afficherLogsSMS()" style="' + btnStyle + '">📡 Logs</button>' +
                     '<button onclick="envoyerSMSTest()" style="' + btnStyle + '">📱 Envoi test</button>' +
                     '<button onclick="testSMS()" style="' + btnStyle + '">🔌 Test plugins</button>' +
                     '<button onclick="document.body.removeChild(document.getElementById(\'debug-menu\'))" style="' + btnStyle + 'background: #FF0000; color: #FFF;">✖ FERMER</button>';
    
    document.body.appendChild(menu);
}

function testSMS() {
    console.log('=== TEST PLUGIN SMS ===');
    
    console.log('typeof SMS:', typeof SMS);
    console.log('SMS.sendSMS:', typeof (SMS && SMS.sendSMS));
    console.log('typeof sms:', typeof sms);
    
    if (typeof SMS !== 'undefined' && SMS.sendSMS) {
        console.log('Plugin SMS GitHub disponible');
        alert('✅ Plugin SMS GitHub OK');
    } else if (typeof sms !== 'undefined' && typeof sms.send !== 'undefined') {
        console.log('Plugin cordova-plugin-sms disponible');
        alert('✅ Plugin cordova-plugin-sms OK');
        
        sms.hasPermission(function(hasPermission) {
            var msg = 'Permission SMS: ' + (hasPermission ? 'OUI ✅' : 'NON ❌');
            console.log(msg);
            alert(msg);
        });
    } else {
        console.error('Aucun plugin SMS disponible');
        alert('❌ AUCUN Plugin SMS disponible');
    }
    
    if (typeof sms !== 'undefined' && typeof sms.startWatch !== 'undefined') {
        console.log('Plugin SMS Receive disponible');
        alert('✅ Plugin SMS Receive OK');
    } else {
        console.warn('Plugin SMS Receive NON installé');
        alert('⚠️ Plugin SMS Receive NON installé');
    }
}

function ouvrirContacts() {
    console.log('Ouverture des contacts...');
    
    if (typeof navigator.contacts === 'undefined') {
        alert('❌ Plugin Contacts non disponible!\nInstallez: cordova plugin add cordova-plugin-contacts');
        return;
    }
    
    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    options.hasPhoneNumber = true;
    
    var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.phoneNumbers];
    
    navigator.contacts.find(fields, 
        function(contacts) {
            console.log('Contacts trouvés:', contacts.length);
            
            if (contacts.length === 0) {
                alert('Aucun contact trouvé');
                return;
            }
            
            afficherMenuContacts(contacts);
        },
        function(error) {
            console.error('Erreur contacts:', error);
            alert('❌ Erreur accès contacts: ' + error.code);
        },
        options
    );
}

function afficherMenuContacts(contacts) {
    var menu = document.createElement('div');
    menu.id = 'contacts-menu';
    menu.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; ' +
                         'background: rgba(0,0,0,0.95); z-index: 10000; ' +
                         'overflow-y: auto; padding: 20px;';
    
    var container = document.createElement('div');
    container.style.cssText = 'max-width: 600px; margin: 0 auto; ' +
                              'background: #2a2a2a; border-radius: 20px; ' +
                              'padding: 20px; border: 4px solid #00BFFF;';
    
    var title = document.createElement('h2');
    title.textContent = '👤 Choisir un contact';
    title.style.cssText = 'color: #FFD700; text-align: center; margin-bottom: 20px; font-size: 28px;';
    
    var closeBtn = document.createElement('button');
    closeBtn.textContent = '✖ FERMER';
    closeBtn.style.cssText = 'width: 100%; padding: 15px; margin-bottom: 15px; ' +
                             'background: #FF0000; color: #FFF; border: 3px solid #000; ' +
                             'border-radius: 12px; font-size: 20px; font-weight: 900; cursor: pointer;';
    closeBtn.onclick = function() {
        document.body.removeChild(menu);
    };
    
    var searchContainer = document.createElement('div');
    searchContainer.style.cssText = 'position: relative; margin-bottom: 15px;';
    
    var searchIcon = document.createElement('span');
    searchIcon.textContent = '🔍';
    searchIcon.style.cssText = 'position: absolute; left: 15px; top: 50%; transform: translateY(-50%); ' +
                               'font-size: 24px; pointer-events: none;';
    
    var searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Rechercher un contact...';
    searchInput.style.cssText = 'width: 100%; padding: 20px 20px 20px 55px; ' +
                                'font-size: 20px; font-weight: 700; ' +
                                'border: 4px solid #FFD700; border-radius: 12px; ' +
                                'background: #1a1a1a; color: #FFD700; ' +
                                'outline: none;';
    
    searchInput.onfocus = function() {
        this.style.borderColor = '#00FF00';
        this.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
    };
    
    searchInput.onblur = function() {
        this.style.borderColor = '#FFD700';
        this.style.boxShadow = 'none';
    };
    
    searchContainer.appendChild(searchIcon);
    searchContainer.appendChild(searchInput);
    
    var compteur = document.createElement('div');
    compteur.id = 'contacts-compteur';
    compteur.style.cssText = 'color: #00BFFF; font-size: 16px; font-weight: 700; ' +
                             'text-align: center; margin-bottom: 10px; padding: 8px;';
    
    var liste = document.createElement('div');
    liste.id = 'contacts-liste';
    liste.style.cssText = 'max-height: 50vh; overflow-y: auto;';
    
    contacts.sort(function(a, b) {
        var nameA = (a.displayName || a.name.formatted || 'Sans nom').toLowerCase();
        var nameB = (b.displayName || b.name.formatted || 'Sans nom').toLowerCase();
        return nameA.localeCompare(nameB);
    });
    
    var contactItems = [];
    
    contacts.forEach(function(contact) {
        if (!contact.phoneNumbers || contact.phoneNumbers.length === 0) return;
        
        var nom = contact.displayName || contact.name.formatted || 'Sans nom';
        
        contact.phoneNumbers.forEach(function(phone) {
            var numero = phone.value.replace(/\s+/g, '');
            
            var item = document.createElement('div');
            item.className = 'contact-item';
            item.dataset.nom = nom.toLowerCase();
            item.dataset.numero = numero.toLowerCase();
            item.style.cssText = 'background: #1a1a4d; border: 3px solid #00BFFF; ' +
                                 'padding: 15px; margin-bottom: 10px; border-radius: 12px; ' +
                                 'cursor: pointer; transition: all 0.2s;';
            
            item.innerHTML = '<div style="color: #00BFFF; font-size: 20px; font-weight: 900; margin-bottom: 5px;">' + nom + '</div>' +
                            '<div style="color: #FFD700; font-size: 18px; font-weight: 700;">' + numero + '</div>';
            
            item.onmouseover = function() {
                this.style.background = '#00BFFF';
                this.querySelector('div:first-child').style.color = '#000';
                this.querySelector('div:last-child').style.color = '#000';
            };
            
            item.onmouseout = function() {
                this.style.background = '#1a1a4d';
                this.querySelector('div:first-child').style.color = '#00BFFF';
                this.querySelector('div:last-child').style.color = '#FFD700';
            };
            
            item.onclick = function() {
                inputTelArrivee.value = numero;
                saveTelephoneArrivee();
                document.body.removeChild(menu);
                showToast('✅ Contact sélectionné: ' + nom);
            };
            
            liste.appendChild(item);
            contactItems.push(item);
        });
    });
    
    function rechercherContacts() {
        var recherche = searchInput.value.toLowerCase().trim();
        var visibles = 0;
        
        contactItems.forEach(function(item) {
            var nom = item.dataset.nom;
            var numero = item.dataset.numero;
            
            if (recherche === '' || nom.indexOf(recherche) !== -1 || numero.indexOf(recherche) !== -1) {
                item.style.display = 'block';
                visibles++;
            } else {
                item.style.display = 'none';
            }
        });
        
        if (recherche === '') {
            compteur.textContent = contactItems.length + ' contacts au total';
        } else {
            compteur.textContent = visibles + ' résultat' + (visibles > 1 ? 's' : '') + ' sur ' + contactItems.length;
        }
        
        if (visibles === 0) {
            if (!document.getElementById('no-results')) {
                var noResults = document.createElement('div');
                noResults.id = 'no-results';
                noResults.textContent = '❌ Aucun contact trouvé';
                noResults.style.cssText = 'color: #FF0000; font-size: 20px; font-weight: 900; ' +
                                         'text-align: center; padding: 40px;';
                liste.appendChild(noResults);
            }
        } else {
            var noResults = document.getElementById('no-results');
            if (noResults) {
                liste.removeChild(noResults);
            }
        }
    }
    
    searchInput.oninput = rechercherContacts;
    
    compteur.textContent = contactItems.length + ' contacts au total';
    
    container.appendChild(title);
    container.appendChild(closeBtn);
    container.appendChild(searchContainer);
    container.appendChild(compteur);
    container.appendChild(liste);
    menu.appendChild(container);
    document.body.appendChild(menu);
    
    setTimeout(function() {
        searchInput.focus();
    }, 300);
}

// Exposer les fonctions globalement
window.simulerSMSDepart = simulerSMSDepart;
window.simulerPlusieursDeparts = simulerPlusieursDeparts;
window.testerFormatSMS = testerFormatSMS;
window.afficherLogsSMS = afficherLogsSMS;
window.envoyerSMSTest = envoyerSMSTest;
window.ouvrirMenuDebug = ouvrirMenuDebug;
window.testSMS = testSMS;
window.ouvrirContacts = ouvrirContacts;
window.ajouterCoureurAttente = ajouterCoureurAttente;
window.demarrerUnCoureurAttente = demarrerUnCoureurAttente;
window.supprimerCoureurAttente = supprimerCoureurAttente;
window.demarrerTousCoureurs = demarrerTousCoureurs;
window.viderListeAttente = viderListeAttente;
window.exporterListeAttente = exporterListeAttente;
window.pauseCoureur = pauseCoureur;
window.arriverCoureur = arriverCoureur;
window.annulerCoureur = annulerCoureur;

// Ajouter un bouton debug
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var debugBtn = document.createElement('button');
        debugBtn.textContent = '🔧';
        debugBtn.style.cssText = 'position: fixed; top: 20px; right: 20px; ' +
                                 'width: 60px; height: 60px; border-radius: 50%; ' +
                                 'background: #FFD700; border: 4px solid #000; ' +
                                 'font-size: 30px; cursor: pointer; z-index: 9999; ' +
                                 'box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);';
        debugBtn.onclick = ouvrirMenuDebug;
        document.body.appendChild(debugBtn);
    }, 1000);
});
