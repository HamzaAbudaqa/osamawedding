import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Check, Lock, X } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { uploadPhoto } from '../utils/photoStore';

/**
 * Private Photo Delivery
 *
 * Guests upload photos that are delivered privately to Osama & Joud.
 * Photos are NOT shown in a public gallery on the site.
 *
 * Currently stores via photoStore (localStorage for demo). In production
 * this would route to a private bucket + email/push notification to the
 * couple, or sync directly to their iCloud Photos via a Shortcut webhook.
 */
export default function Gallery() {
  const [uploading, setUploading] = useState(false);
  const [uploaderName, setUploaderName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [pendingFiles, setPendingFiles] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    const savedName = localStorage.getItem('osama_joud_uploader_name');
    if (savedName) {
      setUploaderName(savedName);
      performUpload(validFiles, savedName);
    } else {
      setPendingFiles(validFiles);
      setShowNamePrompt(true);
    }
  };

  const performUpload = async (files, name) => {
    setUploading(true);
    try {
      for (const file of files) {
        await uploadPhoto(file, name);
      }
      setSuccessCount((n) => n + files.length);
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  const confirmName = () => {
    if (!uploaderName.trim() || !pendingFiles) return;
    localStorage.setItem('osama_joud_uploader_name', uploaderName.trim());
    performUpload(pendingFiles, uploaderName.trim());
    setShowNamePrompt(false);
    setPendingFiles(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const hasUploaded = successCount > 0;

  return (
    <section id="gallery" className="section-lux py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-charcoal-light via-charcoal to-charcoal" />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,169,110,0.18), transparent 70%)',
        }}
      />

      <div className="container-lux relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-24">
          <ScrollReveal>
            <p className="font-body text-[11px] tracking-[0.42em] uppercase text-gold/80 mb-6">
              A Private Album
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-5xl md:text-7xl text-cream font-light tracking-wide mb-8">
              Share a Memory
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="gold-line mb-10" />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="font-heading text-xl md:text-2xl text-cream/65 italic max-w-2xl leading-relaxed">
              Every photograph you capture becomes a chapter of our story. Your photos are delivered privately to Osama & Joud — no public gallery, no strangers, just a quiet archive of moments only the two of them will see.
            </p>
          </ScrollReveal>
        </div>

        {/* Upload Card */}
        <ScrollReveal delay={0.3} className="w-full flex justify-center">
          <div className="relative w-full max-w-3xl border border-gold/25 bg-charcoal/70 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-l border-t border-gold/60 pointer-events-none" />
            <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-r border-t border-gold/60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-l border-b border-gold/60 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-r border-b border-gold/60 pointer-events-none" />

            <AnimatePresence mode="wait">
              {!hasUploaded ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  className={`p-10 sm:p-14 md:p-20 flex flex-col items-center text-center transition-colors duration-500 ${
                    dragActive ? 'bg-gold/5' : ''
                  }`}
                >
                  <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/40">
                    <Camera className="w-6 h-6 text-gold" strokeWidth={1.2} />
                  </div>

                  <h3 className="font-heading text-3xl md:text-4xl text-cream font-light mb-5">
                    Upload Your Photos
                  </h3>

                  <p className="font-body text-sm md:text-base text-cream/55 max-w-md mb-10 leading-relaxed">
                    Drag and drop, or tap below to browse. Photos are delivered only to the couple.
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="group inline-flex items-center gap-3 px-10 py-4 md:px-14 md:py-5 bg-gold text-charcoal text-[11px] md:text-xs tracking-[0.3em] uppercase font-body hover:bg-gold-light active:bg-gold-dark transition-all duration-500 disabled:opacity-50 min-h-[48px]"
                  >
                    {uploading ? (
                      <>
                        <div className="w-3 h-3 border border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                        <span>Uploading</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Select Photos</span>
                      </>
                    )}
                  </button>

                  <div className="mt-12 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-gold/50">
                    <Lock className="w-3 h-3" strokeWidth={1.5} />
                    <span>Private · Delivered only to Osama &amp; Joud</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="p-10 sm:p-14 md:p-20 flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 mb-8 rounded-full border-2 border-gold flex items-center justify-center"
                  >
                    <Check className="w-8 h-8 text-gold" strokeWidth={1.5} />
                  </motion.div>

                  <h3 className="font-heading text-4xl md:text-5xl text-cream font-light mb-5">
                    Thank you
                  </h3>

                  <p className="font-body text-sm md:text-base text-cream/60 max-w-md mb-2 leading-relaxed">
                    {successCount === 1
                      ? 'Your photo is on its way to Osama & Joud.'
                      : `Your ${successCount} photos are on their way to Osama & Joud.`}
                  </p>
                  <p className="font-body text-xs text-gold/50 italic mt-2">
                    They will treasure it.
                  </p>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="mt-12 group inline-flex items-center gap-3 px-8 py-3 border border-gold/40 text-gold text-[10px] tracking-[0.3em] uppercase font-body hover:bg-gold/10 hover:border-gold transition-all duration-500 min-h-[44px]"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Share another</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>

      {/* Name prompt modal */}
      <AnimatePresence>
        {showNamePrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-md w-full border border-gold/30 bg-charcoal p-10"
            >
              <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-gold" />
              <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-gold" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-gold" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-gold" />

              <button
                onClick={() => { setShowNamePrompt(false); setPendingFiles(null); }}
                className="absolute top-3 right-3 p-2 text-cream/40 hover:text-gold transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-heading text-2xl text-cream font-light mb-3 text-center">
                Before we send
              </h3>
              <p className="font-body text-xs text-cream/60 text-center mb-8 leading-relaxed">
                Let Osama &amp; Joud know who to thank for these beautiful memories.
              </p>
              <input
                type="text"
                value={uploaderName}
                onChange={(e) => setUploaderName(e.target.value)}
                placeholder="Your name"
                autoFocus
                className="w-full bg-transparent border-b border-gold/30 focus:border-gold py-3 text-cream text-center font-heading text-lg placeholder:text-cream/20 focus:outline-none transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && confirmName()}
              />
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => { setShowNamePrompt(false); setPendingFiles(null); }}
                  className="flex-1 py-3 border border-gold/20 text-cream/60 text-xs tracking-[0.2em] uppercase hover:border-gold/40 hover:text-cream transition-all min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmName}
                  disabled={!uploaderName.trim()}
                  className="flex-1 py-3 bg-gold text-charcoal text-xs tracking-[0.2em] uppercase disabled:opacity-30 hover:bg-gold-light transition-all min-h-[44px]"
                >
                  Send
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
