import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const Contact = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <section className="contact-section" style={{ background: 'transparent', padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Get In Touch</span>
            <h2 className="section-title">Let's Work Together</h2>
          </div>
          <div className="contact-content glass-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: 'var(--text-dark)' }}>
              Ready to automate your workflows or build a premium mobile app? Drop me a message and let's discuss your project.
            </p>
            <a href="mailto:hello@example.com" className="btn btn-primary" style={{ display: 'inline-block' }}>Send Me an Email</a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
