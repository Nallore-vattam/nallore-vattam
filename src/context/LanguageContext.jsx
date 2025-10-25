import React, { createContext, useState, useEffect, useContext } from "react";
import { autoTranslate, translateText } from "../utils/translate";

export const LanguageContext = createContext();

const supportedLanguages = [
  { code: "ta", name: "தமிழ்" },
  { code: "hi", name: "हिंदी" }, 
  { code: "en", name: "English" }
];

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("ta");
  const [currentPage, setCurrentPage] = useState("home");
  const [translations, setTranslations] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);

  // English source content
  const englishContent = {
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    gallery: 'Gallery',
    events: 'Events',
    contact: 'Contact',
    heroTitle1: 'Welcome to Nallor Vattam',
    heroTitle2: 'For Social Development',
    heroTitle3: 'Preserving Tradition',
    heroSubtitle1: 'Working for the growth and progress of our community',
    heroSubtitle2: 'Education, health and social development programs',
    heroSubtitle3: 'Protecting our culture and heritage',
    learnMore: 'Learn More',
    getInvolved: 'Join with us',
    aboutTitle: 'About Nallor Vattam',
    aboutText1: 'Nallor Vattam is a community organization dedicated to the social, cultural, and economic development of our region.',
    aboutText2: 'Our mission is to create sustainable growth opportunities through education, healthcare initiatives, and cultural preservation programs.',
    aboutText3:'Nallore Vattam is a community organization dedicated to promoting and preserving the cultural heritage of our region. Founded in 2005, we have been bringing together people from various backgrounds to celebrate our shared traditions, values, and heritage.',
    servicesTitle: 'Our Services',
    service1: 'Students Field',
    service2: 'Village Field',
    service3: 'Field of Biology',
    service4: 'government',
    service5: 'Settings',
    service6: 'Women Empowerment',
    service7: 'Youth Field',
    service8: 'World',
    service9: 'Environmental Protection',
    service10: 'Awareness',
    galleryTitle: 'Our Gallery',
    eventsTitle: 'Upcoming Events',
    event1: 'Cultural Festival - Jan 15, 2024',
    event2: 'Health Camp - Feb 20, 2024',
    event3: 'Educational Workshop - Mar 10, 2024',
    contactTitle: 'Contact Us',
    name: 'Your Name',
    email: 'Your Email',
    message: 'Your Message',
    send: 'Send Message',
    footerDescription: 'Nallore Vattam is an organization working for social development and cultural preservation.',
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Information',
    address:'Periyaar pathai,Choolaimedu,Chennai-600094, Tamil Nadu, India',
    phone: '+91 98765 43210',
    emailAddress: 'info@nallorevattam.com',
    allRightsReserved: 'All Rights Reserved',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    projectName: 'Nallor Vattam',

    // NEW TRANSLATIONS ADDED:
    // Gallery Page
    photoGallery: 'Photo Gallery',
    gallerySubtitle: 'Visual stories of our community\'s journey, achievements, and celebrations',
    allPhotos: 'All Photos',
    culturalEvents: 'Cultural Events',
    education: 'Education',
    healthCamps: 'Health Camps',
    community: 'Community',
    
    // Contact Page
    sendMessage: 'Send us a Message',
    phoneNumber: 'Phone Number',
    subject: 'Subject',
    getInTouch: 'Get in Touch',
    ourAddress: 'Our Address',
    workingHours: 'Working Hours',
    followUs: 'Follow Us',
    contactSubtitle: 'We\'d love to hear from you. Get in touch and let\'s start a conversation.',
    
    // About Page  
    aboutNalloreVattam: 'About Nallor Vattam',
    aboutSubtitle: 'Building a stronger community through unity and development',
    ourMission: 'Our Mission',
    ourVision: 'Our Vision',
    ourJourney: 'Our Journey',
    ourLeadershipTeam: 'Our Leadership Team',
    
    // Services Page
    ourServices: 'Our Services',
    servicesSubtitle: 'Comprehensive community development programs designed to empower and transform lives',
    keyFeatures: 'Key Features',
    howItWorks: 'How It Works',
    frequentlyAskedQuestions: 'Frequently Asked Questions',
    register: 'Register',
    apply: 'Apply',
    review: 'Review',
    participate: 'Participate',
    learnMoreBtn: 'Learn More',
    applyNow: 'Apply Now',
    createAccount: 'Create your account and complete profile',
    chooseService: 'Choose service and submit application',
    teamReview: 'Our team reviews your application',
    joinProgram: 'Join the program and get benefits',

    // Add these to your englishContent object in LanguageContext.js

// Services Page
exploreServices: 'Explore Services',
exploreGallery: 'Explore Gallery',

// About Page
missionDescription: 'To empower our community through education, cultural preservation, and sustainable development initiatives that create lasting positive impact.',
visionDescription: 'A self-reliant, culturally rich community where every member has access to opportunities for growth, education, and prosperity.',
    
  // Basic UI translations
  exploreDomain: 'Explore Domain',
  ourServices: 'Our Services',
  servicesSubtitle: 'Comprehensive support programs for community development',
  keyFeatures: 'Key Features',
  learnMoreBtn: 'Learn More',
  applyNow: 'Apply Now',
  howItWorks: 'How It Works',
  register: 'Register',
  createAccount: 'Create your account',
  apply: 'Apply',
  chooseService: 'Choose your service',
  review: 'Review',
  teamReview: 'Our team reviews your application',
  participate: 'Participate',
  joinProgram: 'Join the program',
  frequentlyAskedQuestions: 'Frequently Asked Questions',

  // Service titles
  educationScholarship: 'Education Scholarship',
  healthCamps: 'Health Camps',
  agriculturalTraining: 'Agricultural Training',
  culturalEvents: 'Cultural Events',
  skillDevelopment: 'Skill Development',
  womenEmpowerment: 'Women Empowerment',
  educationScholarship2: 'Education Scholarship',
  healthCamps2: 'Health Camps',
  agriculturalTraining2: 'Agricultural Training',
  culturalEvents2: 'Cultural Events',

  // Service descriptions
  educationScholarshipDesc: 'Financial support for deserving students to pursue higher education',
  healthCampsDesc: 'Free medical checkups and healthcare services for community members',
  agriculturalTrainingDesc: 'Modern farming techniques and sustainable agriculture practices',
  culturalEventsDesc: 'Preserving and promoting our rich cultural heritage',
  skillDevelopmentDesc: 'Vocational training and skill enhancement programs',
  womenEmpowermentDesc: 'Programs focused on women entrepreneurship and leadership',

  // Service features
  tuitionFeeSupport: 'Tuition Fee Support',
  bookAllowance: 'Book Allowance',
  mentorshipProgram: 'Mentorship Program',
  careerGuidance: 'Career Guidance',
  generalCheckup: 'General Checkup',
  dentalCare: 'Dental Care',
  eyeTesting: 'Eye Testing',
  healthAwareness: 'Health Awareness',
  organicFarming: 'Organic Farming',
  waterManagement: 'Water Management',
  cropRotation: 'Crop Rotation',
  marketLinkages: 'Market Linkages',
  festivalCelebrations: 'Festival Celebrations',
  traditionalArts: 'Traditional Arts',
  musicDance: 'Music & Dance',
  heritageWorkshops: 'Heritage Workshops',
  computerSkills: 'Computer Skills',
  handicrafts: 'Handicrafts',
  technicalTraining: 'Technical Training',
  softSkills: 'Soft Skills',
  selfHelpGroups: 'Self-Help Groups',
  businessTraining: 'Business Training',
  legalAwareness: 'Legal Awareness',
  healthPrograms: 'Health Programs',

  // Duration and eligibility
  annual: 'Annual',
  quarterly: 'Quarterly',
  seasonal: 'Seasonal',
  monthly: 'Monthly',
  ongoing: 'Ongoing',
  months3_6: '3-6 Months',
  studentsAged16_25: 'Students aged 16-25',
  allCommunityMembers: 'All community members',
  farmersAgriEnthusiasts: 'Farmers & Agri-enthusiasts',
  allAgeGroups: 'All age groups',
  youthAdults: 'Youth & Adults',
  womenGirls: 'Women & Girls',

    // Common
    exploreDomain: 'Explore Domain',
    readMoreAboutUs: 'Read More About Us',
    traditionalDance: 'Traditional Dance Performance',
    studentScholarship: 'Student Scholarship Distribution',
    freeHealthCheckup: 'Free Health Checkup Camp',
    communityMeeting: 'Community Meeting',
    festivalCelebration: 'Festival Celebration',
    computerTraining: 'Computer Training Session',
    dentalCare: 'Dental Care Camp',
    youthSports: 'Youth Sports Event',
    musicProgram: 'Music Program',
    libraryInauguration: 'Library Inauguration',
    eyeTesting: 'Eye Testing Camp',
    cleanlinessDrive: 'Cleanliness Drive',
    interactiveMap: 'Interactive Map',
    thankYouMessage: 'Thank you for your message! We\'ll get back to you soon.',
    mapPlaceholder: 'Map integration would go here'
  };

  // Batch translate all content
  const translateAllContent = async (targetLang) => {
    if (targetLang === 'en') {
      setTranslations(englishContent);
      return;
    }

    setIsTranslating(true);
    const translated = {};

    try {
      const translationPromises = Object.keys(englishContent).map(async (key, index) => {
        await new Promise(resolve => setTimeout(resolve, index * 50));
        
        try {
          const translatedText = await translateText(englishContent[key], targetLang);
          return { key, translatedText };
        } catch (error) {
          console.warn(`Failed to translate ${key}:`, error);
          return { key, translatedText: englishContent[key] };
        }
      });

      const results = await Promise.all(translationPromises);
      
      results.forEach(({ key, translatedText }) => {
        translated[key] = translatedText;
      });

      setTranslations(translated);
    } catch (error) {
      console.error('Batch translation failed:', error);
      setTranslations(englishContent);
    } finally {
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    translateAllContent(currentLanguage);
  }, [currentLanguage]);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const t = (key) => {
    return translations[key] || englishContent[key] || key;
  };

  const value = {
    currentLanguage,
    setCurrentLanguage: handleLanguageChange,
    currentPage,
    setCurrentPage: handlePageChange,
    supportedLanguages,
    t,
    isTranslating
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};