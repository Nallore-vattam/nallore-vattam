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

  // English source content - CLEANED VERSION (No duplicates)
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

    // UPDATED: New domain names
    service1: 'Student Domain',
    service2: 'Village Domain',
    service3: 'Domain of Biology',
    service4: 'Government Domain',
    service5: 'Settings Domain',
    service6: 'Womens Domain',
    service7: 'Youth Domain',
    service8: 'World Domain',
    service9: 'Environmental Domain',
    service10: 'Awareness Domain',

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

    // FAQ Translations
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

    // NEW DOMAIN TRANSLATIONS
    studentDomain: 'Student Domain',
    villageDomain: 'Village Domain', 
    domainOfBiology: 'Domain of Biology',
    governmentDomain: 'Government Domain',
    settingsDomain: 'Settings Domain',
    womensDomain: 'Womens Domain',
    youthDomain: 'Youth Domain',
    worldDomain: 'World Domain',
    environmentalDomain: 'Environmental Domain',
    awarenessDomain: 'Awareness Domain',

    studentDomainDesc: 'Comprehensive educational support and development programs for students. Career guidance, scholarships, and skill enhancement initiatives.',
    villageDomainDesc: 'Community development and rural welfare programs for village improvement. Infrastructure development and social service initiatives.',
    domainOfBiologyDesc: 'Biological research and agricultural development for sustainable farming. Environmental studies and biodiversity conservation programs.',
    governmentDomainDesc: 'Coordination with government authorities for public welfare services. Policy implementation and civic engagement activities.',
    settingsDomainDesc: 'Technical configuration and program management for organizational operations. System support and resource coordination services.',
    womensDomainDesc: 'Empowerment programs and support services for women development. Self-help groups, health awareness, and economic independence initiatives.',
    youthDomainDesc: 'Youth development programs and leadership training for young individuals. Career guidance, sports, and talent development activities.',
    worldDomainDesc: 'Global partnerships and international collaboration for community development. Cultural exchange and knowledge sharing programs.',
    environmentalDomainDesc: 'Environmental protection and sustainability initiatives for green living. Clean energy, waste management, and conservation programs.',
    awarenessDomainDesc: 'Public awareness campaigns and educational programs for community enlightenment. Social media outreach and workshop initiatives.',

    educationalSupport: 'Educational Support',
    careerCounseling: 'Career Counseling',
    scholarshipPrograms: 'Scholarship Programs',
    skillDevelopment: 'Skill Development',
    communityDevelopment: 'Community Development',
    infrastructure: 'Infrastructure',
    ruralWelfare: 'Rural Welfare',
    socialServices: 'Social Services',
    agriculturalResearch: 'Agricultural Research',
    environmentalStudies: 'Environmental Studies',
    biodiversity: 'Biodiversity',
    sustainableFarming: 'Sustainable Farming',
    publicServices: 'Public Services',
    policyImplementation: 'Policy Implementation',
    civicEngagement: 'Civic Engagement',
    communityOutreach: 'Community Outreach',
    systemConfiguration: 'System Configuration',
    technicalSupport: 'Technical Support',
    programManagement: 'Program Management',
    resourceCoordination: 'Resource Coordination',
    womensEmpowerment: 'Womens Empowerment',
    selfHelpGroups: 'Self-Help Groups',
    healthAwareness: 'Health Awareness',
    economicIndependence: 'Economic Independence',
    youthLeadership: 'Youth Leadership',
    sportsActivities: 'Sports Activities',
    talentDevelopment: 'Talent Development',
    globalPartnerships: 'Global Partnerships',
    culturalExchange: 'Cultural Exchange',
    internationalProjects: 'International Projects',
    knowledgeSharing: 'Knowledge Sharing',
    environmentalProtection: 'Environmental Protection',
    cleanEnergy: 'Clean Energy',
    wasteManagement: 'Waste Management',
    greenInitiatives: 'Green Initiatives',
    publicAwareness: 'Public Awareness',
    educationalCampaigns: 'Educational Campaigns',
    socialMediaOutreach: 'Social Media Outreach',
    communityWorkshops: 'Community Workshops',

    academicYear: 'Academic Year',
    continuous: 'Continuous',
    studentsAllAges: 'Students All Ages',
    allVillagers: 'All Villagers',
    farmersResearchers: 'Farmers & Researchers',
    allCitizens: 'All Citizens',
    authorizedPersonnel: 'Authorized Personnel',
    womenAllAges: 'Women All Ages',
    youth15_30: 'Youth 15-30 Years',
    allMembers: 'All Members',
    allCommunityMembers: 'All Community Members',
    generalPublic: 'General Public',

    missionDescription: 'To empower our community through education, cultural preservation, and sustainable development initiatives that create lasting positive impact.',
    visionDescription: 'A self-reliant, culturally rich community where every member has access to opportunities for growth, education, and prosperity.',

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
    mapPlaceholder: 'Map integration would go here',

    exploreServices: 'Explore Services',
    exploreGallery: 'Explore Gallery'
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

        // ✅ Log the translation here
        console.log(`🔤 ${key}: ${englishContent[key]} → ${translatedText}`);

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
    isTranslating,
    translations // ✅ Added this line
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
