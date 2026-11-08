/**
 * @module data
 * @description Données de l'histoire : scènes, choix et fins.
 *              Chaque choix mène vers un nœud différent (vrais embranchements).
 *
 * CARTE DES NŒUDS (16 nœuds au total) :
 *
 *                        intro
 *                    /    |    \
 *               foot1   code1  cuisine1
 *               /  \    /  \    /  \
 *        foot2  foot_doute code2 cuisine2
 *         / \              / \      / \
 *  foot_courage foot_sage code_bts code_startup cuisine_dur cuisine_voyage
 *       \          /          \      /               \           /
 *      foot_fin           code_fin               cuisine_fin
 */

/** @type {string} Identifiant de la scène de départ */
export const startScene = "intro";

/**
 * @typedef {Object} Choix
 * @property {string} texte   - Texte affiché sur le bouton
 * @property {string} suivant - Identifiant de la scène suivante
 */

/**
 * @typedef {Object} Scene
 * @property {string}   titre    - Titre de la scène
 * @property {string}   texte    - Texte narratif (peut contenir {prenom})
 * @property {string}   image    - Chemin vers l'image PNG
 * @property {Choix[]}  choix    - Liste des choix proposés
 * @property {boolean}  [estFin] - true si c'est une fin de l'histoire
 */

/**
 * Toutes les scènes de l'histoire.
 * Séance 3 : objet dont chaque propriété est elle-même un objet.
 * @type {Object.<string, Scene>}
 */
export const scenes = {

    // ════════════════════════════════════════════════
    // NŒUD 1 — DÉPART
    // ════════════════════════════════════════════════
    intro: {
        titre: "Le Carrefour de ta Vie",
        texte: "Bonjour {prenom} ! Tu as 16 ans. Ce matin, trois chemins s'offrent à toi. Le coach de foot t'attend au stade. Ton cousin te propose de coder avec lui. Le lycée pro ouvre ses portes aujourd'hui. Qu'est-ce que tu choisis ?",
        image: "images/intro.png",
        choix: [
            { texte: "⚽ Aller au stade de foot",        suivant: "foot1"    },
            { texte: "💻 Rejoindre mon cousin codeur",   suivant: "code1"    },
            { texte: "🍳 Visiter le lycée pro cuisine",  suivant: "cuisine1" }
        ]
    },

    // ════════════════════════════════════════════════
    // BRANCHE FOOTBALL (nœuds 2 → 7)
    // ════════════════════════════════════════════════

    // NŒUD 2
    foot1: {
        titre: "Le Stade Municipal",
        texte: "Le coach Marco te regarde courir. Il s'approche : « Tu as du talent, {prenom}. Mais ici on s'entraîne 5 fois par semaine. Tu es prêt à tout donner ? »",
        image: "images/foot1.png",
        choix: [
            { texte: "💪 Oui ! Je suis prêt à tout donner",  suivant: "foot2"      },
            { texte: "😰 C'est beaucoup… je ne sais pas",    suivant: "foot_doute" }
        ]
    },

    // NŒUD 3 — chemin du doute
    foot_doute: {
        titre: "Le Doute",
        texte: "Tu rentres chez toi sans t'inscrire. Deux jours plus tard, ton ami Lucas t'appelle : « Il reste une dernière place. C'est maintenant ou jamais, {prenom}. »",
        image: "images/foot_doute.png",
        choix: [
            { texte: "⚽ Je retourne m'inscrire !",     suivant: "foot2" },
            { texte: "🔄 Non, je préfère autre chose",  suivant: "intro" }
        ]
    },

    // NŒUD 4
    foot2: {
        titre: "Les Entraînements",
        texte: "Les semaines passent. Tu transpires, tu tombes, tu te relèves. Marco t'annonce qu'un recruteur vient te voir samedi. La veille du match, tu as 38,5° de fièvre. Que fais-tu ?",
        image: "images/foot2.png",
        choix: [
            { texte: "🤒 Je joue quand même, c'est ma chance !",  suivant: "foot_courage" },
            { texte: "🛏️ Je me repose et je préviens le coach",  suivant: "foot_sage"    }
        ]
    },

    // NŒUD 5 — chemin courageux (jouer malade)
    foot_courage: {
        titre: "Le Match Malgré Tout",
        texte: "Tu joues avec la fièvre. Tu souffres mais tu te bats. À la 80ème minute, tu marques le but décisif. Le recruteur te rejoint dans les vestiaires : « Je n'ai jamais vu autant de détermination chez un jeune. Tu signes quand tu veux. »",
        image: "images/foot2.png",
        choix: [
            { texte: "✍️ Signer le contrat immédiatement !",  suivant: "foot_fin" }
        ]
    },

    // NŒUD 6 — chemin sage (se reposer)
    foot_sage: {
        titre: "La Bonne Décision",
        texte: "Marco apprécie ta maturité : « Un vrai professionnel connaît ses limites. » Le recruteur revient deux semaines plus tard. Reposé et en pleine forme, tu réalises le meilleur match de ta vie. Il te propose un contrat sur-le-champ.",
        image: "images/foot2.png",
        choix: [
            { texte: "✍️ Signer le contrat immédiatement !",  suivant: "foot_fin" }
        ]
    },

    // NŒUD 7 — FIN FOOTBALL
    foot_fin: {
        titre: "⚽ FIN — Footballeur Professionnel",
        texte: "Deux ans plus tard, {prenom} porte fièrement le maillot de l'équipe première. En entrant sur le terrain pour ton premier match officiel, les supporters scandent ton nom. Tout ce travail, tous ces sacrifices... Tu as réalisé ton rêve.",
        image: "images/foot_fin.png",
        choix: [],
        estFin: true
    },

    // ════════════════════════════════════════════════
    // BRANCHE INFORMATIQUE (nœuds 8 → 12)
    // ════════════════════════════════════════════════

    // NŒUD 8
    code1: {
        titre: "La Startup de Karim",
        texte: "Ton cousin Karim installe {prenom} devant un ordinateur. « Je vais t'apprendre Python. » En deux heures, tu crées ton premier programme. Quelque chose s'allume en toi. Tu veux continuer ?",
        image: "images/code1.png",
        choix: [
            { texte: "🔥 C'est incroyable, je veux continuer !",  suivant: "code2" },
            { texte: "😐 C'est trop compliqué, je rentre",         suivant: "intro" }
        ]
    },

    // NŒUD 9
    code2: {
        titre: "Le Hackathon",
        texte: "Karim inscrit {prenom} à un hackathon régional. 24h pour créer une application. Ton équipe termine 2ème. La cheffe du jury te dit : « Tu as un don naturel. » Maintenant, quelle voie choisis-tu ?",
        image: "images/code2.png",
        choix: [
            { texte: "🎓 Viser un BTS Informatique",      suivant: "code_bts"     },
            { texte: "🚀 Rejoindre la startup de Karim",  suivant: "code_startup" }
        ]
    },

    // NŒUD 10 — chemin BTS
    code_bts: {
        titre: "Le BTS SIO",
        texte: "{prenom} intègre un BTS Services Informatiques. Les cours sont intenses mais passionnants. En deuxième année, tu développes une application mobile pour ton projet de fin d'études. Ton professeur la soumet à un concours national.",
        image: "images/code2.png",
        choix: [
            { texte: "🏆 Présenter le projet au concours !",  suivant: "code_fin" }
        ]
    },

    // NŒUD 11 — chemin startup
    code_startup: {
        titre: "La Vie en Startup",
        texte: "{prenom} rejoint la startup de Karim. Les journées sont longues mais tu apprends à une vitesse folle. Six mois après ton arrivée, vous levez 50 000€ de financement. C'est le décollage.",
        image: "images/code2.png",
        choix: [
            { texte: "🚀 Continuer à construire la startup !",  suivant: "code_fin" }
        ]
    },

    // NŒUD 12 — FIN INFORMATIQUE
    code_fin: {
        titre: "💻 FIN — Informaticien",
        texte: "À 22 ans, {prenom} voit son application dépasser 100 000 téléchargements. Karim envoie un message : « Je t'avais dit que tu avais un don ! » Tu souris devant tes écrans. Le code est ton langage, et tu le parles couramment.",
        image: "images/code_fin.png",
        choix: [],
        estFin: true
    },

    // ════════════════════════════════════════════════
    // BRANCHE CUISINE (nœuds 13 → 16)
    // ════════════════════════════════════════════════

    // NŒUD 13
    cuisine1: {
        titre: "Le Lycée Professionnel",
        texte: "Un chef en tablier blanc tend une cuillère à {prenom}. Tu goûtes un velouté de butternut. Tu fermes les yeux. C'est la meilleure chose que tu aies jamais mangée. Tu t'inscris en CAP Cuisine.",
        image: "images/cuisine1.png",
        choix: [
            { texte: "👨‍🍳 Je m'inscris en CAP Cuisine !",          suivant: "cuisine2" },
            { texte: "🤔 Je regarde d'abord les autres ateliers",  suivant: "cuisine2" }
        ]
    },

    // NŒUD 14
    cuisine2: {
        titre: "La Cuisine Professionnelle",
        texte: "Le chef Bertrand est exigeant mais juste. Un soir il dit à {prenom} : « Ton plat est bon, mais la présentation est bâclée. Recommence. » Que fais-tu ?",
        image: "images/cuisine2.png",
        choix: [
            { texte: "🔁 Je recommence sans me plaindre",    suivant: "cuisine_dur"    },
            { texte: "🌍 Je pars en stage à l'étranger",     suivant: "cuisine_voyage" }
        ]
    },

    // NŒUD 15 — chemin perfectionniste
    cuisine_dur: {
        titre: "La Perfection",
        texte: "{prenom} recommence le plat encore et encore. À minuit, Bertrand revient en cuisine. Il goûte en silence, puis dit : « Voilà. C'est ça la cuisine. » Il te recommande pour un stage dans un palace parisien.",
        image: "images/cuisine2.png",
        choix: [
            { texte: "⭐ Accepter le stage au palace !",  suivant: "cuisine_fin" }
        ]
    },

    // NŒUD 16 — chemin voyageur
    cuisine_voyage: {
        titre: "Le Stage à Tokyo",
        texte: "{prenom} part six mois au Japon. Tu découvres la précision de la cuisine japonaise, ses textures, ses saveurs inédites. Tu reviens en France transformé, avec une cuisine qui mélange deux cultures. Les critiques sont épatés.",
        image: "images/cuisine2.png",
        choix: [
            { texte: "⭐ Ouvrir mon propre restaurant !",  suivant: "cuisine_fin" }
        ]
    },

    // NŒUD 17 — FIN CUISINE
    cuisine_fin: {
        titre: "👨‍🍳 FIN — Chef Cuisinier",
        texte: "À 25 ans, {prenom} est Chef de Partie dans un restaurant deux étoiles Michelin. Un critique gastronomique écrit : « Une cuisine qui raconte une histoire. » Tu repenses à cette première cuillère de velouté qui a tout déclenché.",
        image: "images/cuisine_fin.png",
        choix: [],
        estFin: true
    }

};
