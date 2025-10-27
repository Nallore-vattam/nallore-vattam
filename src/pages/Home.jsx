import React from 'react'
import Hero from '../components/Hero'
import AboutPreview from '../components/AboutPreview'
import ServicesPreview from '../components/ServicesPreview'
import GalleryPreview from '../components/GalleryPreview'
import SimpleImageCarousel from '../components/ImageCarousel' // ✅ Correct name
import Events from '../components/Events'
import YouTubeCards from '../components/YoutubeCards'
import ContactPreview from '../components/ContactPreview'

const HomePage = () => {
  return (
    <div style={{ paddingTop: '80px' }}>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <GalleryPreview />
      <SimpleImageCarousel /> {/* ✅ Use correct component name */}
      <Events />
      <YouTubeCards />
      <ContactPreview />
    </div>
  )
}

export default HomePage