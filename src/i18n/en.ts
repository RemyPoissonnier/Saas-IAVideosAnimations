const en = {
  brand: {
    name: 'Whisker Studio'
  },
  nav: {
    generator: 'AI TikTok Generator',
    login: 'Log in',
    backHome: 'Back to generator',
    home: 'Home',
    tokens: 'Tokens',
    prompt: 'Prompt',
    promptOptions: {
      standard: 'Standard Generator',
      slop: 'Slop Generator'
    },
    selectAnimal: 'Choose page',
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    logout: {
      cancel: 'Cancel',
      confirm: 'Confirm',
      description: 'Are you sure you want to log out ? You will need to log in again to access your videos and tokens.'
    }
  },
  landing: {
    title: 'One platform for 2D & 3D renders',
    section1: {
      text: 'Simply describe your vision. Gemini acts as your personal screenwriter, transforming a single sentence into a detailed prompt rich in texture and motion for unparalleled precision.',
      title: 'Sketch Your Intentions'
    },
    section2: {
      text: 'Watch your concepts come to life with the fluidity of Veo 3. Whether it\'s a paper-cutout aesthetic or a complex cinematic scene, our rendering engine captures every nuance for a result vibrant with originality.',
      title: 'Bring the Set to Life'
    },
    section3: {
      text: 'Maintain total control over your production. Adjust, refine, and regenerate with one click. Our intuitive interface allows you to sculpt your videos as if handling real film, with the added speed of AI.',
      title: 'Master Every Frame'
    },
    description: 'The gold standard for video content creation: transform your ideas into cinematic masterpieces through the combined power of Veo 3 and Gemini\'s creative intelligence.'
  },
  prompt: {
    title: 'GENERATOR',
    subtitle: 'Describe the scene and pick 2D or 3D to preview an idea.',
    simpleTitle: 'Quick TikTok mode',
    simpleDesc: 'Got 20s? Drop your idea, pick 2D/3D, hit render.',
    button: 'Generate Video',
    history: {
      title: 'Recent Prompts',
      usageHint: 'Click again to copy to clipboard',
      copied: 'Copied!'
    },
    slop: {
      title: 'Slop Generator',
      subtitle: 'Mix & match categories to generate 5 viral variations.',
      sections: {
        unique: 'Core Elements (Constant)',
        lists: 'Variables (Mix & Match)'
      },
      fields: {
        action: 'Action',
        context: 'Context',
        cinematography: 'Cinematography',
        subject: 'Subject',
        style: 'Style & Ambiance',
        placeholders: {
          action: 'Eating spaghetti with paws...',
          context: 'In a futuristic neon kitchen...',
          cinematography: 'Add camera angles (e.g. Close-up, Wide shot)...',
          subject: 'Add subjects (e.g. Fluffy cat, Grumpy dog)...',
          style: 'Add styles (e.g. Cinematic, Pixar, VHS)...'
        }
      },
      button: 'GENERATE 5 VARIATIONS',
      loading: 'GENERATING...',
      varLoading: 'Generating var #',
      download: 'Download',
      downloadAll: 'Download All (ZIP)',
      charLimit: 'characters',
      limitReached: 'Limit reached (max 15 items per category)'
    },
    resultTitle: 'Preview',
    outputFormat: 'Output format',
    confirmRun: 'I confirm to run the render',
    confirmRequired: 'Please confirm before generating.',
    toggleAdvanced: {
      show: 'More controls',
      hide: 'Hide controls'
    },
    placeholder: 'A cute cat playing with a ball of yarn...',
    mode: {
      _2d: '2D',
      _3d: '3D',
      full: 'Full generation',
      imageToVideo: 'Video from image',
      textToVideo: 'Video from text',
      character: 'Video from saved character',
      extend: 'Extend an existing video'
    },
    sample: {
      cat: 'Stylized cat, pastel set, smooth camera',
      dog: 'Stylized pup, soft grass, handheld camera'
    },
    model: {
      label: 'AI model',
      nanobanan: 'nanobanan',
      runway: 'Runway-like',
      pika: 'Pika-like',
      luma: 'Luma-like'
    },
    generationMode: 'Generation mode',
    visualStyle: 'Visual style',
    style: {
      realistic: 'Realistic',
      cartoon: 'Cartoon',
      anime: 'Anime',
      pixel: 'Pixel art',
      flat: 'Flat design',
      stylized: 'Stylized / artistic'
    },
    palette: 'Color palette (optional)',
    character: 'Character',
    characterLibrary: 'Pick a saved character',
    appearance: 'Appearance or new description',
    expression: 'Main expression',
    voice: 'Voice',
    scene: 'Scene & environment',
    scenePlaceholder: 'Location / set, reference, ambience',
    ambience: 'Ambience (day/night, dramatic...)',
    props: 'Props and objects',
    camera: {
      static: 'Static',
      pan: 'Pan',
      zoom: 'Zoom',
      travel: 'Travel',
      cinematic: 'Cinematic dynamic'
    },
    script: 'Scenario and actions',
    scriptPlaceholder: 'Script or actions to perform',
    anim: {
      walk: 'Walk / run',
      talk: 'Talk',
      gesture: 'Gesture',
      wave: 'Wave',
      type: 'Type on keyboard'
    },
    duration: 'Scene duration (e.g., 15s)',
    audio: 'Audio & Voice',
    voiceTone: 'Voice tone / timbre',
    accent: 'Accent / language',
    music: 'Background music',
    lipsync: 'Lip-sync',
    output: 'Output',
    resolution: 'Resolution',
    length: 'Final length',
    label: {
      resolution: 'Resolution',
      ratio: 'Ratio',
      duration: 'Duration'
    },
    option: {
      youtube: '16:9 (Youtube)',
      tiktok: '9:16 (TikTok/Reel)'
    },
    description: 'Simply describe your idea and choose the format.',
    enhance: {
      text: 'You are a prompt engineer for Google Veo. Your mission is to rewrite user descriptions and turn them into cinematic masterpieces. Be creative. Your are a max caratere of 800. Here is the prompt =>',
      path: {
        loading: 'Magic in progress...',
        success: 'Prompt successfully optimized!',
        error: 'Failed to enhance prompt.'
      },
      modal: {
        title: 'Optimize your prompt',
        description: 'Our AI will rewrite your prompt to get the best video result.',
        warning: 'This action will consume {amount} tokens from your balance.',
        confirm: 'Enhance for {amount} tokens',
        cancel: 'Wait, I\'ll do it myself'
      }
    },
    exemple: {
      description1: 'A breathtaking cinematic masterpiece using a continuous long tracking shot (long take). The video begins in a primeval, misty forest in a dramatic low-angle perspective (contre-plongée). Towering ancient oaks stretch toward a soft, ethereal canopy where golden sunlight filters through dancing dust motes. The camera glides smoothly forward at a steady pace, capturing hyper-detailed moss textures and ferns. Then, through a seamless visual morph or a hidden transition behind a large tree trunk, the scenery transforms into a grand Parisian boulevard at dusk. The camera maintains the exact same low-angle tracking motion and speed. The cobblestone streets of Paris replace the forest floor, reflecting the warm glow of vintage streetlamps and the iconic Haussmann architecture. In the distance, the silhouette of the Eiffel Tower emerges against a deep indigo sky. Photorealistic, 8k, shot on 35mm film, highly detailed, fluid motion, atmospheric lighting.',
      description2: 'Cinematic walk-and-talk in NYC, golden hour. A sharp, tenacious female journalist with a vintage mic pursues a charismatic, billionaire-style man in a tailored suit through a bustling Manhattan crowd. Camera: Smooth tracking side-shot, medium close-up. She asks with urgency: \'Sir, how do you stay so successful?\' Without stopping, he looks into the lens with a confident smirk and says: \'Simple... I use Whisker Studio.\' Background features blurred yellow cabs, tall buildings, and lens flares. Photorealistic, 8k, high contrast, shallow depth of field. The dialogue is clear, city noise is hushed for his answer. Professional film lighting, sharp textures, fluid motion.'
    },
    init: 'Cinematic close-up of a fluffy brown bear sitting in a sunlit forest, animatedly telling jokes to a small green snake coiled on a branch. The bear has expressive facial expressions and moving lips. Natural lighting, 4k, high detail, whimsical atmosphere.'
  },
  pricing: {
    title: 'IA credits & subscriptions',
    subtitle: 'Pick token packs or a monthly plan for your video renders.',
    tokens: {
      title: 'Token packs',
      desc: 'Use tokens for IA renders (one-time purchase).',
      starter: 'Starter · 5,000 tokens',
      pro: 'Pro · 15,000 tokens',
      studio: 'Studio · 50,000 tokens'
    },
    sub: {
      title: 'Subscriptions',
      desc: 'Choose a recurring plan for continuous renders.',
      monthly: 'Monthly',
      yearly: 'Yearly (-15%)'
    },
    cta: {
      buy: 'Buy',
      subscribe: 'Subscribe'
    },
    enhance: {
      text: 'Help me create a prompt to use with veo3. Take my basic concept and enhance it to optimize the AI\'s video rendering. Be imaginative and creative, limited at 1500 carateres. Basic idea: '
    },
    note: 'Tokens burn based on duration, resolution, and selected model.',
    simpleTitle: 'Simple and transparent pricing'
  },
  authPage: {
    tagline: 'Secure access',
    title: 'Log in to pick up your scripts',
    subtitle: 'Quick demo video + fast sign-in. Encrypted local storage and instant resume of generations.',
    point1: 'Email or social login in one click',
    point2: 'Keeps your scripts and hashtag history',
    point3: 'Clean interface inspired by Creatify',
    videoFallback: 'Your browser cannot play this video.',
    videoHint: 'Replace /public/login-preview.mp4 and /public/login-poster.jpg with your own preview.'
  },
  auth: {
    title: 'Quick sign-in',
    subtitle: 'Local test — data is saved as JSON in your browser.',
    manualTitle: 'Login or sign up manually',
    signedOut: 'Guest',
    signedIn: 'Signed in',
    name: 'Name or handle',
    email: 'Email',
    signin: 'Sign in',
    signout: 'Sign out',
    password: 'Password',
    hint: 'No real backend here: local-only session.',
    guest: 'Continue as guest',
    guestRedirect: 'We will send you to the login / sign-up choices.',
    socialTitle: 'Or sign in with',
    social: {
      google: 'Google',
      apple: 'Apple',
      facebook: 'Facebook'
    },
    socialNote: 'Social logins are simulated locally for now.',
    signInTitle: 'Welcome Back',
    signInSubtitle: 'Welcome back',
    forgotPassword: {
      title: 'Forgot password ?',
      subtitle: 'Enter your email and we\'ll send you a link to reset your password.',
      emailLabel: 'Email',
      emailPlaceholder: 'email@example.com',
      buttonSend: 'Send link',
      buttonLoading: 'Sending...',
      successMessage: 'A reset email has been sent! Check your spam folder.',
      error: {
        userNotFound: 'No account is associated with this email.',
        invalidEmail: 'The email address is invalid.',
        generic: 'An unexpected error occurred.',
        prefix: 'Error: '
      }
    },
    noAccount: 'Don\'t have an account?',
    signupLink: 'Create one ?',
    loginRequired: 'Please log in first!'
  },
  hero: {
    badge: 'Minimal prototype — cat AI video',
    title: 'AI TikTok video generator focused on cats',
    lede: 'Draft fast scripts, shot lists, and hashtags ready to publish. Minimal layout, local data, alpha-friendly.',
    button: 'Start generating'
  },
  form: {
    title: 'Video angle (cat first)',
    catType: 'Featured cat',
    tone: 'Tone',
    cta: 'Call to action',
    duration: 'Target duration (seconds)',
    language: 'Language',
    generate: 'Generate & save',
    notes: 'Instant generation for the demo. More animals coming soon.'
  },
  panel: {
    latest: 'Your latest ideas',
    empty: 'No generations stored yet.',
    localjson: 'Local JSON'
  },
  output: {
    script: 'Suggested script',
    shots: 'Shot by shot',
    hashtags: 'Hashtags',
    meta: 'TikTok meta'
  },
  status: {
    ready: 'Ready to post',
    saved: 'Saved locally'
  },
  placeholder: {
    topic: 'A cat explores a minimal loft',
    tone: 'Energetic, playful, slightly mischievous',
    cta: 'Follow for more feline hacks'
  },
  register: {
    email: 'Email',
    pw: 'Password',
    indication: 'Create your account to access features',
    pseudo: 'Username',
    pseudoPlaceholder: 'Your username',
    emailPlaceholder: 'email@example.com',
    confirmPw: 'Confirm Password',
    loading: 'Loading...',
    register: 'Sign up',
    criteria: {
      length: '8+ characters',
      upper: '1 Uppercase',
      lower: '1 Lowercase',
      digit: '1 Digit',
      special: '1 Special character'
    },
    error: {
      dontMatch: 'Passwords do not match',
      pseudoAlUsed: 'Username already taken',
      emailUsed: 'Email already in use',
      weakpw: 'Password too weak',
      pw: 'Minimum eight characters, at least one letter and one number',
      generic: 'An unexpected error occurred.',
      prefix: 'Error: '
    }
  },
  promo: {
    text: 'Flash Sale! Get -{{percent}}% on all token packs.',
    button: 'Get Offer',
    code: 'CODE',
    offer: '🔥 SPECIAL OFFER: -{percent}% with code {code}!'
  },
  legal: {
    title: 'Legal Notice & AI Privacy',
    aiSection: {
      title: '4. AI Usage & Privacy',
      nature: {
        title: 'Nature of processing',
        text: 'The Platform uses third-party generative artificial intelligence technologies (AI Models) such as Vio or Sora for video creation.'
      },
      data: {
        title: 'Data transmission',
        text: 'By submitting a prompt, you agree that it will be transmitted via API to model providers. This transfer is strictly necessary for generation.'
      },
      privacy: {
        title: 'Privacy',
        text: 'We do not sell your prompts. We enable \'Zero Retention\' (no-training) options with our providers whenever technically possible.'
      },
      responsibility: {
        title: 'Responsibility',
        text: 'The user acknowledges that AI content may show similarities to other generated content. The user is responsible for verifying content before publishing.'
      },
      disclaimer: 'This service uses generative AI models. Videos may contain inaccuracies.'
    },
    pageTitle: 'Legal Notice & Terms',
    pageSubtitle: 'Transparency, usage rules, and conditions of sale.',
    mentions: {
      title: '1. Legal Notice',
      editor: 'RPIT, located at [YOUR ADDRESS].',
      host: 'Hosted by Vercel Inc. (USA) and Google Firebase (USA/EU).',
      contact: 'Support contact: contact@yourdomain.com'
    },
    cgu: {
      title: '2. General Terms of Use (GTU)',
      intro: 'Access to the generator implies unreserved acceptance of the following rules:',
      account: 'You are responsible for the confidentiality of your credentials.',
      use: 'Any abusive or illegal use will result in account deletion.',
      content: 'The service is provided \'as is\' without guarantee of permanent availability.'
    },
    cgv: {
      title: '3. General Terms of Sale (GTS)',
      retractationWarning: 'WAIVER OF RIGHT OF WITHDRAWAL: By purchasing tokens, you agree that the supply of digital content begins immediately. You expressly waive your 14-day right of withdrawal.',
      price: 'Prices are indicated in euros. Payment is secured via Stripe.',
      delivery: 'Tokens are credited immediately after payment validation.',
      refund: 'No refunds are issued once tokens are consumed or after the service execution has started.'
    },
    privacy: {
      title: '5. Privacy Policy (GDPR)',
      intro: 'We are committed to protecting your personal data in accordance with the GDPR.',
      collected: {
        title: 'Data Collected',
        text: 'We collect: email address, encrypted password, connection logs, and generation history (prompts). Payment data is handled exclusively by Stripe.'
      },
      processors: {
        title: 'Third-Party Processors',
        text: 'Your data is processed by: Google Firebase (Auth/DB), Vercel (Hosting), Stripe (Payments), and our AI providers (for generation only).'
      },
      rights: {
        title: 'Your Rights',
        text: 'You have the right to access, rectify, or delete your data directly from your account settings or by contacting support.'
      },
      cookies: {
        title: 'Cookies',
        text: 'We use strictly necessary cookies for authentication and optional cookies for performance (if accepted).'
      }
    }
  },
  about: {
    title: 'About Us',
    subtitle: 'When passion for pets meets artificial intelligence.',
    mission: {
      title: 'Our Mission',
      text: 'To allow every creator, even without technical skills, to bring funny and touching stories to life with their favorite animals using the latest generative AI technologies.'
    },
    story: {
      title: 'Our Story',
      text: 'Born from a simple observation: creating a high-quality 3D animation of a cat or dog took weeks. Today, with our engine connecting Vio, Sora, and our custom models, it takes seconds.'
    },
    values: {
      title: 'Our Values',
      innovation: 'Innovation: Always integrating the latest models (Vio, Sora).',
      transparency: 'Transparency: Clear pricing, respect for artists and data.',
      fun: 'Fun: Technology should remain a game and a creative tool.'
    }
  },
  cookie: {
    title: 'Data & Privacy',
    text: 'We respect your privacy. In accordance with regulations, we ask for your consent to use cookies for analytics and AI performance.',
    accept: 'Accept All',
    decline: 'Refuse',
    policy: 'Privacy Policy'
  },
  footer: {
    manageCookies: 'Manage Cookies',
    tagline: 'Create stunning animal videos using the power of generative artificial intelligence.',
    product: {
      title: 'Product',
      generator: 'Generator',
      pricing: 'Pricing & Tokens',
      showcase: 'Showcase',
      changelog: 'Changelog'
    },
    resources: {
      title: 'Resources',
      docs: 'Documentation',
      api: 'Docker API',
      community: 'Community',
      support: 'Support'
    },
    legal: {
      title: 'Legal',
      about: 'About',
      privacy: 'Privacy',
      terms: 'Terms & Conditions'
    },
    rights: 'All rights reserved.',
    madeWith: 'Made with ❤️ in France'
  },
  common: {
    na: 'N/A',
    currency: '$'
  },
  subscription: {
    title: 'Subscription management',
    mySub: 'My Subscription',
    tier: 'Level:',
    name: 'Name:',
    endDate: 'Period end:',
    cancel: 'Cancellation scheduled:',
    yes: 'Yes',
    no: 'No',
    empty: 'Not subscribed'
  },
  showcase: 'Showcase',
  start: 'Start'
};

export default en;