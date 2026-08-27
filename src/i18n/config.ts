import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Nav
      nav: {
        overview: 'Overview',
        herd: 'Herd',
        productivity: 'Productivity',
        health: 'Health',
        economics: 'Economics',
        breeding: 'Breeding',
        decisions: 'Decision Intelligence',
        whatif: 'What-If Simulation',
        settings: 'Settings',
        profile: 'Profile',
        logout: 'Logout',
      },
      // Dashboard
      dashboard: {
        greeting: 'Good morning',
        subtitle: 'Here is what your herd is telling you today.',
        totalCattle: 'Total Cattle',
        continueDairy: 'Continue Dairy',
        breedingCandidate: 'Breeding Candidate',
        monitorClosely: 'Monitor Closely',
        considerSale: 'Consider Sale',
        needsAttention: 'Needs Attention',
        overallScore: 'Overall Score',
      },
      // Decisions
      decisions: {
        continueDairy: 'Continue Dairy Production',
        breedingCandidate: 'Breeding Candidate',
        monitorClosely: 'Monitor Closely',
        considerSale: 'Consider Sale',
      },
      // Login
      login: {
        title: 'Welcome back.',
        subtitle: 'Sign in to your Kangeyam Insight account.',
        email: 'Email Address',
        password: 'Password',
        submit: 'Sign In',
        noAccount: "Don't have an account?",
        register: 'Register',
        languagePrompt: 'Select your preferred language',
        languages: 'Language',
      },
      // Register
      register: {
        title: 'Create your account.',
        subtitle: 'Join Kangeyam Insight to manage your herd intelligently.',
        name: 'Full Name',
        email: 'Email Address',
        password: 'Password',
        farmName: 'Farm Name',
        submit: 'Create Account',
        hasAccount: 'Already have an account?',
        login: 'Sign In',
      },
      // Common
      common: {
        save: 'Save Record',
        cancel: 'Cancel',
        back: 'Back',
        loading: 'Loading...',
        error: 'Something went wrong',
        retry: 'Retry',
        noData: 'No records found.',
        confidence: 'Confidence',
        recommendation: 'Recommendation',
        score: 'Score',
        age: 'Age',
        breed: 'Breed',
      },
    },
  },
  ta: {
    translation: {
      // Nav
      nav: {
        overview: 'மேலோட்டம்',
        herd: 'கூட்டம்',
        productivity: 'உற்பத்தித்திறன்',
        health: 'சுகாதாரம்',
        economics: 'பொருளாதாரம்',
        breeding: 'இனப்பெருக்கம்',
        decisions: 'முடிவு நுண்ணறிவு',
        whatif: 'என்னாகும் பகுப்பாய்வு',
        settings: 'அமைப்புகள்',
        profile: 'சுயவிவரம்',
        logout: 'வெளியேறு',
      },
      // Dashboard
      dashboard: {
        greeting: 'காலை வணக்கம்',
        subtitle: 'உங்கள் கூட்டம் இன்று என்ன சொல்கிறது.',
        totalCattle: 'மொத்த கால்நடைகள்',
        continueDairy: 'பால் உற்பத்தி தொடரும்',
        breedingCandidate: 'இனப்பெருக்க வேட்பாளர்',
        monitorClosely: 'நெருக்கமாக கண்காணி',
        considerSale: 'விற்பனையை பரிசீலி',
        needsAttention: 'கவனம் தேவை',
        overallScore: 'மொத்த மதிப்பெண்',
      },
      // Decisions
      decisions: {
        continueDairy: 'பால் உற்பத்தி தொடரவும்',
        breedingCandidate: 'இனப்பெருக்க வேட்பாளர்',
        monitorClosely: 'நெருக்கமாக கண்காணிக்கவும்',
        considerSale: 'விற்பனையை கருத்தில் கொள்ளவும்',
      },
      // Login
      login: {
        title: 'மீண்டும் வரவேற்கிறோம்.',
        subtitle: 'கங்கேயம் இன்சைட் கணக்கில் உள்நுழைக.',
        email: 'மின்னஞ்சல் முகவரி',
        password: 'கடவுச்சொல்',
        submit: 'உள்நுழை',
        noAccount: 'கணக்கு இல்லையா?',
        register: 'பதிவு செய்',
        languagePrompt: 'உங்கள் விருப்பமான மொழியை தேர்ந்தெடுக்கவும்',
        languages: 'மொழி',
      },
      // Register
      register: {
        title: 'உங்கள் கணக்கை உருவாக்கவும்.',
        subtitle: 'கங்கேயம் இன்சைட்டில் இணைந்து உங்கள் கூட்டத்தை நிர்வகிக்கவும்.',
        name: 'முழு பெயர்',
        email: 'மின்னஞ்சல் முகவரி',
        password: 'கடவுச்சொல்',
        farmName: 'பண்ணை பெயர்',
        submit: 'கணக்கு உருவாக்கு',
        hasAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
        login: 'உள்நுழை',
      },
      // Common
      common: {
        save: 'பதிவை சேமி',
        cancel: 'ரத்து செய்',
        back: 'பின்செல்',
        loading: 'ஏற்றுகிறது...',
        error: 'ஏதோ தவறு நடந்தது',
        retry: 'மீண்டும் முயற்சி',
        noData: 'பதிவுகள் எதுவும் இல்லை.',
        confidence: 'நம்பகத்தன்மை',
        recommendation: 'பரிந்துரை',
        score: 'மதிப்பெண்',
        age: 'வயது',
        breed: 'இனம்',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('ki_language') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
