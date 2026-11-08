/**
 * @module game
 * @description Logique du jeu : progression dans l'histoire,
 *              gestion de l'état en mémoire et checkpoints.
 *              Ce module fait le lien entre les données et l'affichage.
 */

import { scenes, startScene } from "./data.js";
import {
    saveSessionRunState,
    getSessionRunState,
    savePlayerState,
    getSessionPlayer,
    createInitialState
} from "./storage.js";
import { afficherScene, montrerJeu } from "./ui.js";

// ─── ÉTAT EN MÉMOIRE ──────────────────────────────────────────────────────────
// Séance 1 : let = variable qui peut changer au fil du jeu

/** @type {Object|null} État courant de la partie en mémoire */
let runState = null;

// ─── FONCTIONS ────────────────────────────────────────────────────────────────

/**
 * Démarre une nouvelle partie pour un joueur.
 * Crée un état initial et lance la première scène.
 * @param {string} prenom - Prénom du joueur
 */
export function demarrerNouvellePartie(prenom) {
    // Séance 3 : createInitialState retourne un objet
    runState = createInitialState(prenom);

    // Sauvegarder l'état en session et en local (checkpoint)
    _sauvegarderEtat();

    // Afficher l'écran de jeu et la première scène
    montrerJeu();
    _afficherSceneCourante();
}

/**
 * Reprend une partie depuis un état sauvegardé.
 * @param {Object} etatSauvegarde - État chargé depuis localStorage
 */
export function reprendrePartie(etatSauvegarde) {
    runState = etatSauvegarde;

    // Resynchroniser la session avec l'état chargé
    _sauvegarderEtat();

    montrerJeu();
    _afficherSceneCourante();
}

/**
 * Reprend la partie depuis sessionStorage si elle existe.
 * Utilisé quand la page est rechargée (l'onglet est resté ouvert).
 * @returns {boolean} true si une session a été restaurée
 */
export function restaurerDepuisSession() {
    const etat = getSessionRunState();

    // Séance 2 : if pour vérifier si un état existe
    if (etat) {
        runState = etat;
        montrerJeu();
        _afficherSceneCourante();
        return true;
    }

    return false;
}

/**
 * Gère le choix du joueur : avance vers la scène suivante.
 * Séance 2 : fonction avec paramètre
 * @param {string} sceneId - Identifiant de la scène choisie
 */
export function faireUnChoix(sceneId) {
    // Séance 2 : if pour vérifier que la scène existe
    if (!scenes[sceneId]) {
        console.warn("Scène introuvable :", sceneId);
        return;
    }

    // Mettre à jour l'état courant en mémoire
    runState.sceneId = sceneId;

    // Sauvegarder l'état (session + localStorage checkpoint)
    _sauvegarderEtat();

    // Afficher la nouvelle scène
    _afficherSceneCourante();
}

// ─── FONCTIONS PRIVÉES ────────────────────────────────────────────────────────
// Préfixe _ = convention pour signaler qu'elles sont internes au module

/**
 * Affiche la scène correspondant à l'état courant.
 * @private
 */
function _afficherSceneCourante() {
    const scene = scenes[runState.sceneId];
    afficherScene(scene, runState.prenom, faireUnChoix);
}

/**
 * Sauvegarde l'état courant dans sessionStorage ET localStorage.
 * Séance 4 : les deux storages utilisés ensemble
 * @private
 */
function _sauvegarderEtat() {
    // sessionStorage → état de l'onglet en cours
    saveSessionRunState(runState);

    // localStorage → checkpoint persistant
    const nomJoueur = getSessionPlayer();
    if (nomJoueur) {
        savePlayerState(nomJoueur, runState);
    }
}
