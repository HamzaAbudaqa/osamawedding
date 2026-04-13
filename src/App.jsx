import SideNav from './components/SideNav';
import HeroScene from './components/HeroScene';
import InvitationScene from './components/InvitationScene';
import EventsScene from './components/EventsScene';
import RsvpScene from './components/RsvpScene';
import GalleryScene from './components/GalleryScene';
import FinalScene from './components/FinalScene';

function App() {
  return (
    <div className="w-full bg-charcoal text-cream">
      <SideNav />
      <HeroScene />
      <InvitationScene />
      <EventsScene />
      <RsvpScene />
      <GalleryScene />
      <FinalScene />
    </div>
  );
}

export default App;
