import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CoupleSection from './components/CoupleSection';
import EventDetails from './components/EventDetails';
import RSVP from './components/RSVP';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

function App() {
  return (
    <div className="w-full min-h-screen bg-charcoal text-cream flex flex-col items-center">
      <Navigation />
      <main className="w-full flex flex-col items-center">
        <Hero />
        <CoupleSection />
        <EventDetails />
        <RSVP />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}

export default App;
