/**
 * @module ui
 * @description Gestion de l'affichage : toutes les manipulations du DOM.
 *              Ce module s'occupe uniquement de ce que l'utilisateur voit.
 *              Séance 3 : querySelector, textContent, classList
 *              Séance 4 : template, cloneNode, dataset, classList
 */

// ─── SÉLECTION DES ÉLÉMENTS DOM ───────────────────────────────────────────────
// Séance 3 : querySelector sélectionne le PREMIER élément trouvé

const ecranFormulaire    = document.querySelector("#ecran-formulaire");
const ecranReprise       = document.querySelector("#ecran-reprise");
const ecranJeu           = document.querySelector("#ecran-jeu");

const nomJoueurReprise   = document.querySelector("#nom-joueur-reprise");

const imageScene         = document.querySelector("#image-scene");
const titreScene         = document.querySelector("#titre-scene");
const texteScene         = document.querySelector("#texte-scene");
const zoneChoix          = document.querySelector("#zone-choix");
const zoneFin            = document.querySelector("#zone-fin");
const texteFin           = document.querySelector("#texte-fin");

// Séance 4 : récupérer le <template> pour le cloner ensuite
const templateChoix      = document.querySelector("#template-choix");

// ─── FONCTIONS D'AFFICHAGE ────────────────────────────────────────────────────

/**
 * Affiche un écran et cache tous les autres.
 * Séance 4 : classList.add("hidden") / classList.remove("hidden")
 * @param {HTMLElement} ecranAMontrer - L'écran à rendre visible
 */
export function afficherEcran(ecranAMontrer) {
    // Séance 3 : tableau de tous les écrans
    const tousLesEcrans = [ecranFormulaire, ecranReprise, ecranJeu];

    // Séance 3 : forEach pour parcourir et cacher chaque écran
    tousLesEcrans.forEach(function(ecran) {
        ecran.classList.add("hidden");
    });

    // Afficher uniquement le bon écran
    ecranAMontrer.classList.remove("hidden");
}

/**
 * Affiche l'écran de formulaire.
 */
export function montrerFormulaire() {
    afficherEcran(ecranFormulaire);
}

/**
 * Affiche l'écran de reprise avec le nom du joueur.
 * @param {string} prenom - Nom du joueur à afficher
 */
export function montrerEcranReprise(prenom) {
    // Séance 3 : textContent pour modifier le texte d'un élément
    nomJoueurReprise.textContent = prenom;
    afficherEcran(ecranReprise);
}

/**
 * Affiche l'écran de jeu.
 */
export function montrerJeu() {
    afficherEcran(ecranJeu);
}

/**
 * Remplace {prenom} dans un texte par le vrai prénom du joueur.
 * Séance 1 : manipulation de string
 * @param {string} texte  - Texte brut avec {prenom}
 * @param {string} prenom - Prénom du joueur
 * @returns {string} Texte personnalisé
 */
export function personnaliserTexte(texte, prenom) {
    return texte.replace(/\{prenom\}/g, prenom);
}

/**
 * Rend une scène dans le DOM.
 * Séance 3 : accès aux propriétés d'un objet (scene.titre, scene.texte)
 * Séance 4 : template.content.cloneNode(true), dataset, addEventListener
 * @param {import("./data.js").Scene} scene     - La scène à afficher
 * @param {string}                    prenom    - Prénom du joueur
 * @param {Function}                  onChoix   - Callback appelé avec l'id de la scène suivante
 */
export function afficherScene(scene, prenom, onChoix) {
    // Mettre à jour le titre et le texte (séance 3 : textContent)
    titreScene.textContent = scene.titre;
    texteScene.textContent = personnaliserTexte(scene.texte, prenom);

    // Mettre à jour l'image
    imageScene.src = scene.image;
    imageScene.alt = scene.titre;

    // Vider les anciens boutons de choix
    zoneChoix.innerHTML = "";

    // Cacher la zone de fin
    zoneFin.classList.add("hidden");

    // Séance 2 : if → si c'est une fin, afficher la zone de fin
    if (scene.estFin === true) {
        texteScene.textContent = "";
        texteFin.textContent   = personnaliserTexte(scene.texte, prenom);
        zoneFin.classList.remove("hidden");
        return;
    }

    // Créer les boutons de choix avec le <template>
    // Séance 3 : forEach pour parcourir le tableau des choix
    scene.choix.forEach(function(choix) {

        // Séance 4 : cloner le template (deep clone = true)
        const clone = templateChoix.content.cloneNode(true);
        const btn   = clone.querySelector(".bouton-choix");

        // Remplir le texte du bouton (séance 3 : textContent)
        btn.textContent = choix.texte;

        // Séance 4 : data-* pour stocker la scène suivante dans le HTML
        btn.dataset.suivant = choix.suivant;

        // Séance 4 : addEventListener pour écouter le clic
        btn.addEventListener("click", function(e) {
            // Séance 4 : lire dataset pour récupérer la scène suivante
            const sceneSuivante = e.currentTarget.dataset.suivant;
            onChoix(sceneSuivante);
        });

        zoneChoix.appendChild(clone);
    });
}

// ─── EXPORTS DES RÉFÉRENCES DOM ───────────────────────────────────────────────
// Exportés pour que main.js puisse y attacher des événements

export { ecranJeu };
