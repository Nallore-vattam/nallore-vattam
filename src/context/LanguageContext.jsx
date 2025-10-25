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
  EducationScholarship: 'Education Scholarship',
  HealthCamps: 'Health Camps',
  AgriculturalTraining: 'Agricultural Training',
  CulturalEvents: 'Cultural Events',
  SkillDevelopment: 'Skill Development',
  WomenEmpowerment: 'Women Empowerment',
  
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

// Services Page
exploreServices: 'Explore Services',
exploreGallery: 'Explore Gallery',


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
  studentsField: 'Students Field',
  fieldOfBiology: 'Field of Biology',
  villageField: 'Village Field',
  government: 'Government',
  womenEmpowerment: 'Women Empowerment',


// About Page
missionDescription: 'To empower our community through education, cultural preservation, and sustainable development initiatives that create lasting positive impact.',
visionDescription: 'A self-reliant, culturally rich community where every member has access to opportunities for growth, education, and prosperity.',
    
// Add these to your englishContent object in LanguageContext.js

// Service titles (fix the casing to match your JSON)
educationScholarship: 'Education Scholarship',
healthCamps: 'Health Camps', 
agriculturalTraining: 'Agricultural Training',
culturalEvents: 'Cultural Events',
skillDevelopment: 'Skill Development',
womenEmpowerment: 'Women Empowerment',

// Service descriptions for ALL 10 domains
educationScholarshipDesc: 'Financial support for deserving students to pursue higher education',
healthCampsDesc: 'Free medical checkups and healthcare services for community members',
agriculturalTrainingDesc: 'Modern farming techniques and sustainable agriculture practices',
culturalEventsDesc: 'Preserving and promoting our rich cultural heritage',
skillDevelopmentDesc: 'Vocational training and skill enhancement programs',
womenEmpowermentDesc: 'Programs focused on women entrepreneurship and leadership',

// Additional service descriptions for your other domains
studentsFieldDesc: 'Educational support and career guidance for young students',
villageFieldDesc: 'Community development and infrastructure improvement programs',
fieldOfBiologyDesc: 'Agricultural research and sustainable farming practices',
governmentDesc: 'Collaboration with local authorities for community welfare',
settingsDesc: 'Technical support and system configuration services',
youthFieldDesc: 'Youth development programs and leadership training',
worldDesc: 'Global outreach and international collaboration initiatives',
environmentalProtectionDesc: 'Environmental conservation and sustainability projects',
awarenessDesc: 'Public awareness campaigns and educational programs',

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

// Add these service descriptions to your englishContent object:
// Add these missing feature translations:
educationalSupport: 'Educational Support',
careerCounseling: 'Career Counseling',
extracurricular: 'Extracurricular Activities',
personalityDevelopment: 'Personality Development',
communityDevelopment: 'Community Development',
infrastructure: 'Infrastructure',
sanitation: 'Sanitation',
welfarePrograms: 'Welfare Programs',
agriculturalResearch: 'Agricultural Research',
environmentalConservation: 'Environmental Conservation',
soilTesting: 'Soil Testing',
ecologicalBalance: 'Ecological Balance',
publicService: 'Public Service',
policyImplementation: 'Policy Implementation',
civicEngagement: 'Civic Engagement',
communityWelfare: 'Community Welfare',

// Add these to your englishContent in LanguageContext.js
faq1Question: 'How can I apply for education scholarships?',
faq1Answer: 'Applications are accepted annually in May. Visit our office or website for application forms and eligibility criteria.',
faq2Question: 'Are health camps completely free?',
faq2Answer: 'Yes, all our health camps provide free medical checkups, basic medicines, and health consultations.',
faq3Question: 'Do I need prior experience for skill development programs?',
faq3Answer: 'No prior experience is required. Our programs are designed for beginners and include basic to advanced training.',
faq4Question: 'What documents are required for registration?',
faq4Answer: 'You need identity proof, address proof, and relevant educational or professional certificates based on the service you are applying for.',
faq5Question: 'How long does the application process take?',
faq5Answer: 'The application review typically takes 2-3 weeks. You will be notified via email or phone once your application is processed.',

// Add these eligibility options:
farmersResearchers: 'Farmers & Researchers',
allCitizens: 'All Citizens',
// Service descriptions for ALL 10 domains (2 lines each)
educationScholarshipDesc: 'Financial support and educational assistance for deserving students. We provide scholarships, mentorship, and career guidance for higher education.',
healthCampsDesc: 'Free medical checkups and comprehensive healthcare services for community members. Regular health camps with doctors, medicines, and health awareness programs.',
agriculturalTrainingDesc: 'Modern farming techniques and sustainable agriculture practices for farmers. Training on organic farming, water management, and market linkages.',
culturalEventsDesc: 'Preserving and promoting our rich cultural heritage through various events. Traditional festivals, arts, music, dance, and heritage workshops.',
skillDevelopmentDesc: 'Vocational training and skill enhancement programs for youth and adults. Computer skills, technical training, handicrafts, and soft skills development.',
womenEmpowermentDesc: 'Programs focused on women entrepreneurship, leadership, and self-reliance. Self-help groups, business training, legal awareness, and health programs.',
studentsFieldDesc: 'Educational support, career counseling, and extracurricular activities for students. Scholarship programs, tutoring, and personality development workshops.',
villageFieldDesc: 'Community development and rural infrastructure improvement initiatives. Village sanitation, water supply, road development, and community welfare programs.',
fieldOfBiologyDesc: 'Agricultural research, environmental conservation, and sustainable practices. Crop research, soil testing, and ecological balance maintenance.',
governmentDesc: 'Collaboration with local authorities for community welfare and development. Public service coordination, policy implementation, and civic engagement programs.',

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