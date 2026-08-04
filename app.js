// Clés utilisées pour stocker les données dans le local Storage
const STORAGE_KEY = 'my_personal_diary_entries';
const PIN_HASH_KEY = 'my_personal_diary_pin_hash';
const PIN_SALT_KEY = 'my_personal_diary_pin_salt';
const LANG_KEY = 'my_personal_diary_lang';

// Sélection des éléments HTML du DOM
const entryDateInput = document.getElementById('entry-date');
const entryContentInput = document.getElementById('entry-content');
const charCountEl = document.getElementById('char-count');
const saveBtn = document.getElementById('save-btn');
const entriesContainer = document.getElementById('entries-container');
const mainContent = document.getElementById('main-content');
const navbar = document.querySelector('.navbar');

// Éléments liés au verrouillage
const lockOverlay = document.getElementById('lock-overlay');
const unlockForm = document.getElementById('unlock-form');
const unlockPinInput = document.getElementById('unlock-pin-input');
const unlockError = document.getElementById('unlock-error');
const lockNowBtn = document.getElementById('lock-now-btn');

// Éléments liés à la gestion du PIN (vue Confidentialité)
const pinSetBlock = document.getElementById('pin-set-block');
const pinManageBlock = document.getElementById('pin-manage-block');

// ==========================================
// 0. TRADUCTIONS (FRANÇAIS / ANGLAIS)
// ==========================================

const translations = {
  fr: {
    docTitle: "Mon Journal Intime Privé",
    appTitle: "Mon Journal",
    navWrite: "Écrire",
    navPrivacy: "Confidentialité",
    lockNowTitle: "Verrouiller le journal",
    lockScreenTitle: "Journal verrouillé",
    lockScreenText: "Entrez votre code PIN pour accéder à vos notes.",
    unlockBtn: "Déverrouiller",
    unlockError: "Code PIN incorrect. Réessayez.",
    editorTitle: "Créer une nouvelle note",
    dateLabel: "Date :",
    contentPlaceholder: "Qu'avez-vous en tête aujourd'hui ?",
    charCounterSuffix: "caractères",
    saveBtn: "Enregistrer dans mon navigateur",
    entriesTitle: "Mes Notes Enregistrées",
    noEntries: "Aucune note enregistrée pour le moment. Exprimez-vous ci-dessus !",
    deleteTitle: "Supprimer la note",
    privacyTitle: "🔒 Vos données restent chez vous",
    privacyHighlight: "Aucun serveur. Aucune inscription. 100% Privé.",
    privacyIntro: "Ce journal utilise le <strong>stockage local de votre navigateur (localStorage)</strong>. Cela signifie que :",
    privacyItem1: "Vos notes sont enregistrées directement dans la mémoire de votre ordinateur ou téléphone.",
    privacyItem2: "Aucune donnée ne transite par Internet ni n'est stockée sur un serveur distant.",
    privacyItem3: "Seule une personne ayant accès physiquement à votre session d'ordinateur ou votre profil de navigateur peut lire vos notes.",
    privacyWarning: "💡 <em>Conseil : Pour garder votre journal totalement secret, veillez à verrouiller votre session d'ordinateur (Mot de passe/Session Windows/Mac) lorsque vous vous absentez.</em>",
    pinTitle: "🔑 Code PIN de protection",
    pinExplainer: "Ajoutez un code PIN pour qu'un écran de verrouillage s'affiche à chaque ouverture du journal. Ce code est stocké (haché) uniquement sur votre appareil : ce n'est pas un chiffrement fort, mais une protection contre les regards indiscrets.",
    pinNewPlaceholder: "Nouveau code (4 à 12 chiffres)",
    pinConfirmPlaceholder: "Confirmer le code",
    pinSetBtn: "Définir un code PIN",
    pinActiveMsg: "✅ Un code PIN protège actuellement votre journal.",
    pinCurrentPlaceholder: "Code PIN actuel",
    pinChangedPlaceholder: "Nouveau code (optionnel)",
    pinChangedConfirmPlaceholder: "Confirmer le nouveau code",
    pinChangeBtn: "Modifier le code",
    pinRemoveBtn: "Supprimer le code PIN",
    dataTitle: "📦 Sauvegarde & Restauration des données",
    dataText: "Téléchargez une copie de vos notes sur votre ordinateur pour ne jamais les perdre, ou transférez-les vers un autre appareil.",
    exportBtn: "💾 Exporter mes notes (.json)",
    importBtn: "📂 Importer une sauvegarde",
    alertEmptyEntry: "Veuillez écrire un texte avant d'enregistrer.",
    confirmDeleteEntry: "Voulez-vous vraiment supprimer cette note ?",
    alertNoEntriesExport: "Vous n'avez aucune note à exporter !",
    confirmImport: (n) => `Voulez-vous importer ${n} note(s) ? Les notes existantes seront conservées.`,
    alertImportSuccess: (n) => `${n} nouvelle(s) note(s) importée(s) avec succès !`,
    alertImportError: "Erreur lors de l'importation : Le fichier JSON sélectionné n'est pas valide.",
    pinSetErrorFormat: "Le code doit contenir entre 4 et 12 chiffres.",
    pinSetErrorMismatch: "Les deux codes ne correspondent pas.",
    pinSetSuccessAlert: "Code PIN activé ! Il vous sera demandé à chaque ouverture du journal.",
    pinManageErrorWrongCurrent: "Le code PIN actuel est incorrect.",
    pinManageErrorEmptyNew: "Entrez un nouveau code dans les deux champs pour le modifier.",
    pinManageErrorFormat: "Le nouveau code doit contenir entre 4 et 12 chiffres.",
    pinManageErrorMismatch: "Les deux nouveaux codes ne correspondent pas.",
    pinChangeSuccess: "Code PIN modifié avec succès.",
    confirmRemovePin: "Voulez-vous vraiment supprimer la protection par code PIN ?",
    alertPinRemoved: "Le code PIN a été supprimé. Le journal ne sera plus verrouillé.",
    localeCode: 'fr-FR'
  },
  en: {
    docTitle: "My Private Diary",
    appTitle: "My Journal",
    navWrite: "Write",
    navPrivacy: "Privacy",
    lockNowTitle: "Lock the journal",
    lockScreenTitle: "Journal locked",
    lockScreenText: "Enter your PIN code to access your notes.",
    unlockBtn: "Unlock",
    unlockError: "Incorrect PIN code. Please try again.",
    editorTitle: "Create a new entry",
    dateLabel: "Date:",
    contentPlaceholder: "What's on your mind today?",
    charCounterSuffix: "characters",
    saveBtn: "Save to my browser",
    entriesTitle: "My Saved Entries",
    noEntries: "No entries saved yet. Express yourself above!",
    deleteTitle: "Delete this entry",
    privacyTitle: "🔒 Your data stays with you",
    privacyHighlight: "No server. No sign-up. 100% Private.",
    privacyIntro: "This journal uses your browser's <strong>local storage (localStorage)</strong>. This means:",
    privacyItem1: "Your entries are saved directly in your computer's or phone's memory.",
    privacyItem2: "No data ever travels over the Internet or is stored on a remote server.",
    privacyItem3: "Only someone with physical access to your computer session or browser profile can read your entries.",
    privacyWarning: "💡 <em>Tip: To keep your journal completely private, lock your computer session (Windows/Mac password) whenever you step away.</em>",
    pinTitle: "🔑 PIN code protection",
    pinExplainer: "Add a PIN code so a lock screen appears every time you open the journal. This code is stored (hashed) only on your device: it isn't strong encryption, but it protects against prying eyes.",
    pinNewPlaceholder: "New code (4 to 12 digits)",
    pinConfirmPlaceholder: "Confirm the code",
    pinSetBtn: "Set a PIN code",
    pinActiveMsg: "✅ A PIN code currently protects your journal.",
    pinCurrentPlaceholder: "Current PIN code",
    pinChangedPlaceholder: "New code (optional)",
    pinChangedConfirmPlaceholder: "Confirm the new code",
    pinChangeBtn: "Change the code",
    pinRemoveBtn: "Remove PIN protection",
    dataTitle: "📦 Backup & Restore",
    dataText: "Download a copy of your entries to your computer so you never lose them, or transfer them to another device.",
    exportBtn: "💾 Export my entries (.json)",
    importBtn: "📂 Import a backup",
    alertEmptyEntry: "Please write something before saving.",
    confirmDeleteEntry: "Are you sure you want to delete this entry?",
    alertNoEntriesExport: "You don't have any entries to export!",
    confirmImport: (n) => `Import ${n} entr${n === 1 ? 'y' : 'ies'}? Existing entries will be kept.`,
    alertImportSuccess: (n) => `${n} new entr${n === 1 ? 'y' : 'ies'} imported successfully!`,
    alertImportError: "Import error: the selected JSON file is not valid.",
    pinSetErrorFormat: "The code must contain 4 to 12 digits.",
    pinSetErrorMismatch: "The two codes don't match.",
    pinSetSuccessAlert: "PIN code activated! You'll be asked for it every time you open the journal.",
    pinManageErrorWrongCurrent: "The current PIN code is incorrect.",
    pinManageErrorEmptyNew: "Enter a new code in both fields to change it.",
    pinManageErrorFormat: "The new code must contain 4 to 12 digits.",
    pinManageErrorMismatch: "The two new codes don't match.",
    pinChangeSuccess: "PIN code changed successfully.",
    confirmRemovePin: "Are you sure you want to remove PIN protection?",
    alertPinRemoved: "The PIN code has been removed. The journal will no longer be locked.",
    localeCode: 'en-US'
  }
};

let currentLang = 'fr';

// Récupère une chaîne traduite
function t(key, ...args) {
  const entry = translations[currentLang][key];
  return typeof entry === 'function' ? entry(...args) : entry;
}

// Applique la langue choisie à toute l'interface
function applyLanguage(lang, { rerenderEntries = false } = {}) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.title = t('docTitle');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.getAttribute('data-i18n-html'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.getAttribute('data-i18n-title'));
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  if (rerenderEntries) {
    displayEntries();
  }
}

// ==========================================
// 1. INITIALISATION AU CHARGEMENT DE LA PAGE
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  // Appliquer la langue mémorisée (français par défaut)
  currentLang = localStorage.getItem(LANG_KEY) || 'fr';
  applyLanguage(currentLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang, { rerenderEntries: !mainContent.hidden });
    });
  });

  // Définir la date par défaut sur la date du jour (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];
  entryDateInput.value = today;

  // Mettre à jour le compteur de caractères en direct
  entryContentInput.addEventListener('input', () => {
    charCountEl.textContent = entryContentInput.value.length;
  });

  // Mettre à jour l'interface de gestion du PIN
  refreshPinSettingsUI();

  // Si un code PIN est actif, verrouiller l'accès avant tout affichage
  if (await hasPin()) {
    showLockScreen();
  } else {
    unlockJournal();
  }
});

// ==========================================
// 2. FONCTIONS DE STOCKAGE (LOCALSTORAGE)
// ==========================================

// Récupérer la liste des entrées enregistrées
function getStoredEntries() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Enregistrer une nouvelle entrée
function saveEntry() {
  const dateValue = entryDateInput.value;
  const contentValue = entryContentInput.value.trim();

  // Vérification de la saisie
  if (!contentValue) {
    alert(t('alertEmptyEntry'));
    return;
  }

  const entries = getStoredEntries();

  // Objet représentant la nouvelle note
  const newEntry = {
    id: Date.now(), // Identifiant unique basé sur l'horodatage
    date: dateValue,
    content: contentValue,
    createdAt: new Date().toISOString()
  };

  // Ajouter au début du tableau (les plus récentes en premier)
  entries.unshift(newEntry);

  // Sauvegarder dans le navigateur
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));

  // Réinitialiser le champ texte
  entryContentInput.value = '';
  charCountEl.textContent = '0';

  // Rafraîchir l'affichage
  displayEntries();
}

// Supprimer une entrée par son ID
function deleteEntry(id) {
  if (confirm(t('confirmDeleteEntry'))) {
    let entries = getStoredEntries();
    entries = entries.filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    displayEntries();
  }
}

// ==========================================
// 3. AFFICHAGE DYNAMIQUE DANS LE DOM
// ==========================================

function displayEntries() {
  const entries = getStoredEntries();

  // Si le journal est vide
  if (entries.length === 0) {
    entriesContainer.innerHTML = `
      <div class="entry-card" style="text-align: center; color: var(--dark-gold);">
        <p><em>${t('noEntries')}</em></p>
      </div>
    `;
    return;
  }

  // Vider le conteneur avant d'injecter la liste
  entriesContainer.innerHTML = '';

  // Générer chaque carte HTML
  entries.forEach(entry => {
    const card = document.createElement('article');
    card.classList.add('entry-card');

    // Formater la date selon la langue active (ex: 2 août 2026 / August 2, 2026)
    const formattedDate = formatDate(entry.date);

    card.innerHTML = `
      <div class="entry-header">
        <span class="entry-date">${formattedDate}</span>
        <button class="btn-delete" onclick="deleteEntry(${entry.id})" title="${t('deleteTitle')}">🗑️</button>
      </div>
      <p class="entry-text">${escapeHTML(entry.content)}</p>
    `;

    entriesContainer.appendChild(card);
  });
}

// ==========================================
// 4. FONCTIONS UTILITAIRES & SÉCURITÉ
// ==========================================

// Formater la date "YYYY-MM-DD" selon la langue active
function formatDate(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  const dateObj = new Date(year, month - 1, day);

  return dateObj.toLocaleDateString(t('localeCode'), {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Protection contre l'injection de code (XSS)
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Attacher l'événement au bouton d'enregistrement
saveBtn.addEventListener('click', saveEntry);

// ==========================================
// 5. EXPORTATION & IMPORTATION DES DONNÉES
// ==========================================

/**
 * Exporte toutes les notes enregistrées dans un fichier JSON téléchargé localement.
 */
function exportEntriesJSON() {
  const entries = getStoredEntries();

  if (entries.length === 0) {
    alert(t('alertNoEntriesExport'));
    return;
  }

  // Conversion des données en chaîne JSON formatée
  const dataStr = JSON.stringify(entries, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });

  // Création d'un lien de téléchargement temporaire
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');

  // Nom du fichier avec la date du jour (ex: journal_backup_2026-08-02.json)
  const today = new Date().toISOString().split('T')[0];
  downloadAnchor.href = url;
  downloadAnchor.download = `journal_backup_${today}.json`;

  // Exécution du téléchargement
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();

  // Nettoyage du DOM
  document.body.removeChild(downloadAnchor);
  URL.revokeObjectURL(url);
}

/**
 * Importe des notes depuis un fichier JSON sauvegardé préalablement.
 */
function importEntriesJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedEntries = JSON.parse(e.target.result);

      if (!Array.isArray(importedEntries)) {
        throw new Error("Format invalide");
      }

      if (confirm(t('confirmImport', importedEntries.length))) {
        const currentEntries = getStoredEntries();

        // Fusion des entrées sans doublons d'ID
        const existingIds = new Set(currentEntries.map(entry => entry.id));
        const newEntries = importedEntries.filter(entry => !existingIds.has(entry.id));

        const updatedEntries = [...newEntries, ...currentEntries];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));

        displayEntries();
        alert(t('alertImportSuccess', newEntries.length));
      }
    } catch (err) {
      alert(t('alertImportError'));
    }
  };

  reader.readAsText(file);
}

// ==========================================
// 6. VERROUILLAGE PAR CODE PIN
// ==========================================
// Remarque : ceci reste une protection "basique" contre les regards indiscrets,
// pas un chiffrement fort. Les notes elles-mêmes ne sont pas chiffrées sur le
// disque, seul l'accès à l'interface est bloqué tant que le PIN n'est pas saisi.

// Convertit une chaîne en hash hexadécimal SHA-256 (avec sel)
async function hashPin(pin, saltHex) {
  const enc = new TextEncoder();
  const data = enc.encode(saltHex + ':' + pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Génère un sel aléatoire (hex)
function generateSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hasPin() {
  return !!localStorage.getItem(PIN_HASH_KEY);
}

async function setPin(pin) {
  const salt = generateSalt();
  const hash = await hashPin(pin, salt);
  localStorage.setItem(PIN_SALT_KEY, salt);
  localStorage.setItem(PIN_HASH_KEY, hash);
}

async function verifyPin(pin) {
  const salt = localStorage.getItem(PIN_SALT_KEY);
  const storedHash = localStorage.getItem(PIN_HASH_KEY);
  if (!salt || !storedHash) return false;
  const candidateHash = await hashPin(pin, salt);
  return candidateHash === storedHash;
}

function removePinStorage() {
  localStorage.removeItem(PIN_HASH_KEY);
  localStorage.removeItem(PIN_SALT_KEY);
}

function isValidPinFormat(pin) {
  return /^\d{4,12}$/.test(pin);
}

// --- Écran de verrouillage ---

function showLockScreen() {
  mainContent.hidden = true;
  navbar.classList.add('is-locked');
  lockOverlay.hidden = false;
  lockNowBtn.hidden = true;
  unlockPinInput.value = '';
  unlockError.hidden = true;
  setTimeout(() => unlockPinInput.focus(), 50);
}

function unlockJournal() {
  lockOverlay.hidden = true;
  mainContent.hidden = false;
  navbar.classList.remove('is-locked');
  displayEntries();
  hasPin().then(active => { lockNowBtn.hidden = !active; });
}

function lockNow() {
  showLockScreen();
}

unlockForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const attempt = unlockPinInput.value;
  const valid = await verifyPin(attempt);
  if (valid) {
    unlockJournal();
  } else {
    unlockError.hidden = false;
    unlockPinInput.value = '';
    unlockPinInput.focus();
  }
});

// --- Gestion du PIN dans la vue Confidentialité ---

async function refreshPinSettingsUI() {
  const active = await hasPin();
  pinSetBlock.hidden = active;
  pinManageBlock.hidden = !active;
  lockNowBtn.hidden = !active || mainContent.hidden;
}

async function handleSetPin() {
  const pin1 = document.getElementById('new-pin-1').value;
  const pin2 = document.getElementById('new-pin-2').value;
  const errorEl = document.getElementById('pin-set-error');
  errorEl.hidden = true;

  if (!isValidPinFormat(pin1)) {
    errorEl.textContent = t('pinSetErrorFormat');
    errorEl.hidden = false;
    return;
  }
  if (pin1 !== pin2) {
    errorEl.textContent = t('pinSetErrorMismatch');
    errorEl.hidden = false;
    return;
  }

  await setPin(pin1);
  document.getElementById('new-pin-1').value = '';
  document.getElementById('new-pin-2').value = '';
  await refreshPinSettingsUI();
  alert(t('pinSetSuccessAlert'));
}

async function handleChangePin() {
  const current = document.getElementById('current-pin').value;
  const newPin1 = document.getElementById('changed-pin-1').value;
  const newPin2 = document.getElementById('changed-pin-2').value;
  const errorEl = document.getElementById('pin-manage-error');
  const successEl = document.getElementById('pin-manage-success');
  errorEl.hidden = true;
  successEl.hidden = true;

  const ok = await verifyPin(current);
  if (!ok) {
    errorEl.textContent = t('pinManageErrorWrongCurrent');
    errorEl.hidden = false;
    return;
  }

  if (!newPin1 && !newPin2) {
    errorEl.textContent = t('pinManageErrorEmptyNew');
    errorEl.hidden = false;
    return;
  }
  if (!isValidPinFormat(newPin1)) {
    errorEl.textContent = t('pinManageErrorFormat');
    errorEl.hidden = false;
    return;
  }
  if (newPin1 !== newPin2) {
    errorEl.textContent = t('pinManageErrorMismatch');
    errorEl.hidden = false;
    return;
  }

  await setPin(newPin1);
  document.getElementById('current-pin').value = '';
  document.getElementById('changed-pin-1').value = '';
  document.getElementById('changed-pin-2').value = '';
  successEl.textContent = t('pinChangeSuccess');
  successEl.hidden = false;
}

async function handleRemovePin() {
  const current = document.getElementById('current-pin').value;
  const errorEl = document.getElementById('pin-manage-error');
  const successEl = document.getElementById('pin-manage-success');
  errorEl.hidden = true;
  successEl.hidden = true;

  const ok = await verifyPin(current);
  if (!ok) {
    errorEl.textContent = t('pinManageErrorWrongCurrent');
    errorEl.hidden = false;
    return;
  }

  if (!confirm(t('confirmRemovePin'))) return;

  removePinStorage();
  document.getElementById('current-pin').value = '';
  await refreshPinSettingsUI();
  alert(t('alertPinRemoved'));
}
