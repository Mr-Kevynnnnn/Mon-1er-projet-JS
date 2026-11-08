/**
 * @module main
 * @description Point d'entrée de l'application.
 *              Gère le formulaire, la session et orchestre les modules.
 *              Séance 4 : addEventListener, sessionStorage, localStorage
 */

import {
    saveSessionPlayer,
    getSessionPlayer,
    clearSession,
    playerExists,
    loadPlayerState,
    deletePlayerState
} from "./modules/storage.js";

import {
    montrerFormulaire,
    montrerEcranReprise,
    montrerJeu
} from "./modules/ui.js";

import {
    demarrerNouvellePartie,
    reprendrePartie,
    restaurerDepuisSession
} from "./modules/game.js";

// ─── SÉLECTION DOM ────────────────────────────────────────────────────────────
// Séance 3 : querySelector pour sélectionner les éléments

const formulaire        = document.querySelector("#formulaire");
const champPrenom       = document.querySelector("#champ-prenom");
const champAge          = document.querySelector("#champ-age");

const btnReprendre      = document.querySelector("#btn-reprendre");
const btnNouvellePartie = document.querySelector("#btn-nouvelle-partie");
const btnChangerJoueur  = document.querySelector("#btn-changer-joueur");
const btnRejouer        = document.querySelector("#btn-rejouer");

// ─── INITIALISATION ───────────────────────────────────────────────────────────

/**
 * Initialise l'application au chargement de la page.
 * Vérifie si une session est active (onglet rechargé).
 */
function init() {
    // Essayer de restaurer une session existante
    // (l'onglet a été rechargé mais pas fermé)
    const sessionRestauree = restaurerDepuisSession();

    // Séance 2 : if → si pas de session, afficher le formulaire
    if (!sessionRestauree) {
        montrerFormulaire();
    }
}

// Lancer l'initialisation
init();

// ─── ÉVÉNEMENTS ───────────────────────────────────────────────────────────────
// Séance 4 : addEventListener pour réagir aux actions du joueur

/**
 * Soumission du formulaire.
 * Séance 4 : "submit" + e.preventDefault()
 */
formulaire.addEventListener("submit", function(e) {
    // Empêche le rechargement de la page (comportement par défaut du formulaire)
    e.preventDefault();

    // Séance 1 : .trim() pour supprimer les espaces inutiles
    const prenom = champPrenom.value.trim();

    // Séance 2 : if pour valider que le champ n'est pas vide
    if (prenom === "") {
        alert("Merci d'entrer ton prénom !");
        return;
    }

    // Séance 4 : sessionStorage → enregistrer session:player
    saveSessionPlayer(prenom);

    // Séance 2 : if/else → ce joueur a-t-il déjà une partie ?
    if (playerExists(prenom)) {
        // Oui → proposer Reprendre ou Nouvelle partie
        montrerEcranReprise(prenom);
    } else {
        // Non → démarrer directement
        demarrerNouvellePartie(prenom);
    }
});

/**
 * Bouton "Reprendre" : charge la partie sauvegardée.
 * Séance 4 : localStorage → charger player:<Nom>:state
 */
btnReprendre.addEventListener("click", function() {
    const prenom = getSessionPlayer();
    const etatSauvegarde = loadPlayerState(prenom);

    if (etatSauvegarde) {
        reprendrePartie(etatSauvegarde);
    } else {
        // Sécurité : si l'état est absent, nouvelle partie
        demarrerNouvellePartie(prenom);
    }
});

/**
 * Bouton "Nouvelle partie" : efface l'ancienne progression.
 * Séance 4 : localStorage → supprimer player:<Nom>:state
 */
btnNouvellePartie.addEventListener("click", function() {
    const prenom = getSessionPlayer();
    // Effacer les clés player:<Nom>:* en localStorage
    deletePlayerState(prenom);
    demarrerNouvellePartie(prenom);
});

/**
 * Bouton "Changer de joueur" : efface la session courante.
 * Séance 4 : sessionStorage → effacer session:*
 */
btnChangerJoueur.addEventListener("click", function() {
    // Effacer session:player et session:runState
    clearSession();
    // Recharger la page → retour au formulaire
    location.reload();
});

/**
 * Bouton "Rejouer" (affiché à la fin de l'histoire).
 * Repart de zéro pour ce joueur.
 */
btnRejouer.addEventListener("click", function() {
    const prenom = getSessionPlayer();
    // Effacer la progression sauvegardée
    deletePlayerState(prenom);
    // Effacer la session
    clearSession();
    // Recharger la page
    location.reload();
});
