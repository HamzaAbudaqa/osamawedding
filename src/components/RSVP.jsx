import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Check, User, Utensils, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { submitRSVP, MEAL_OPTIONS } from '../utils/rsvpStore';

/**
 * Factory for creating a new guest object.
 * Any validation or limits (e.g. max guests per party) can be
 * enforced here or at the submitRSVP() boundary in rsvpStore.js.
 */
function createGuest(isPrimary = false) {
  return {
    id: crypto.randomUUID(),
    fullName: '',
    mealChoice: '',
    dietaryNotes: '',
    isPrimary,
    isAttending: true,
  };
}

const STEPS = ['welcome', 'primary', 'party', 'meals', 'confirm', 'success'];

export default function RSVP() {
  const [step, setStep] = useState(0);
  const [party, setParty] = useState([createGuest(true)]);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [currentMealIndex, setCurrentMealIndex] = useState(0);

  const primaryGuest = party[0];
  const additionalGuests = party.slice(1);

  const updateGuest = (id, updates) => {
    setParty((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
    );
  };

  const addGuest = () => {
    setParty((prev) => [...prev, createGuest(false)]);
  };

  const removeGuest = (id) => {
    setParty((prev) => prev.filter((g) => g.id !== id));
  };

  const canAdvanceFromPrimary = primaryGuest.fullName.trim().length > 1;
  const canAdvanceFromParty = party.every((g) => g.fullName.trim().length > 1);
  const canAdvanceFromMeals = party.every((g) => g.mealChoice);

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      id: crypto.randomUUID(),
      primaryGuest: {
        fullName: primaryGuest.fullName,
      },
      guests: party.map((g) => ({
        id: g.id,
        fullName: g.fullName,
        mealChoice: g.mealChoice,
        dietaryNotes: g.dietaryNotes,
        isAttending: g.isAttending,
      })),
      totalGuests: party.length,
      message,
    };

    try {
      await submitRSVP(payload);
      setStep(5);
    } catch (err) {
      console.error('Failed to submit RSVP', err);
    } finally {
      setSubmitting(false);
    }
  };

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const currentMealGuest = party[currentMealIndex];

  return (
    <section id="rsvp" className="section-lux py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-charcoal-light via-charcoal to-charcoal-light" />
      <div
        className="absolute inset-0 w-full h-full opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,169,110,0.18), transparent 70%)',
        }}
      />

      <div className="container-lux relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-24">
          <ScrollReveal>
            <p className="font-body text-[11px] tracking-[0.42em] uppercase text-gold/80 mb-5">
              Kindly Respond
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-5xl md:text-7xl text-cream font-light tracking-wide mb-7">
              RSVP
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="gold-line mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="font-heading text-xl md:text-2xl text-cream/60 italic max-w-xl">
              Your presence would mean the world. Please let us know if you can share this day with us.
            </p>
          </ScrollReveal>
        </div>

        {/* Progress indicator */}
        {step > 0 && step < 5 && (
          <ScrollReveal>
            <div className="flex items-center justify-center gap-2 mb-10">
              {STEPS.slice(1, 5).map((_, i) => (
                <div
                  key={i}
                  className={`h-px transition-all duration-500 ${
                    i <= step - 1 ? 'w-14 bg-gold' : 'w-7 bg-gold/20'
                  }`}
                />
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* RSVP Card — wider, flex-column so every step can center */}
        <ScrollReveal delay={0.3} className="w-full flex justify-center">
          <div className="relative w-full max-w-3xl border border-gold/25 bg-charcoal/70 backdrop-blur-xl p-10 sm:p-14 md:p-20 min-h-[460px] md:min-h-[520px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] flex flex-col">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-l border-t border-gold/60 pointer-events-none" />
            <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-r border-t border-gold/60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-l border-b border-gold/60 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-r border-b border-gold/60 pointer-events-none" />

            <AnimatePresence mode="wait">
              {/* Step 0: Welcome */}
              {step === 0 && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 w-full flex flex-col items-center justify-center text-center"
                >
                  <Heart className="w-11 h-11 md:w-12 md:h-12 text-gold mb-8" strokeWidth={1} />
                  <h3 className="font-heading text-4xl md:text-5xl text-cream font-light mb-6">
                    Begin Your Response
                  </h3>
                  <p className="font-body text-sm md:text-base text-cream/60 max-w-md mb-12 leading-relaxed">
                    Let us know who's joining, add any guests in your party, and select meal preferences for everyone.
                  </p>
                  <button
                    onClick={goNext}
                    className="group inline-flex items-center gap-3 px-10 py-4 md:px-14 md:py-5 bg-gold text-charcoal text-[11px] md:text-xs tracking-[0.3em] uppercase font-body hover:bg-gold-light active:bg-gold-dark transition-all duration-500 min-h-[48px]"
                  >
                    <span>Start RSVP</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {/* Step 1: Primary guest name */}
              {step === 1 && (
                <motion.div
                  key="primary"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 w-full flex flex-col"
                >
                  <div className="flex flex-col items-center text-center mb-10">
                    <User className="w-6 h-6 text-gold mb-4" strokeWidth={1.2} />
                    <h3 className="font-heading text-4xl md:text-5xl text-cream font-light mb-3">
                      What is your name?
                    </h3>
                    <p className="font-body text-sm md:text-base text-cream/50">
                      Let's start with you.
                    </p>
                  </div>

                  <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
                    <label className="block font-body text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-3 text-center">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={primaryGuest.fullName}
                      onChange={(e) => updateGuest(primaryGuest.id, { fullName: e.target.value })}
                      placeholder="e.g. Noor Abu Daqa"
                      autoFocus
                      className="w-full bg-transparent border-b border-gold/30 focus:border-gold py-4 text-cream font-heading text-2xl md:text-3xl text-center placeholder:text-cream/20 focus:outline-none transition-colors"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && canAdvanceFromPrimary) goNext();
                      }}
                    />
                  </div>

                  <div className="flex justify-between items-center mt-10 w-full">
                    <button
                      onClick={goBack}
                      className="flex items-center gap-2 py-3 px-2 -mx-2 text-xs tracking-[0.2em] uppercase text-cream/50 hover:text-gold transition-colors min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      onClick={goNext}
                      disabled={!canAdvanceFromPrimary}
                      className="group flex items-center gap-3 px-7 py-4 md:px-8 md:py-3 bg-gold text-charcoal text-[11px] md:text-xs tracking-[0.3em] uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold-light active:bg-gold-dark transition-all duration-500 min-h-[44px]"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Add party members */}
              {step === 2 && (
                <motion.div
                  key="party"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 w-full flex flex-col"
                >
                  <div className="flex flex-col items-center text-center mb-8">
                    <h3 className="font-heading text-4xl md:text-5xl text-cream font-light mb-3">
                      Your Party
                    </h3>
                    <p className="font-body text-sm md:text-base text-cream/50 max-w-md">
                      Hello, <span className="text-gold">{primaryGuest.fullName.split(' ')[0]}</span>. Who else is joining you?
                    </p>
                  </div>

                  {/* Primary guest badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 border border-gold/30 bg-gold/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center">
                        <Check className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <p className="font-heading text-lg text-cream">{primaryGuest.fullName}</p>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60">You</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Additional guests */}
                  <AnimatePresence>
                    {additionalGuests.map((guest, idx) => (
                      <motion.div
                        key={guest.id}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -100, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-4 p-4 border border-gold/15 bg-charcoal/40 hover:border-gold/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-[10px] text-gold/70">
                            {idx + 2}
                          </div>
                          <input
                            type="text"
                            value={guest.fullName}
                            onChange={(e) => updateGuest(guest.id, { fullName: e.target.value })}
                            placeholder="Guest's full name"
                            autoFocus
                            className="flex-1 bg-transparent border-b border-gold/20 focus:border-gold/60 py-2 text-cream font-body placeholder:text-cream/20 focus:outline-none transition-colors"
                          />
                          <button
                            onClick={() => removeGuest(guest.id)}
                            className="p-3 text-cream/40 hover:text-gold active:text-gold-light transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                            aria-label="Remove guest"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Add guest button */}
                  <motion.button
                    layout
                    onClick={addGuest}
                    className="w-full py-5 border border-dashed border-gold/30 hover:border-gold/60 hover:bg-gold/5 text-gold text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-3 transition-all duration-500 mt-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Guest
                  </motion.button>

                  <div className="flex justify-between items-center mt-10 pt-2 w-full">
                    <button
                      onClick={goBack}
                      className="flex items-center gap-2 py-3 px-2 -mx-2 text-xs tracking-[0.2em] uppercase text-cream/50 hover:text-gold transition-colors min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      onClick={() => { setCurrentMealIndex(0); goNext(); }}
                      disabled={!canAdvanceFromParty}
                      className="group flex items-center gap-3 px-7 py-4 md:px-8 md:py-3 bg-gold text-charcoal text-[11px] md:text-xs tracking-[0.3em] uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold-light active:bg-gold-dark transition-all duration-500 min-h-[44px]"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Meal selection (per guest) */}
              {step === 3 && currentMealGuest && (
                <motion.div
                  key={`meals-${currentMealIndex}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 w-full flex flex-col"
                >
                  <div className="flex flex-col items-center text-center mb-8">
                    <Utensils className="w-6 h-6 text-gold mb-4" strokeWidth={1.2} />
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-2">
                      Guest {currentMealIndex + 1} of {party.length}
                    </p>
                    <h3 className="font-heading text-4xl md:text-5xl text-cream font-light mb-2">
                      {currentMealGuest.fullName}
                    </h3>
                    <p className="font-body text-sm md:text-base text-cream/50">
                      Please select your meal preference
                    </p>
                  </div>

                  {/* Meal options */}
                  <div className="space-y-3 mb-6">
                    {MEAL_OPTIONS.map((meal) => {
                      const selected = currentMealGuest.mealChoice === meal.value;
                      return (
                        <motion.button
                          key={meal.value}
                          onClick={() => updateGuest(currentMealGuest.id, { mealChoice: meal.value })}
                          whileHover={{ x: 4 }}
                          className={`w-full p-4 border text-left flex items-center justify-between transition-all duration-300 ${
                            selected
                              ? 'border-gold bg-gold/10'
                              : 'border-gold/15 hover:border-gold/40 bg-charcoal/40'
                          }`}
                        >
                          <div>
                            <p className={`font-heading text-xl ${selected ? 'text-gold' : 'text-cream'}`}>
                              {meal.label}
                            </p>
                            <p className="font-body text-xs text-cream/40 italic mt-1">
                              {meal.description}
                            </p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            selected ? 'border-gold bg-gold' : 'border-gold/30'
                          }`}>
                            {selected && <Check className="w-3 h-3 text-charcoal" strokeWidth={3} />}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Dietary notes */}
                  <div className="mb-6">
                    <label className="block font-body text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                      Dietary Notes (Optional)
                    </label>
                    <textarea
                      value={currentMealGuest.dietaryNotes}
                      onChange={(e) => updateGuest(currentMealGuest.id, { dietaryNotes: e.target.value })}
                      placeholder="Allergies, restrictions, or special requests..."
                      rows={2}
                      className="w-full bg-charcoal/40 border border-gold/20 focus:border-gold/60 p-3 text-cream font-body text-sm placeholder:text-cream/20 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-6 w-full">
                    <button
                      onClick={() => {
                        if (currentMealIndex > 0) {
                          setCurrentMealIndex(currentMealIndex - 1);
                        } else {
                          goBack();
                        }
                      }}
                      className="flex items-center gap-2 py-3 px-2 -mx-2 text-xs tracking-[0.2em] uppercase text-cream/50 hover:text-gold transition-colors min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      onClick={() => {
                        if (currentMealIndex < party.length - 1) {
                          setCurrentMealIndex(currentMealIndex + 1);
                        } else {
                          goNext();
                        }
                      }}
                      disabled={!currentMealGuest.mealChoice}
                      className="group flex items-center gap-3 px-7 py-4 md:px-8 md:py-3 bg-gold text-charcoal text-[11px] md:text-xs tracking-[0.3em] uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold-light active:bg-gold-dark transition-all duration-500 min-h-[44px]"
                    >
                      <span>{currentMealIndex < party.length - 1 ? 'Next Guest' : 'Review'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirm */}
              {step === 4 && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 w-full flex flex-col"
                >
                  <div className="flex flex-col items-center text-center mb-8">
                    <h3 className="font-heading text-4xl md:text-5xl text-cream font-light mb-3">
                      Review Your RSVP
                    </h3>
                    <p className="font-body text-sm md:text-base text-cream/50">
                      Everything look right?
                    </p>
                  </div>

                  <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-2">
                    {party.map((guest, idx) => {
                      const meal = MEAL_OPTIONS.find((m) => m.value === guest.mealChoice);
                      return (
                        <div key={guest.id} className="p-4 border border-gold/20 bg-charcoal/40">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-1">
                                Guest {idx + 1}
                              </p>
                              <p className="font-heading text-xl text-cream truncate">
                                {guest.fullName}
                              </p>
                              <p className="font-body text-xs text-cream/60 italic mt-1">
                                {meal?.label}
                              </p>
                              {guest.dietaryNotes && (
                                <p className="font-body text-[11px] text-cream/40 mt-2 italic">
                                  Note: {guest.dietaryNotes}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Message to couple */}
                  <div className="mb-6">
                    <label className="block font-body text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-2">
                      A Note for Osama & Joud (Optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share a wish, memory, or kind word..."
                      rows={3}
                      className="w-full bg-charcoal/40 border border-gold/20 focus:border-gold/60 p-3 text-cream font-body text-sm placeholder:text-cream/20 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-6 w-full">
                    <button
                      onClick={goBack}
                      disabled={submitting}
                      className="flex items-center gap-2 py-3 px-2 -mx-2 text-xs tracking-[0.2em] uppercase text-cream/50 hover:text-gold transition-colors disabled:opacity-30 min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="group flex items-center gap-3 px-9 py-4 md:px-10 bg-gold text-charcoal text-[11px] md:text-xs tracking-[0.3em] uppercase disabled:opacity-60 hover:bg-gold-light active:bg-gold-dark transition-all duration-500 min-h-[48px]"
                    >
                      {submitting ? (
                        <>
                          <div className="w-3 h-3 border border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                          <span>Sending</span>
                        </>
                      ) : (
                        <>
                          <span>Submit RSVP</span>
                          <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Success */}
              {step === 5 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 w-full flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 mb-8 rounded-full border-2 border-gold flex items-center justify-center"
                  >
                    <Check className="w-8 h-8 text-gold" strokeWidth={1.5} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <h3 className="font-heading text-4xl md:text-5xl text-cream font-light mb-4">
                      Thank you
                    </h3>
                    <p className="font-script text-4xl text-gold mb-6">
                      {primaryGuest.fullName.split(' ')[0]}
                    </p>
                    <p className="font-body text-sm md:text-base text-cream/60 max-w-md leading-relaxed mb-2">
                      Your response has been received. We cannot wait to celebrate with
                      {party.length > 1 ? ` you and your party of ${party.length}` : ' you'}.
                    </p>
                    <p className="font-body text-xs text-gold/50 italic mt-6">
                      — Osama & Joud
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
