/* ================================================
   DISNEY+ - script.js
   Projet BTS SIO - 2ème année

   Ce fichier fonctionne pour les deux pages :
   index.html (français) et index-en.html (anglais)
   ================================================ */


/* ------------------------------------------------
   1. FONCTION DE DÉFILEMENT
   Fait défiler la page jusqu'à une section précise
   quand on clique sur la flèche dans le hero.
   ------------------------------------------------ */

/**
 * scrollToSection() - Défile vers une section de la page
 * @param {string} idSection - L'identifiant (id) de la section cible
 */
function scrollToSection(idSection) {

    /* On récupère l'élément HTML qui a cet id */
    var sectionCible = document.getElementById(idSection);

    /* Vérifie que l'élément existe avant d'agir */
    if (sectionCible) {
        sectionCible.scrollIntoView({
            behavior: 'smooth'  /* défilement animé (fluide) */
        });
    }
}


/* ------------------------------------------------
   2. ACCORDÉON FAQ
   Ouvre ou ferme une réponse quand on clique
   sur une question.
   ------------------------------------------------ */

/**
 * toggleFaq() - Ouvre/ferme une question de la FAQ
 * @param {HTMLElement} bouton - Le bouton de question qui a été cliqué
 */
function toggleFaq(bouton) {

    /* On récupère l'élément juste après le bouton (la réponse) */
    var reponse = bouton.nextElementSibling;

    /* On vérifie si cette réponse est déjà ouverte */
    var estOuverte = reponse.classList.contains('open');

    /* --- Ferme toutes les questions ouvertes --- */
    var toutesLesReponses = document.querySelectorAll('.faq-answer');
    var tousLesBoutons    = document.querySelectorAll('.faq-question');

    /* Boucle sur chaque réponse pour la fermer */
    for (var i = 0; i < toutesLesReponses.length; i++) {
        toutesLesReponses[i].classList.remove('open');
    }

    /* Boucle sur chaque bouton pour retirer le style "ouvert" */
    for (var j = 0; j < tousLesBoutons.length; j++) {
        tousLesBoutons[j].classList.remove('open');
    }

    /* --- Ouvre la question cliquée (seulement si elle était fermée) --- */
    if (!estOuverte) {
        reponse.classList.add('open');
        bouton.classList.add('open');
    }
    /* Si elle était déjà ouverte, on ne fait rien (elle a déjà été fermée au-dessus) */
}


/* ------------------------------------------------
   3. VALIDATION DU FORMULAIRE E-MAIL
   Vérifie que l'e-mail saisi est valide
   avant de valider l'inscription.
   ------------------------------------------------ */

/**
 * estEmailValide() - Vérifie le format d'une adresse e-mail
 * Utilise une expression régulière (regex) pour valider.
 * @param {string} email - L'adresse e-mail à vérifier
 * @returns {boolean} - true si valide, false sinon
 */
function estEmailValide(email) {
    /* Expression régulière : vérifie le format quelquechose@quelquechose.quelquechose */
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email); /* test() renvoie true ou false */
}

/**
 * handleSignUp() - Appelée au clic sur le bouton S'inscrire / Sign Up
 * Valide l'e-mail et affiche un message à l'utilisateur.
 */
function handleSignUp() {

    /* Récupère l'élément input par son id */
    var champEmail = document.getElementById('emailInput');

    /* Récupère la valeur saisie et supprime les espaces inutiles */
    var email = champEmail.value.trim();

    /* --- Cas 1 : champ vide --- */
    if (email === '') {
        alert('Veuillez saisir votre adresse e-mail.');

    /* --- Cas 2 : format invalide --- */
    } else if (!estEmailValide(email)) {
        alert('Veuillez saisir une adresse e-mail valide (ex : nom@exemple.com)');

    /* --- Cas 3 : e-mail valide --- */
    } else {
        /* Dans un vrai projet, on enverrait les données à un serveur ici */
        alert('Merci ! Vous allez recevoir une confirmation à : ' + email);
        champEmail.value = ''; /* Vide le champ après soumission */
    }
}


/* ------------------------------------------------
   4. ANIMATION AU DÉFILEMENT (Scroll Reveal)
   Les éléments apparaissent progressivement
   lorsque l'utilisateur fait défiler la page.

   On utilise l'API IntersectionObserver du navigateur :
   elle déclenche une fonction quand un élément
   devient visible dans la fenêtre.
   ------------------------------------------------ */

/**
 * initialiserScrollReveal() - Met en place les animations au défilement
 */
function initialiserScrollReveal() {

    /* On sélectionne les éléments à animer */
    var elementsAAnimer = document.querySelectorAll('.feature-item, .device-card');

    /* Création de l'observateur
       threshold: 0.1 = se déclenche quand 10% de l'élément est visible */
    var observateur = new IntersectionObserver(function(entries) {

        /* entries = liste des éléments observés */
        entries.forEach(function(entry) {

            /* Si l'élément est visible à l'écran */
            if (entry.isIntersecting) {

                /* On le rend visible (le CSS fait la transition) */
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                /* On arrête d'observer cet élément (l'animation ne se rejoue pas) */
                observateur.unobserve(entry.target);
            }
        });

    }, { threshold: 0.1 });

    /* On démarre l'observation pour chaque élément */
    for (var i = 0; i < elementsAAnimer.length; i++) {
        observateur.observe(elementsAAnimer[i]);
    }
}


/* ------------------------------------------------
   5. INITIALISATION
   Ce bloc s'exécute quand toute la page HTML
   est chargée et prête.
   ------------------------------------------------ */

/* DOMContentLoaded : attend que le HTML soit entièrement chargé */
document.addEventListener('DOMContentLoaded', function() {

    /* Lance les animations au défilement */
    initialiserScrollReveal();

    /* Permet aussi de valider le formulaire avec la touche Entrée */
    var champEmail = document.getElementById('emailInput');
    if (champEmail) {
        champEmail.addEventListener('keypress', function(evenement) {
            /* event.key === 'Enter' : l'utilisateur a appuyé sur Entrée */
            if (evenement.key === 'Enter') {
                handleSignUp();
            }
        });
    }

    /* Message de confirmation dans la console du navigateur (F12) */
    console.log('Script Disney+ chargé avec succès !');
});
