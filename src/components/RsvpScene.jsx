import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, ArrowRight, ArrowLeft, Heart, User, Utensils, Sparkles,
} from 'lucide-react';
import { submitRSVP, MEAL_OPTIONS } from '../utils/rsvpStore';

/**
 * RSVP Scene — simple single-person RSVP.
 * Each guest submits individually: name + protein selection.
 */

const STEPS = [
  { key: 'welcome', label: 'Begin' },
  { key: 'name', label: 'Your Name' },
  { key: 'meal', label: 'Meal' },
  { key: 'review', label: 'Review' },
];

export default function RsvpScene() {
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState('');
  const [mealChoice, setMealChoice] = useState('');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canAdvanceName = fullName.trim().length >= 2;

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submitRSVP({
        id: crypto.randomUUID(),
        primaryGuest: { fullName },
        guests: [
          {
            id: crypto.randomUUID(),
            fullName,
            mealChoice,
            dietaryNotes,
            isAttending: true,
          },
        ],
        totalGuests: 1,
        message: '',
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartOver = () => {
    setStep(0);
    setFullName('');
    setMealChoice('');
    setDietaryNotes('');
    setSubmitted(false);
  };

  return (
    <section
      id="rsvp"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-light via-charcoal to-charcoal-light" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,180,128,0.13), transparent 72%)',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="font-body text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold/80 mb-5"
        >
          Kindly Respond
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-5xl md:text-7xl text-cream font-light mb-6 text-center"
        >
          RSVP
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="gold-line mb-16 md:mb-20"
        />

        {/* Progress pill */}
        {!submitted && step > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-10"
          >
            {STEPS.slice(1).map((s, i) => {
              const active = i + 1 === step;
              const done = i + 1 < step;
              return (
                <div key={s.key} className="flex items-center gap-2">
                  <div
                    className={`h-[2px] transition-all duration-700 ${
                      active ? 'w-10 bg-gold' : done ? 'w-10 bg-gold/70' : 'w-6 bg-gold/20'
                    }`}
                  />
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Main panel */}
        <div className="relative w-full min-h-[440px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 180 }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gold flex items-center justify-center mb-10"
                >
                  <Check className="w-9 h-9 md:w-10 md:h-10 text-gold" strokeWidth={1.3} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold/70 mb-5">
                    Response Received
                  </p>
                  <h3 className="font-heading text-5xl md:text-6xl text-cream font-light mb-4">
                    Thank you
                  </h3>
                  <p className="font-script text-4xl md:text-5xl text-gold-light mb-8">
                    {fullName.split(' ')[0]}
                  </p>
                  <p className="font-heading italic text-lg md:text-xl text-cream/60 max-w-md leading-relaxed">
                    We cannot wait to celebrate this day with you.
                  </p>
                  <button
                    onClick={handleStartOver}
                    className="mt-10 inline-flex items-center gap-3 px-8 py-4 border border-gold/40 text-gold text-[10px] tracking-[0.3em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-500"
                  >
                    Submit another RSVP
                  </button>
                  <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/50 mt-10">
                    With love, Osama &amp; Joud
                  </p>
                </motion.div>
              </motion.div>
            ) : step === 0 ? (
              // STEP 0: Welcome
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col items-center text-center"
              >
                <Heart className="w-12 h-12 md:w-14 md:h-14 text-gold mb-8" strokeWidth={1} />
                <h3 className="font-heading text-4xl md:text-5xl text-cream font-light mb-5">
                  Begin Your Response
                </h3>
                <p className="font-heading italic text-base md:text-xl text-cream/60 max-w-md mb-12 leading-relaxed">
                  Please RSVP individually — enter your name and choose your protein.
                </p>
                <button
                  onClick={next}
                  className="group inline-flex items-center gap-4 px-12 py-5 md:px-16 md:py-6 bg-gold text-charcoal text-[11px] tracking-[0.35em] uppercase font-body hover:bg-gold-light active:bg-gold-dark transition-all duration-500 min-h-[52px]"
                >
                  <span>Begin</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : step === 1 ? (
              // STEP 1: Name
              <motion.div
                key="name"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col items-center"
              >
                <User className="w-7 h-7 text-gold mb-6" strokeWidth={1.2} />
                <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold/70 mb-5">
                  Step 1 of 3
                </p>
                <h3 className="font-heading text-4xl md:text-5xl text-cream font-light mb-4 text-center">
                  What is your name?
                </h3>
                <p className="font-heading italic text-base md:text-lg text-cream/55 mb-14 text-center">
                  Please enter your full name.
                </p>

                <div className="w-full max-w-lg px-4">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    autoFocus
                    className="w-full bg-transparent border-b border-gold/30 focus:border-gold pb-4 pt-2 text-cream font-heading text-2xl md:text-3xl text-center placeholder:text-cream/20 focus:outline-none transition-colors"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && canAdvanceName) next();
                    }}
                  />
                </div>

                <div className="flex items-center justify-between w-full max-w-lg mt-16 px-4">
                  <button
                    onClick={back}
                    className="flex items-center gap-2 py-3 text-[10px] tracking-[0.3em] uppercase text-cream/50 hover:text-gold transition-colors min-h-[44px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={next}
                    disabled={!canAdvanceName}
                    className="group flex items-center gap-3 px-8 py-4 md:px-10 bg-gold text-charcoal text-[10px] tracking-[0.3em] uppercase disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gold-light active:bg-gold-dark transition-all duration-500 min-h-[48px]"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ) : step === 2 ? (
              // STEP 2: Meal
              <motion.div
                key="meal"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col items-center"
              >
                <Utensils className="w-7 h-7 text-gold mb-6" strokeWidth={1.2} />
                <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold/70 mb-5">
                  Step 2 of 3
                </p>
                <h3 className="font-heading text-3xl md:text-5xl text-cream font-light mb-2 text-center">
                  Choose Your Protein
                </h3>
                <p className="font-heading italic text-base md:text-lg text-cream/55 mb-10 text-center">
                  Hello{' '}
                  <span className="text-gold">{fullName.split(' ')[0]}</span>,
                  please select your meal.
                </p>

                <div className="w-full max-w-lg space-y-3">
                  {MEAL_OPTIONS.map((meal) => {
                    const selected = mealChoice === meal.value;
                    return (
                      <motion.button
                        key={meal.value}
                        onClick={() => setMealChoice(meal.value)}
                        whileHover={{ x: 4 }}
                        className={`w-full p-5 border text-left flex items-center justify-between gap-4 transition-all duration-300 ${
                          selected
                            ? 'border-gold bg-gold/10'
                            : 'border-gold/15 hover:border-gold/40 bg-charcoal-light/30'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p
                            className={`font-heading text-xl md:text-2xl ${
                              selected ? 'text-gold' : 'text-cream'
                            }`}
                          >
                            {meal.label}
                          </p>
                          <p className="font-body text-xs text-cream/40 italic mt-1">
                            {meal.description}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                            selected ? 'border-gold bg-gold' : 'border-gold/30'
                          }`}
                        >
                          {selected && (
                            <Check className="w-3 h-3 text-charcoal" strokeWidth={3} />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}

                  <textarea
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    placeholder="Dietary notes (optional)"
                    rows={2}
                    className="w-full bg-charcoal-light/30 border border-gold/15 focus:border-gold/50 p-4 text-cream font-body text-base placeholder:text-cream/25 focus:outline-none transition-colors resize-none mt-4"
                  />
                </div>

                <div className="flex items-center justify-between w-full max-w-lg mt-10">
                  <button
                    onClick={back}
                    className="flex items-center gap-2 py-3 text-[10px] tracking-[0.3em] uppercase text-cream/50 hover:text-gold transition-colors min-h-[44px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={next}
                    disabled={!mealChoice}
                    className="group flex items-center gap-3 px-8 py-4 md:px-10 bg-gold text-charcoal text-[10px] tracking-[0.3em] uppercase disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gold-light transition-all duration-500 min-h-[48px]"
                  >
                    <span>Review</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ) : (
              // STEP 3: Review
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col items-center"
              >
                <Sparkles className="w-7 h-7 text-gold mb-6" strokeWidth={1.2} />
                <p className="font-body text-[10px] tracking-[0.45em] uppercase text-gold/70 mb-5">
                  Step 3 of 3
                </p>
                <h3 className="font-heading text-4xl md:text-5xl text-cream font-light mb-4 text-center">
                  Almost there
                </h3>
                <p className="font-heading italic text-base md:text-lg text-cream/55 mb-10 text-center">
                  A final look before you send.
                </p>

                <div className="w-full max-w-lg">
                  <div className="p-5 border border-gold/15 bg-charcoal-light/30 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gold" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-xl text-cream truncate">
                        {fullName}
                      </p>
                      <p className="font-body text-xs text-cream/50 italic">
                        {MEAL_OPTIONS.find((m) => m.value === mealChoice)?.label}
                      </p>
                      {dietaryNotes && (
                        <p className="font-body text-[11px] text-cream/35 italic mt-1">
                          Note: {dietaryNotes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full max-w-lg mt-10">
                  <button
                    onClick={back}
                    disabled={submitting}
                    className="flex items-center gap-2 py-3 text-[10px] tracking-[0.3em] uppercase text-cream/50 hover:text-gold transition-colors disabled:opacity-25 min-h-[44px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="group flex items-center gap-3 px-10 py-4 md:px-12 bg-gold text-charcoal text-[10px] tracking-[0.3em] uppercase disabled:opacity-60 hover:bg-gold-light transition-all duration-500 min-h-[48px]"
                  >
                    {submitting ? (
                      <>
                        <div className="w-3 h-3 border border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                        <span>Sending</span>
                      </>
                    ) : (
                      <>
                        <span>Send Response</span>
                        <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={1.6} />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
