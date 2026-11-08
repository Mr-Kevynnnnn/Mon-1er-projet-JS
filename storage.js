/**
 * @module storage
 * @description Gestion de la persistance des données.
 *
 * Règle du cours (séance 4) :
 * → survit au navigateur = localStorage
 * → juste l'onglet en cours = sessionStorage
 *
 * Clés utilisées (exactement comme demandé dans l'énoncé) :
 *
 * sessionStorage :
 *   session:player   → nom unique du joueur actif dans cet onglet
 *   session:runState → état courant de la partie (nœud, prenom, inventaire)
 *
 * localStorage :
 *   players:index        → liste des joueurs connus sur ce navigateur
 *   player:<Nom>:state   → état complet de la partie pour ce joueur
 */

// ─── CLÉS DE STOCKAGE ─────────────────────────────────────────────────────────
// Séance 1 : const pour les valeurs qui ne changent jamais

const KEY_SESSION_PLAYER    = "session:player";
const KEY_SESSION_RUN_STATE = "session:runState";
const KEY_PLAYERS_INDEX     = "players:index";

/**
 * Retourne la clé localStorage pour un joueur donné.
 * @param {string} nom - Nom du joueur
 * @returns {string} La clé de stockage
 */
function getPlayerKey(nom) {
    return `player:${nom}:state`;
}

// ─── SESSION STORAGE ──────────────────────────────────────────────────────────

/**
 * Sauvegarde le nom du joueur actif dans sessionStorage.
 * Séance 4 : sessionStorage.setItem(clé, valeur)
 * @param {string} nom - Nom unique du joueur
 */
export function saveSessionPlayer(nom) {
    sessionStorage.setItem(KEY_SESSION_PLAYER, nom);
}

/**
 * Retourne le nom du joueur actif depuis sessionStorage.
 * @returns {string|null} Le nom du joueur, ou null si absent
 */
export function getSessionPlayer() {
    return sessionStorage.getItem(KEY_SESSION_PLAYER);
}

/**
 * Sauvegarde l'état courant de la partie dans sessionStorage.
 * Séance 4 : JSON.stringify() pour convertir un objet en texte
 * @param {Object} runState - État courant {sceneId, prenom, inventaire, flags}
 */
export function saveSessionRunState(runState) {
    sessionStorage.setItem(KEY_SESSION_RUN_STATE, JSON.stringify(runState));
}

/**
 * Retourne l'état courant de la partie depuis sessionStorage.
 * Séance 4 : JSON.parse() pour convertir le texte en objet
 * @returns {Object|null} L'état courant, ou null si absent
 */
export function getSessionRunState() {
    const raw = sessionStorage.getItem(KEY_SESSION_RUN_STATE);
    // Séance 2 : if ternaire → si raw existe, on le parse, sinon null
    return raw ? JSON.parse(raw) : null;
}

/**
 * Efface toutes les clés session:* (changer de joueur).
 * Séance 4 : sessionStorage.removeItem()
 */
export function clearSession() {
    sessionStorage.removeItem(KEY_SESSION_PLAYER);
    sessionStorage.removeItem(KEY_SESSION_RUN_STATE);
}

// ─── LOCAL STORAGE ────────────────────────────────────────────────────────────

/**
 * Retourne la liste de tous les joueurs connus sur ce navigateur.
 * Séance 4 : JSON.parse() pour lire un tableau stocké
 * @returns {string[]} Liste des prénoms
 */
export function getPlayersIndex() {
    const raw = localStorage.getItem(KEY_PLAYERS_INDEX);
    return raw ? JSON.parse(raw) : [];
}

/**
 * Vérifie si un joueur a déjà une partie sauvegardée.
 * Séance 3 : .includes() pour chercher dans un tableau
 * @param {string} nom - Nom du joueur
 * @returns {boolean} true si le joueur existe
 */
export function playerExists(nom) {
    return getPlayersIndex().includes(nom);
}

/**
 * Sauvegarde l'état complet d'un joueur dans localStorage (checkpoint).
 * Séance 4 : JSON.stringify() pour sauvegarder un objet
 * @param {string} nom       - Nom du joueur
 * @param {Object} runState  - État complet à sauvegarder
 */
export function savePlayerState(nom, runState) {
    // Ajouter le joueur à l'index s'il n'y est pas encore
    const index = getPlayersIndex();

    // Séance 2 : if pour éviter les doublons
    if (!index.includes(nom)) {
        index.push(nom);
        localStorage.setItem(KEY_PLAYERS_INDEX, JSON.stringify(index));
    }

    // Sauvegarder son état complet
    localStorage.setItem(getPlayerKey(nom), JSON.stringify(runState));
}

/**
 * Charge l'état complet d'un joueur depuis localStorage.
 * @param {string} nom - Nom du joueur
 * @returns {Object|null} L'état sauvegardé, ou null si absent
 */
export function loadPlayerState(nom) {
    const raw = localStorage.getItem(getPlayerKey(nom));
    return raw ? JSON.parse(raw) : null;
}

/**
 * Supprime toute la progression d'un joueur (clés player:<Nom>:*).
 * @param {string} nom - Nom du joueur
 */
export function deletePlayerState(nom) {
    localStorage.removeItem(getPlayerKey(nom));

    // Retirer le joueur de l'index
    const index = getPlayersIndex().filter(function(n) {
        return n !== nom;
    });
    localStorage.setItem(KEY_PLAYERS_INDEX, JSON.stringify(index));
}

/**
 * Crée un état de partie initial pour un nouveau joueur.
 * Séance 3 : créer un objet avec des propriétés
 * @param {string} prenom - Prénom du joueur
 * @returns {Object} État initial
 */
export function createInitialState(prenom) {
    return {
        sceneId:    "intro",   // scène de départ
        prenom:     prenom,    // prénom pour personnaliser le texte
        inventaire: [],        // objets collectés (tableau vide au départ)
        flags:      []         // drapeaux d'état (tableau vide au départ)
    };
}
