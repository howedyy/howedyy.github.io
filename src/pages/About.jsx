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

const About = () => {
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
      {/* About Me Section */}
      <section id="about" className="about-section scroll-reveal" style={{ background: 'transparent' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Discover</span>
            <h2 className="section-title">About Me</h2>
          </div>
          <div className="about-content">
            <div className="about-text glass-card">
              <p>I am a communication engineering graduate and a proud veteran, having served 15 years as a Major Engineer
                in the Egyptian Armed Forces. Throughout my career, I've always been driven by a passion for solving
                complex, mission-critical problems.</p>
              <p>I successfully transitioned into the tech industry, diving into Flutter development and freelancing,
                where I discovered my flair for creating seamless, cross-platform mobile experiences. Today, I combine my
                engineering foundation, military discipline, and development expertise to lead digital transformation
                efforts at Edara Property Management (SODIC).</p>
              <p>Whether it's building a scalable app from the ground up or optimizing enterprise-level workflows, my goal
                is to deliver impactful software solutions that drive real-world efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section scroll-reveal" style={{ background: 'transparent' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Expertise</span>
            <h2 className="section-title">My Skills</h2>
          </div>
          <div className="skills-grid">
            <div className="skill-card glass-card hover-lift">
              <div className="skill-icon">
                <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <h3 className="skill-title">Mobile Development</h3>
              <div className="skill-tags">
                <span className="tag">Flutter</span>
                <span className="tag">Dart</span>
                <span className="tag">Firebase</span>
                <span className="tag">REST APIs</span>
                <span className="tag">JSON</span>
                <span className="tag">BLoC</span>
                <span className="tag">Provider</span>
                <span className="tag">Clean Architecture</span>
                <span className="tag">SOLID Principles</span>
              </div>
            </div>

            <div className="skill-card glass-card hover-lift">
              <div className="skill-icon">
                <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none">
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
              </div>
              <h3 className="skill-title">Web & Backend</h3>
              <div className="skill-tags">
                <span className="tag">React.JS</span>
                <span class="tag">HTML</span>
                <span class="tag">CSS</span>
                <span class="tag">JavaScript</span>
                <span class="tag">PHP</span>
                <span class="tag">SQL</span>
                <span class="tag">MySQL</span>
              </div>
            </div>

            <div className="skill-card glass-card hover-lift">
              <div className="skill-icon">
                <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
              <h3 className="skill-title">Leadership</h3>
              <div className="skill-tags">
                <span className="tag">Digital Transformation</span>
                <span className="tag">ERP Implementation</span>
                <span className="tag">Workflow Automation</span>
                <span className="tag">Team Leadership</span>
                <span className="tag">Agile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="timeline-section scroll-reveal" style={{ background: 'transparent' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Career Journey</span>
            <h2 className="section-title">Experience</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item hover-lift">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-card">
                <div className="timeline-date">2007–2022</div>
                <h3 className="timeline-role">Major Engineer</h3>
                <h4 className="timeline-company">Egyptian Armed Forces</h4>
                <p className="timeline-desc">15 years leading teams in high-stakes environments. Built deep instincts for discipline, process ownership, risk management, and delivering results under pressure.</p>
              </div>
            </div>
            
            <div className="timeline-item hover-lift">
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-card">
                <div className="timeline-date">Oct 2024–Present</div>
                <h3 className="timeline-role">Digital Transformation Senior Supervisor</h3>
                <h4 className="timeline-company">Edara/SODIC</h4>
                <p className="timeline-desc">Leading comprehensive digital transformation initiatives to modernize enterprise operations. Designed and launched mission-critical web systems from scratch.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
