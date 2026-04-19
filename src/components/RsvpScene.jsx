import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, ArrowRight, ArrowLeft, Heart, User, Utensils, Sparkles,
} from 'lucide-react';
import { submitRSVP, MEAL_OPTIONS } from '../utils/rsvpStore';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * RSVP — proportioned single-guest form.
 *
 * Section: 96px padding (section-pad) + extra visual emphasis
 * Header → card: 48px
 *
 * Card internal rhythm per step:
 *   icon → step meta      16px
 *   step meta → heading   12px
 *   heading → body        24px
 *   body → input/content  variable
 *   content → nav row     40px
 *
 * Primary CTA: min-width 180px, taller padding.
 */

const STEPS = [
  { key: 'welcome', label: 'Begin' },
  { key: 'name', label: 'Your Name' },
  { key: 'meal', label: 'Meal' },
  { key: 'review', label: 'Review' },
];

export default function RsvpScene() {
  const [sectionRef, sectionInView] = useScrollReveal(0.1);
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
        guests: [{
          id: crypto.randomUUID(),
          fullName,
          mealChoice,
          dietaryNotes,
          isAttending: true,
        }],
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

  /* shared nav row — responsive sizing */
  const navRow = (backAction, forwardAction, forwardLabel, forwardDisabled, isSubmit) => (
    <div
      className="flex items-center justify-between w-full gap-3"
      style={{ marginTop: 32 }}
    >
      <button
        onClick={backAction}
        disabled={submitting}
        className="flex items-center gap-2 py-3 px-1 text-[10px] tracking-[0.3em] uppercase text-cream/45 hover:text-gold transition-colors disabled:opacity-20"
        style={{ minHeight: 44 }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </button>
      <button
        onClick={forwardAction}
        disabled={forwardDisabled}
        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gold text-charcoal text-[10px] tracking-[0.3em] uppercase font-medium disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gold-light active:bg-gold-dark transition-all duration-500"
        style={{
          minWidth: 150,
          paddingInline: 'clamp(20px, 5vw, 32px)',
          paddingBlock: 15,
          minHeight: 48,
        }}
      >
        {submitting && isSubmit ? (
          <>
            <div className="w-3 h-3 border border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
            <span>Sending</span>
          </>
        ) : isSubmit ? (
          <>
            <span>{forwardLabel}</span>
            <Heart className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" strokeWidth={1.6} />
          </>
        ) : (
          <>
            <span>{forwardLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </button>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative w-full flex flex-col items-center justify-center overflow-hidden section-pad-lg"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-warm/25 to-charcoal" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 40%, rgba(201,169,110,0.09), transparent 70%)',
        }}
      />
      <div className="texture-overlay" />

      <div className="container-narrow relative z-10 flex flex-col items-center">
        {/* Section header */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/60"
          style={{ marginBottom: 16 }}
        >
          Kindly Respond
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-3xl md:text-5xl text-cream font-light text-center"
          style={{ marginBottom: 20 }}
        >
          RSVP
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={sectionInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="gold-line"
          style={{ marginBottom: 28 }}
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.45 }}
          className="font-heading italic text-lg md:text-2xl text-cream/85 text-center max-w-xl leading-relaxed"
          style={{ marginBottom: 24 }}
        >
          Kindly respond by{' '}
          <span className="text-gold not-italic tracking-wide font-normal">June 15</span>
          {' '}so we may have an accurate headcount.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.55 }}
          className="font-body text-[10px] tracking-[0.35em] uppercase text-gold/55 text-center"
          style={{ marginBottom: 48 }}
        >
          We kindly request no boxed gifts, please
        </motion.p>

        {/* Step progress */}
        {!submitted && step > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
            style={{ marginBottom: 24 }}
          >
            {STEPS.slice(1).map((s, i) => (
              <div
                key={s.key}
                className={`h-[2px] rounded-full transition-all duration-700 ${
                  i + 1 === step
                    ? 'w-9 bg-gold'
                    : i + 1 < step
                      ? 'w-9 bg-gold/55'
                      : 'w-5 bg-gold/15'
                }`}
              />
            ))}
          </motion.div>
        )}

        {/* RSVP card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full border border-gold/12 bg-charcoal-light/40 backdrop-blur-sm"
          style={{
            paddingTop: 'clamp(28px, 5vw, 48px)',
            paddingBottom: 'clamp(28px, 5vw, 48px)',
            paddingLeft: 'clamp(20px, 5vw, 48px)',
            paddingRight: 'clamp(20px, 5vw, 48px)',
          }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              /* SUCCESS */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 180 }}
                  className="w-14 h-14 rounded-full border border-gold/45 flex items-center justify-center"
                  style={{ marginBottom: 24 }}
                >
                  <Check className="w-6 h-6 text-gold" strokeWidth={1.3} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <p
                    className="font-body text-[9px] tracking-[0.4em] uppercase text-gold/55"
                    style={{ marginBottom: 12 }}
                  >
                    Response Received
                  </p>
                  <h3
                    className="font-heading text-3xl md:text-4xl text-cream font-light"
                    style={{ marginBottom: 8 }}
                  >
                    Thank you
                  </h3>
                  <p
                    className="font-script text-3xl md:text-4xl text-gold-light"
                    style={{ marginBottom: 20 }}
                  >
                    {fullName.split(' ')[0]}
                  </p>
                  <p
                    className="font-heading italic text-sm md:text-base text-cream/50 max-w-xs leading-relaxed"
                    style={{ marginBottom: 32 }}
                  >
                    We cannot wait to celebrate this day with you.
                  </p>
                  <button
                    onClick={handleStartOver}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/30 text-gold text-[10px] tracking-[0.3em] uppercase hover:bg-gold/10 hover:border-gold/55 transition-all duration-500"
                    style={{ paddingInline: 28, paddingBlock: 14 }}
                  >
                    Submit another RSVP
                  </button>
                </motion.div>
              </motion.div>
            ) : step === 0 ? (
              /* WELCOME */
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col items-center text-center"
              >
                <Heart className="w-10 h-10 text-gold/65" strokeWidth={1} style={{ marginBottom: 24 }} />
                <h3
                  className="font-heading text-2xl md:text-3xl text-cream font-light"
                  style={{ marginBottom: 12 }}
                >
                  Begin Your Response
                </h3>
                <p
                  className="font-heading italic text-sm md:text-[15px] text-cream/50 max-w-[320px] leading-relaxed"
                  style={{ marginBottom: 40 }}
                >
                  Please RSVP individually — enter your name and choose your meal.
                </p>
                <button
                  onClick={next}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold text-charcoal text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-gold-light active:bg-gold-dark transition-all duration-500"
                  style={{
                    minWidth: 180,
                    paddingInline: 'clamp(28px, 7vw, 36px)',
                    paddingBlock: 18,
                    minHeight: 52,
                  }}
                >
                  <span>Begin</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : step === 1 ? (
              /* NAME */
              <motion.div
                key="name"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col items-center"
              >
                <User className="w-5 h-5 text-gold/65" strokeWidth={1.2} style={{ marginBottom: 16 }} />
                <p
                  className="font-body text-[9px] tracking-[0.4em] uppercase text-gold/50"
                  style={{ marginBottom: 12 }}
                >
                  Step 1 of 3
                </p>
                <h3
                  className="font-heading text-2xl md:text-3xl text-cream font-light text-center"
                  style={{ marginBottom: 8 }}
                >
                  What is your name?
                </h3>
                <p
                  className="font-heading italic text-sm text-cream/45 text-center"
                  style={{ marginBottom: 32 }}
                >
                  Please enter your full name.
                </p>

                <div className="w-full max-w-sm">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    autoFocus
                    className="w-full bg-transparent border-b border-gold/25 focus:border-gold/65 pb-3 pt-1 text-cream font-heading text-xl md:text-2xl text-center placeholder:text-cream/15 focus:outline-none transition-colors"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && canAdvanceName) next();
                    }}
                  />
                </div>

                {navRow(back, next, 'Continue', !canAdvanceName, false)}
              </motion.div>
            ) : step === 2 ? (
              /* MEAL */
              <motion.div
                key="meal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col items-center"
              >
                <Utensils className="w-5 h-5 text-gold/65" strokeWidth={1.2} style={{ marginBottom: 16 }} />
                <p
                  className="font-body text-[9px] tracking-[0.4em] uppercase text-gold/50"
                  style={{ marginBottom: 12 }}
                >
                  Step 2 of 3
                </p>
                <h3
                  className="font-heading text-2xl md:text-3xl text-cream font-light text-center"
                  style={{ marginBottom: 8 }}
                >
                  Choose Your Meal
                </h3>
                <p
                  className="font-heading italic text-sm text-cream/45 text-center"
                  style={{ marginBottom: 28 }}
                >
                  Hello <span className="text-gold/75">{fullName.split(' ')[0]}</span>, please select your protein.
                </p>

                <div className="w-full flex flex-col gap-2">
                  {MEAL_OPTIONS.map((meal) => {
                    const selected = mealChoice === meal.value;
                    return (
                      <motion.button
                        key={meal.value}
                        onClick={() => setMealChoice(meal.value)}
                        whileHover={{ x: 2 }}
                        className={`w-full py-4 border text-left flex items-center justify-between gap-3 transition-all duration-300 ${
                          selected
                            ? 'border-gold/40 bg-gold/8'
                            : 'border-gold/10 hover:border-gold/25 bg-charcoal/25'
                        }`}
                        style={{ paddingLeft: 24, paddingRight: 20 }}
                      >
                        <p
                          className={`font-heading text-lg md:text-xl ${selected ? 'text-gold' : 'text-cream/80'}`}
                        >
                          {meal.label}
                        </p>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                            selected ? 'border-gold bg-gold' : 'border-gold/25'
                          }`}
                        >
                          {selected && <Check className="w-2.5 h-2.5 text-charcoal" strokeWidth={3} />}
                        </div>
                      </motion.button>
                    );
                  })}

                  <textarea
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    placeholder="Dietary notes (optional)"
                    rows={2}
                    className="w-full bg-charcoal/25 border border-gold/10 focus:border-gold/30 text-cream font-body text-sm placeholder:text-cream/20 focus:outline-none transition-colors resize-none"
                    style={{ marginTop: 8, paddingTop: 14, paddingBottom: 14, paddingLeft: 24, paddingRight: 20 }}
                  />
                </div>

                {navRow(back, next, 'Review', !mealChoice, false)}
              </motion.div>
            ) : (
              /* REVIEW */
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col items-center"
              >
                <Sparkles className="w-5 h-5 text-gold/65" strokeWidth={1.2} style={{ marginBottom: 16 }} />
                <p
                  className="font-body text-[9px] tracking-[0.4em] uppercase text-gold/50"
                  style={{ marginBottom: 12 }}
                >
                  Step 3 of 3
                </p>
                <h3
                  className="font-heading text-2xl md:text-3xl text-cream font-light text-center"
                  style={{ marginBottom: 8 }}
                >
                  Confirm &amp; Send
                </h3>
                <p
                  className="font-heading italic text-sm text-cream/45 text-center"
                  style={{ marginBottom: 28 }}
                >
                  A final look before you send.
                </p>

                <div
                  className="w-full border border-gold/15 bg-charcoal/30 flex flex-col items-center text-center"
                  style={{ padding: 'clamp(20px, 5vw, 28px)', gap: 16 }}
                >
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center">
                    <User className="w-4 h-4 text-gold/70" strokeWidth={1.3} />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-heading text-xl md:text-2xl text-cream">
                      {fullName}
                    </p>
                    <p className="font-heading italic text-base text-gold/70">
                      {MEAL_OPTIONS.find((m) => m.value === mealChoice)?.label}
                    </p>
                    {dietaryNotes && (
                      <p
                        className="font-body text-xs text-cream/35 italic pt-3 border-t border-gold/10 w-full max-w-[240px]"
                        style={{ marginTop: 8 }}
                      >
                        {dietaryNotes}
                      </p>
                    )}
                  </div>
                </div>

                {navRow(back, handleSubmit, 'Send Response', submitting, true)}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
