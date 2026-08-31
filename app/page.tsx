import About from '@/components/About';
import BackToTop from '@/components/BackToTop';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import FeaturedProjects from '@/components/FeaturedProjects';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import MoreProjects from '@/components/MoreProjects';
import Nav from '@/components/Nav';
import Publications from '@/components/Publications';
import Skills from '@/components/Skills';
import Assistant from '@/components/chatbot/Assistant';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <FeaturedProjects />
        <MoreProjects />
        <Skills />
        <Education />
        <Publications />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Assistant />
    </>
  );
}
