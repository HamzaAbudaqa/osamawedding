import SideNav from './components/SideNav';
import HeroScene from './components/HeroScene';
import InvitationScene from './components/InvitationScene';
import RsvpScene from './components/RsvpScene';
import FinalScene from './components/FinalScene';
import WelcomeOverlay from './components/WelcomeOverlay';

function App() {
  return (
    <div className="w-full bg-charcoal text-cream">
      <WelcomeOverlay />
      <SideNav />
      <HeroScene />
      <div className="section-divider" />
      <InvitationScene />
      <div className="section-divider" />
      <RsvpScene />
      <div className="section-divider" />
      <FinalScene />
    </div>
  );
}

export default App;
