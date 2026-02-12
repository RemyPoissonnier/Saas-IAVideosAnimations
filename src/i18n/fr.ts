const fr = {
  brand: {
    name: 'Whisker Studio'
  },
  nav: {
    generator: 'Générateur TikTok IA',
    login: 'Connexion',
    backHome: 'Retour au générateur',
    home: 'Accueil',
    tokens: 'Jetons',
    prompt: 'Prompt',
    promptOptions: {
      standard: 'Générateur Standard',
      slop: 'Générateur Slop'
    },
    selectAnimal: 'Choisir la page',
    settings: 'Paramètres',
    language: 'Langue',
    theme: 'Thème',
    logout: {
      cancel: 'Annuler',
      confirm: 'Confirmer',
      description: 'Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à vos vidéos et vos tokens.'
    }
  },
  landing: {
    title: 'Une plateforme unique pour vos rendus 2D et 3D',
    section1: {
      text: 'Décrivez simplement votre vision. Gemini agit comme votre scénariste personnel, transformant une simple phrase en une consigne riche de détails, de textures et de mouvements pour une précision inégalée.',
      title: 'Esquissez vos intentions'
    },
    section2: {
      text: 'Voyez vos concepts s\'animer avec la fluidité de Veo 3. Qu\'il s\'agisse d\'un effet papier découpé ou d\'une scène de film complexe, notre moteur de rendu capture chaque nuance pour un résultat vibrant d\'originalité.',
      title: 'Donnez vie au décor'
    },
    section3: {
      text: 'Gardez le contrôle total sur votre production. Ajustez, affinez et régénérez en un clic. Notre interface intuitive vous permet de sculpter vos vidéos comme si vous manipuliez de la pellicule réelle, la vitesse de l\'IA en plus.',
      title: 'Maîtrisez chaque image'
    },
    description: 'La référence de la création de contenu vidéo : transformez vos idées en chefs-d\'œuvre cinématographiques grâce à la puissance combinée de Veo 3 et de l\'intelligence créative de Gemini.'
  },
  prompt: {
    title: 'GÉNÉRATEUR',
    subtitle: 'Décrivez la scène et choisissez 2D ou 3D pour prévisualiser une idée.',
    simpleTitle: 'Mode rapide TikTok',
    simpleDesc: 'Tu as 20s ? Tape ton idée, choisis 2D ou 3D et lance le rendu.',
    button: 'Générer la vidéo',
    history: {
      title: 'Prompts Récents',
      usageHint: 'Cliquez à nouveau pour copier dans le presse-papier',
      copied: 'Copié !'
    },
    slop: {
      title: 'Générateur Slop',
      subtitle: 'Mélangez les catégories pour générer 5 variations virales.',
      sections: {
        unique: 'Éléments Centraux (Constants)',
        lists: 'Variables (Mélange & Match)'
      },
      fields: {
        action: 'Action',
        context: 'Contexte',
        cinematography: 'Cinématographie',
        subject: 'Sujet',
        style: 'Style & Ambiance',
        placeholders: {
          action: 'Mange des spaghettis avec les pattes...',
          context: 'Dans une cuisine néon futuriste...',
          cinematography: 'Ajouter angles (ex: Gros plan, Plan large)...',
          subject: 'Ajouter sujets (ex: Chat soyeux, Chien grincheux)...',
          style: 'Ajouter styles (ex: Cinématique, Pixar, VHS)...'
        }
      },
      button: 'GÉNÉRER 5 VARIATIONS',
      loading: 'GÉNÉRATION...',
      varLoading: 'Génération var #',
      download: 'Télécharger',
      downloadAll: 'Tout Télécharger (ZIP)',
      charLimit: 'caractères',
      limitReached: 'Limite atteinte (max 15 items par catégorie)'
    },
    resultTitle: 'Aperçu',
    outputFormat: 'Format de sortie',
    confirmRun: 'Je valide le rendu vidéo',
    confirmRequired: 'Valide le rendu avant de lancer.',
    toggleAdvanced: {
      show: 'Plus de réglages',
      hide: 'Masquer les réglages'
    },
    placeholder: 'Un chat mignon qui joue avec une pelote de laine...',
    mode: {
      _2d: '2D',
      _3d: '3D',
      full: 'Génération complète',
      imageToVideo: 'Vidéo à partir d’une image',
      textToVideo: 'Vidéo à partir d’un texte',
      character: 'Vidéo avec personnage pré-enregistré',
      extend: 'Extension de vidéo existante'
    },
    sample: {
      cat: 'Chat stylisé, décor pastel, caméra douce',
      dog: 'Chiot stylisé, herbe douce, caméra épaule'
    },
    model: {
      label: 'Modèle IA',
      nanobanan: 'nanobanan',
      runway: 'Runway-like',
      pika: 'Pika-like',
      luma: 'Luma-like'
    },
    generationMode: 'Mode de génération',
    visualStyle: 'Style visuel',
    style: {
      realistic: 'Réaliste',
      cartoon: 'Cartoon',
      anime: 'Anime',
      pixel: 'Pixel art',
      flat: 'Flat design',
      stylized: 'Stylisé / artistique'
    },
    palette: 'Palette de couleurs (optionnel)',
    character: 'Personnage',
    characterLibrary: 'Choisir un personnage enregistré',
    appearance: 'Apparence ou nouvelle description',
    expression: 'Expression dominante',
    voice: 'Voix',
    scene: 'Scène et environnement',
    scenePlaceholder: 'Lieu / décor, référence, ambiance',
    ambience: 'Ambiance (jour/nuit, dramatique...)',
    props: 'Accessoires et objets',
    camera: {
      static: 'Fixe',
      pan: 'Pan',
      zoom: 'Zoom',
      travel: 'Traveling',
      cinematic: 'Cinématique dynamique'
    },
    script: 'Scénario et actions',
    scriptPlaceholder: 'Script ou actions à exécuter',
    anim: {
      walk: 'Marche / course',
      talk: 'Parle',
      gesture: 'Gestuelle',
      wave: 'Saluer',
      type: 'Taper sur clavier'
    },
    duration: 'Durée de scène (ex. 15s)',
    audio: 'Audio & Voix',
    voiceTone: 'Timbre / style de voix',
    accent: 'Accent / langue',
    music: 'Musique de fond',
    lipsync: 'Synchronisation labiale',
    output: 'Format de sortie',
    resolution: 'Résolution',
    length: 'Longueur finale',
    label: {
      resolution: 'Résolution',
      ratio: 'Ratio',
      duration: 'Durée'
    },
    option: {
      youtube: '16:9 (Youtube)',
      tiktok: '9:16 (TikTok/Reel)'
    },
    enhance: {
      text: 'Tu es un ingénieur de prompt expert pour Google Veo. Ta mission est de réécrire les descriptions des utilisateurs pour les transformer en chefs-d\'œuvre cinématographiques, soit créatif. Tu as un maximum de 1500 caractéres. Voici le prompt => ',
      path: {
        loading: 'Magie en cours...',
        success: 'Prompt optimisé avec succès !',
        error: 'Échec de l\'amélioration du prompt.'
      },
      modal: {
        title: 'Optimiser votre prompt',
        description: 'Notre IA va réécrire votre texte pour obtenir le meilleur résultat vidéo.',
        warning: 'Cette action consommera {amount} tokens de votre solde.',
        confirm: 'Améliorer ({amount} tokens)',
        cancel: 'Attendre, je vais le faire moi-même'
      }
    },
    description: 'Décrivez simplement votre idée et choisissez le format.',
    exemple: {
      description1: 'Un chef-d\'œuvre cinématographique à couper le souffle utilisant un long travelling continu (longue prise). La vidéo commence dans une forêt primitive et brumeuse, avec une perspective dramatique en contre-plongée. De vieux chênes imposants s\'élèvent vers une canopée douce et éthérée où la lumière dorée du soleil filtre à travers des particules de poussière dansantes. La caméra glisse doucement vers l\'avant à un rythme régulier, capturant les textures hyper détaillées de la mousse et des fougères. Puis, grâce à une transition visuelle fluide ou cachée derrière un gros tronc d\'arbre, le décor se transforme en un grand boulevard parisien au crépuscule. La caméra conserve exactement le même mouvement de travelling en contre-plongée et la même vitesse. Les rues pavées de Paris remplacent le sol de la forêt, reflétant la lueur chaleureuse des lampadaires vintage et l\'architecture haussmannienne emblématique. Au loin, la silhouette de la tour Eiffel se détache sur un ciel indigo profond. Photoréaliste, 8k, tourné sur pellicule 35 mm, très détaillé, mouvement fluide, éclairage atmosphérique.',
      description2: 'Promenade cinématographique à New York, à l\'heure dorée. Une journaliste vive et tenace, équipée d\'un micro vintage, poursuit un homme charismatique, à l\'allure de milliardaire, vêtu d\'un costume sur mesure, à travers la foule animée de Manhattan. Caméra : plan latéral fluide, gros plan moyen. Elle demande avec insistance : « Monsieur, comment faites-vous pour rester aussi brillant ? » Sans s\'arrêter, il regarde l\'objectif avec un sourire confiant et répond : « C\'est simple... J\'utilise Whisker Studio. » L\'arrière-plan montre des taxis jaunes flous, de grands immeubles et des reflets de lentille. Photoréaliste, 8k, contraste élevé, faible profondeur de champ. Le dialogue est clair, le bruit de la ville est atténué pour laisser place à sa réponse. Éclairage cinématographique professionnel, textures nettes, mouvements fluides. Traduit avec DeepL.com (version gratuite)'
    },
    init: 'Gros plan cinématographique d\'un ours brun tout doux assis dans une forêt ensoleillée, racontant avec enthousiasme des blagues à un petit serpent vert enroulé sur une branche. L\'ours a des expressions faciales expressives et des lèvres qui bougent. Éclairage naturel, 4k, détails très précis, atmosphère fantaisiste.'
  },
  pricing: {
    title: 'Crédits et abonnements IA',
    subtitle: 'Choisissez des packs de jetons ou un abonnement mensuel pour vos rendus vidéo.',
    tokens: {
      title: 'Packs de jetons',
      desc: 'Utilisez les jetons pour les rendus IA (achat ponctuel).',
      starter: 'Starter · 5 000 tokens',
      pro: 'Pro · 15 000 tokens',
      studio: 'Studio · 50 000 tokens'
    },
    sub: {
      title: 'Abonnements',
      desc: 'Choisissez un plan récurrent pour un flux continu de rendus.',
      monthly: 'Mensuel',
      yearly: 'Annuel (-15%)'
    },
    cta: {
      buy: 'Acheter',
      subscribe: 'S\'abonner'
    },
    changeSub: 'Changer d\'abonnement',
    subscribe: 'S\'abonner',
    purchase: 'Acheter maintenant',
    currentPlan: 'Plan actuel',
    note: 'Les jetons sont consommés selon la durée, la résolution et le modèle IA.',
    simpleTitle: 'Une tarification simple et transparente'
  },
  authPage: {
    tagline: 'Accès sécurisé',
    title: 'Connectez-vous pour retrouver vos scripts',
    subtitle: 'Courte démo vidéo + connexion rapide. Sauvegarde locale chiffrée, reprise instantanée des générations.',
    point1: 'Connexion email ou réseaux sociaux en 1 clic',
    point2: 'Historique de scripts et hashtags conservé',
    point3: 'Interface claire inspirée de Creatify',
    videoFallback: 'Votre navigateur ne peut pas lire la vidéo.',
    videoHint: 'Remplacez /public/login-preview.mp4 et /public/login-poster.jpg par votre vidéo de présentation.'
  },
  auth: {
    title: 'Connexion rapide',
    subtitle: 'Test local — les données sont sauvegardées dans un JSON sur votre navigateur.',
    manualTitle: 'Connexion ou inscription classique',
    signedOut: 'Invité',
    signedIn: 'Connecté',
    name: 'Nom ou pseudo',
    email: 'Email',
    signin: 'Se connecter',
    signout: 'Déconnexion',
    password: 'Mot de passe',
    hint: 'Pas de vrai backend : on simule une session locale.',
    guest: 'Continuer en invité',
    guestRedirect: 'Vous serez redirigé vers la page de connexion/inscription.',
    socialTitle: 'Ou connectez-vous avec',
    social: {
      google: 'Google',
      apple: 'Apple',
      facebook: 'Facebook'
    },
    socialNote: 'Les connexions sociales sont simulées localement pour la démo.',
    signInTitle: 'Bon retour parmis nous',
    signInSubtitle: 'Bonjour',
    forgotPassword: {
      title: 'Mot de passe oublié ?',
      subtitle: 'Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.',
      emailLabel: 'Email',
      emailPlaceholder: 'email@exemple.com',
      buttonSend: 'Envoyer le lien',
      buttonLoading: 'Envoi en cours...',
      successMessage: 'Un email de réinitialisation a été envoyé ! Vérifiez vos spams.',
      error: {
        userNotFound: 'Aucun compte n\'est associé à cet email.',
        invalidEmail: 'L\'adresse email est invalide.',
        generic: 'Une erreur inattendue est survenue.',
        prefix: 'Erreur : '
      }
    },
    noAccount: 'Pas de compte ?',
    signupLink: 'Créez-en un.',
    loginRequired: 'Connectez-vous d\'abord !'
  },
  hero: {
    badge: 'Prototype minimal — IA vidéo chat',
    title: 'Générateur de vidéos TikTok IA dédié aux chats',
    lede: 'Préparez des scripts courts, des plans et des hashtags prêts à publier. Design minimaliste, data locale, parfait pour la phase alpha.',
    button: 'Lancer une génération'
  },
  form: {
    title: 'Angle de la vidéo (chat au centre)',
    catType: 'Chat vedette',
    tone: 'Ambiance',
    cta: 'Appel à l’action',
    duration: 'Durée cible (secondes)',
    language: 'Langue',
    generate: 'Générer et sauvegarder',
    notes: 'La génération est instantanée pour la démo. Support des autres animaux à venir.'
  },
  panel: {
    latest: 'Vos dernières idées',
    empty: 'Aucune génération enregistrée.',
    localjson: 'JSON local'
  },
  output: {
    script: 'Script proposé',
    shots: 'Plan par plan',
    hashtags: 'Hashtags',
    meta: 'Infos TikTok'
  },
  status: {
    ready: 'Prêt à poster',
    saved: 'Sauvegardé en local'
  },
  placeholder: {
    topic: 'Un chat explore un loft minimaliste',
    tone: 'Énergique, fun, un brin espiègle',
    cta: 'Abonne-toi pour d’autres hacks félins'
  },
  register: {
    email: 'Email',
    pw: 'Mot de passe',
    indication: 'Créez votre compte afin d\'accéder aux fonctionnalités',
    pseudo: 'Pseudo',
    pseudoPlaceholder: 'Votre pseudo',
    emailPlaceholder: 'email@exemple.com',
    confirmPw: 'Confirmer le mot de passe',
    loading: 'Chargement...',
    register: 'S\'inscrire',
    criteria: {
      length: '8+ caractères',
      upper: '1 Majuscule',
      lower: '1 Minuscule',
      digit: '1 Chiffre',
      special: '1 Caractère spécial'
    },
    error: {
      dontMatch: 'Les mots de passe ne correspondent pas.',
      pseudoAlUsed: 'Pseudo déjà utilisé',
      emailUsed: 'Cet email est déjà utilisé.',
      weakpw: 'Mot de passe trop faible',
      pw: 'Minimum 8 carateres, et au moins 1 lettre et 1 nombre',
      generic: 'Une erreur inattendue est survenue.',
      prefix: 'Erreur : '
    }
  },
  promo: {
    text: 'Vente Flash ! Obtenez -{{percent}}% sur tous les packs de tokens.',
    button: 'J\'en profite',
    code: 'CODE',
    offer: '🔥 OFFRE SPÉCIALE : -{percent}% avec le code {code} !'
  },
  legal: {
    title: 'Mentions Légales & Confidentialité IA',
    aiSection: {
      title: '4. Utilisation de l\'IA & Confidentialité',
      nature: {
        title: 'Nature du traitement',
        text: 'La Plateforme utilise des technologies d\'intelligence artificielle générative tierces (Modèles IA) telles que Vio ou Sora pour la création vidéo.'
      },
      data: {
        title: 'Transmission des données',
        text: 'En soumettant un prompt, vous acceptez qu\'il soit transmis via API aux fournisseurs de modèles. Ce transfert est strictement nécessaire à la génération.'
      },
      privacy: {
        title: 'Confidentialité',
        text: 'Nous ne vendons pas vos prompts. Nous activons les options de \'Non-entrainement\' (Zero Retention) chez nos fournisseurs lorsque c\'est techniquement possible.'
      },
      responsibility: {
        title: 'Responsabilité',
        text: 'L\'utilisateur reconnaît que les contenus IA peuvent présenter des similarités avec d\'autres contenus. L\'utilisateur est responsable de la vérification du contenu avant diffusion.'
      },
      disclaimer: 'Ce service utilise des modèles d\'IA générative. Les vidéos peuvent contenir des inexactitudes.'
    },
    pageTitle: 'Mentions Légales & CGV',
    pageSubtitle: 'Transparence, règles d\'utilisation et conditions de vente.',
    mentions: {
      title: '1. Mentions Légales',
      editor: 'RPIT, domicilié en France.',
      host: 'Hébergé par Vercel Inc. (USA) et Google Firebase (USA/EU).',
      contact: 'Contact support : contact@votre-domaine.com'
    },
    cgu: {
      title: '2. Conditions Générales d\'Utilisation (CGU)',
      intro: 'L\'accès au générateur implique l\'acceptation sans réserve des règles suivantes :',
      account: 'Vous êtes responsable de la confidentialité de vos identifiants.',
      use: 'Tout usage abusif ou illégal entraînera la suppression du compte.',
      content: 'Le service est fourni \'tel quel\', sans garantie de disponibilité permanente.'
    },
    cgv: {
      title: '3. Conditions Générales de Vente (CGV)',
      retractationWarning: 'RENONCEMENT AU DROIT DE RÉTRACTATION : En achetant des tokens, vous acceptez que la fourniture du contenu numérique commence immédiatement. Vous renoncez expressément à votre droit de rétractation de 14 jours.',
      price: 'Les prix sont indiqués en euros. Le paiement est sécurisé via Stripe.',
      delivery: 'Les tokens sont crédités immédiatement après validation du paiement.',
      refund: 'Aucun remboursement n\'est effectué une fois les tokens consommés ou après le début de l\'exécution du service.'
    },
    privacy: {
      title: '5. Politique de Confidentialité (RGPD)',
      intro: 'Nous nous engageons à protéger vos données personnelles conformément au RGPD.',
      collected: {
        title: 'Données Collectées',
        text: 'Nous collectons : adresse email, mot de passe chiffré, logs de connexion et historique de génération. Les données bancaires sont gérées exclusivement par Stripe.'
      },
      processors: {
        title: 'Sous-traitants',
        text: 'Vos données sont traitées par : Google Firebase (Auth/DB), Vercel (Hébergement), Stripe (Paiement) et nos fournisseurs IA (génération uniquement).'
      },
      rights: {
        title: 'Vos Droits',
        text: 'Vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données directement depuis votre compte ou via le support.'
      },
      cookies: {
        title: 'Cookies',
        text: 'Nous utilisons des cookies strictement nécessaires à l\'authentification et des cookies optionnels de performance (si acceptés).'
      }
    }
  },
  about: {
    title: 'À Propos',
    subtitle: 'Quand la passion des animaux rencontre l\'intelligence artificielle.',
    mission: {
      title: 'Notre Mission',
      text: 'Permettre à chaque créateur, même sans compétence technique, de donner vie à des histoires drôles et touchantes avec ses animaux préférés grâce aux dernières technologies d\'IA générative.'
    },
    story: {
      title: 'Notre Histoire',
      text: 'Né d\'un constat simple : créer une animation 3D de qualité d\'un chat ou d\'un chien prenait des semaines. Aujourd\'hui, avec notre moteur connectant Vio, Sora et nos modèles maison, cela prend quelques secondes.'
    },
    values: {
      title: 'Nos Valeurs',
      innovation: 'Innovation : Toujours intégrer les derniers modèles (Vio, Sora).',
      transparency: 'Transparence : Prix clairs, respect des artistes et des données.',
      fun: 'Fun : La technologie doit rester un jeu et un outil de création.'
    }
  },
  cookie: {
    title: 'Gestion des données',
    text: 'Nous respectons votre vie privée. Conformément à la réglementation, nous demandons votre accord pour utiliser des cookies d\'analyse et de performance IA.',
    accept: 'Tout accepter',
    decline: 'Refuser',
    policy: 'Politique de confidentialité'
  },
  footer: {
    manageCookies: 'Gérer les cookies',
    tagline: 'Créez des vidéos d\'animaux époustouflantes grâce à la puissance de l\'intelligence artificielle générative.',
    product: {
      title: 'Produit',
      generator: 'Générateur',
      pricing: 'Tarifs & Tokens',
      showcase: 'Galerie',
      changelog: 'Nouveautés'
    },
    resources: {
      title: 'Ressources',
      docs: 'Documentation',
      api: 'API Docker',
      community: 'Communauté',
      support: 'Support'
    },
    legal: {
      title: 'Légal',
      about: 'À propos',
      privacy: 'Confidentialité',
      terms: 'CGU / CGV'
    },
    rights: 'Tous droits réservés.',
    madeWith: 'Fait avec ❤️ en France'
  },
  common: {
    na: 'N/A',
    currency: '€'
  },
  subscription: {
    title: 'Gestion de l\'abonnement',
    mySub: 'Mon Abonnement',
    tier: 'Niveau :',
    name: 'Nom :',
    endDate: 'Fin de période :',
    cancel: 'Annulation prévue :',
    yes: 'Oui',
    no: 'Non',
    empty: 'Aucun abonnement actif'
  },
  showcase: 'Demonstration',
  start: 'Commencer'
};

export default fr;