import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

type Locale = 'fr' | 'en'

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: keyof typeof translations['fr']) => string
}

const translations = {
  fr: {
    'brand.name': 'Whisker Studio',
    'nav.generator': 'Générateur TikTok IA',
    'nav.login': 'Connexion',
    'nav.backHome': 'Retour au générateur',
    'authPage.tagline': 'Accès sécurisé',
    'authPage.title': 'Connectez-vous pour retrouver vos scripts',
    'authPage.subtitle': 'Courte démo vidéo + connexion rapide. Sauvegarde locale chiffrée, reprise instantanée des générations.',
    'authPage.point1': 'Connexion email ou réseaux sociaux en 1 clic',
    'authPage.point2': 'Historique de scripts et hashtags conservé',
    'authPage.point3': 'Interface claire inspirée de Creatify',
    'authPage.videoFallback': 'Votre navigateur ne peut pas lire la vidéo.',
    'authPage.videoHint': 'Remplacez /public/login-preview.mp4 et /public/login-poster.jpg par votre vidéo de présentation.',
    'auth.signedOut': 'Invité',
    'auth.signedIn': 'Connecté',
    'auth.title': 'Connexion rapide',
    'auth.subtitle': 'Test local — les données sont sauvegardées dans un JSON sur votre navigateur.',
    'auth.manualTitle': 'Connexion ou inscription classique',
    'auth.name': 'Nom ou pseudo',
    'auth.email': 'Email',
    'auth.signin': 'Se connecter',
    'auth.signout': 'Déconnexion',
    'auth.password': 'Mot de passe',
    'auth.hint': 'Pas de vrai backend : on simule une session locale.',
    'auth.guest': 'Continuer en invité',
    'auth.guestRedirect': 'Vous serez redirigé vers la page de connexion/inscription.',
    'auth.socialTitle': 'Ou connectez-vous avec',
    'auth.social.google': 'Google',
    'auth.social.apple': 'Apple',
    'auth.social.facebook': 'Facebook',
    'auth.socialNote': 'Les connexions sociales sont simulées localement pour la démo.',
    'hero.badge': 'Prototype minimal — IA vidéo chat',
    'hero.title': 'Générateur de vidéos TikTok IA dédié aux chats',
    'hero.lede':
      'Préparez des scripts courts, des plans et des hashtags prêts à publier. Design minimaliste, data locale, parfait pour la phase alpha.',
    'hero.button': 'Lancer une génération',
    'form.title': "Angle de la vidéo (chat au centre)",
    'form.catType': 'Chat vedette',
    'form.tone': 'Ambiance',
    'form.cta': 'Appel à l’action',
    'form.duration': 'Durée cible (secondes)',
    'form.language': 'Langue',
    'form.generate': 'Générer et sauvegarder',
    'form.notes': 'La génération est instantanée pour la démo. Support des autres animaux à venir.',
    'panel.latest': 'Vos dernières idées',
    'panel.empty': 'Aucune génération enregistrée.',
    'panel.localjson': 'JSON local',
    'output.script': 'Script proposé',
    'output.shots': 'Plan par plan',
    'output.hashtags': 'Hashtags',
    'output.meta': 'Infos TikTok',
    'status.ready': 'Prêt à poster',
    'status.saved': 'Sauvegardé en local',
    'placeholder.topic': 'Un chat explore un loft minimaliste',
    'placeholder.tone': 'Énergique, fun, un brin espiègle',
    'placeholder.cta': 'Abonne-toi pour d’autres hacks félins',
  },
  en: {
    'brand.name': 'Whisker Studio',
    'nav.generator': 'AI TikTok Generator',
    'nav.login': 'Log in',
    'nav.backHome': 'Back to generator',
    'authPage.tagline': 'Secure access',
    'authPage.title': 'Log in to pick up your scripts',
    'authPage.subtitle': 'Quick demo video + fast sign-in. Encrypted local storage and instant resume of generations.',
    'authPage.point1': 'Email or social login in one click',
    'authPage.point2': 'Keeps your scripts and hashtag history',
    'authPage.point3': 'Clean interface inspired by Creatify',
    'authPage.videoFallback': 'Your browser cannot play this video.',
    'authPage.videoHint': 'Replace /public/login-preview.mp4 and /public/login-poster.jpg with your own preview.',
    'auth.signedOut': 'Guest',
    'auth.signedIn': 'Signed in',
    'auth.title': 'Quick sign-in',
    'auth.subtitle': 'Local test — data is saved as JSON in your browser.',
    'auth.manualTitle': 'Login or sign up manually',
    'auth.name': 'Name or handle',
    'auth.email': 'Email',
    'auth.signin': 'Sign in',
    'auth.signout': 'Sign out',
    'auth.password': 'Password',
    'auth.hint': 'No real backend here: local-only session.',
    'auth.guest': 'Continue as guest',
    'auth.guestRedirect': 'We will send you to the login / sign-up choices.',
    'auth.socialTitle': 'Or sign in with',
    'auth.social.google': 'Google',
    'auth.social.apple': 'Apple',
    'auth.social.facebook': 'Facebook',
    'auth.socialNote': 'Social logins are simulated locally for now.',
    'hero.badge': 'Minimal prototype — cat AI video',
    'hero.title': 'AI TikTok video generator focused on cats',
    'hero.lede':
      'Draft fast scripts, shot lists, and hashtags ready to publish. Minimal layout, local data, alpha-friendly.',
    'hero.button': 'Start generating',
    'form.title': 'Video angle (cat first)',
    'form.catType': 'Featured cat',
    'form.tone': 'Tone',
    'form.cta': 'Call to action',
    'form.duration': 'Target duration (seconds)',
    'form.language': 'Language',
    'form.generate': 'Generate & save',
    'form.notes': 'Instant generation for the demo. More animals coming soon.',
    'panel.latest': 'Your latest ideas',
    'panel.empty': 'No generations stored yet.',
    'panel.localjson': 'Local JSON',
    'output.script': 'Suggested script',
    'output.shots': 'Shot by shot',
    'output.hashtags': 'Hashtags',
    'output.meta': 'TikTok meta',
    'status.ready': 'Ready to post',
    'status.saved': 'Saved locally',
    'placeholder.topic': 'A cat explores a minimal loft',
    'placeholder.tone': 'Energetic, playful, slightly mischievous',
    'placeholder.cta': 'Follow for more feline hacks',
  },
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

const browserLocale =
  (typeof navigator !== 'undefined' &&
    (navigator.language?.startsWith('fr') ? 'fr' : 'en')) ||
  'fr'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(browserLocale)

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => translations[locale][key],
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}
