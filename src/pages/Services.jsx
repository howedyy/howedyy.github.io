import React, { useEffect } from 'react';
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

const Services = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };
    const revealObserver = new IntersectionObserver(revealCallback, {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });
    revealElements.forEach(el => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <section id="services" className="services-section scroll-reveal" style={{ background: 'transparent' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What I Do</span>
            <h2 className="section-title">Services & Solutions</h2>
          </div>
          <div className="services-grid">

            <div className="service-card glass-card hover-lift">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 className="service-title">Enterprise Web Applications</h3>
              <p className="service-desc">I build robust, scalable internal web apps that replace messy spreadsheets and paper
                forms. Let’s automate your enterprise workflows, enhance tracking, and save your team hundreds of hours.
              </p>
            </div>

            <div className="service-card glass-card hover-lift">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <h3 className="service-title">Premium Mobile Apps</h3>
              <p className="service-desc">I develop high-performance, cross-platform applications using Flutter. From
                consumer-facing products to complex B2B mobile solutions, I deliver clean architecture and flawless user
                experiences.</p>
            </div>

            <div className="service-card glass-card hover-lift">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="service-title">Digital Transformation</h3>
              <p className="service-desc">Not sure how to digitize your operations? I provide technical leadership and
                strategy, guiding your business from legacy systems to modern, data-driven software ecosystems.</p>
            </div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services;
