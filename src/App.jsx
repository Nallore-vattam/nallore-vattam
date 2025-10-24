import React from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import ServicesPage from './pages/Services'
import GalleryPage from './pages/Gallery'
import ContactPage from './pages/Contact'
import { useLanguage } from './context/LanguageContext'
import 'bootstrap-icons/font/bootstrap-icons.css';
const AppContent = () => {
  const { currentPage } = useLanguage();

  const renderPage = () => {
    switch(currentPage) {
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  }

  return (
    <div className="App">
      <Header />
      <main style={{ minHeight: '100vh' }}>
        {renderPage()}
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App