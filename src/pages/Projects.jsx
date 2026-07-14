import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const projectData = [
  {
    id: "hse",
    title: "HSE Management ERP",
    desc: "A comprehensive ERP application for scaling health, safety, and environment workflows and tracking compliance.",
    tags: ["React.JS", "HTML", "CSS", "JS", "PHP", "REST APIs", "MySQL"],
    img: "/assets/images/project-hse.png",
    github: "https://github.com/howedyy/HSE",
    live: "#",
    screenshots: [
      "/assets/images/HSE1.png",
      "/assets/images/HSE2.png",
      "/assets/images/HSE3.png",
      "/assets/images/HSE4.png",
      "/assets/images/HSE5.png",
      "/assets/images/HSE6.png"
    ]
  },
  {
    id: "manpower",
    title: "Manpower Tracking ERP",
    desc: "Streamlines workforce management, tracking shifts, assignments, and personnel productivity in real-time.",
    tags: ["HTML", "CSS", "JS", "PHP", "REST APIs", "MySQL"],
    img: "/assets/images/project-manpower.png",
    github: "https://github.com/howedyy",
    live: "#",
    screenshots: [
      "/assets/images/SEC1.png",
      "/assets/images/SEC2.png",
      "/assets/images/SEC4.png",
      "/assets/images/SEC5.png",
      "/assets/images/SEC6.png",
      "/assets/images/SEC7.png",
      "/assets/images/SEC8.png",
      "/assets/images/SEC9.png",
      "/assets/images/SEC10.png"
    ]
  },
  {
    id: "news",
    title: "News App",
    desc: "A highly scalable news application delivering real-time feeds with offline caching and clean UI.",
    tags: ["Flutter", "SQLite", "REST APIs"],
    img: "/assets/images/project-news.png",
    github: "https://github.com/howedyy",
    live: "#",
    screenshots: ["/assets/images/project-news.png"]
  },
  {
    id: "event",
    title: "Event App",
    desc: "Interactive mobile interface for discovering, booking, and managing ticketed events and meetups.",
    tags: ["Flutter", "Dart", "Firebase", "Firestore", "Provider"],
    img: "/assets/images/project-event.png",
    github: "https://github.com/howedyy",
    live: "#",
    screenshots: ["/assets/images/project-event.png"]
  },
  {
    id: "edara",
    title: "Edara Hub App",
    desc: "A centralized portal application integrating multiple micro-services into a unified hub for SODIC property management.",
    tags: ["Flutter", "System Integration", "BLoC"],
    img: "/assets/images/project-edara.png",
    github: "https://github.com/howedyy",
    live: "#",
    screenshots: ["/assets/images/project-edara.png"]
  },
  {
    id: "space",
    title: "Space App",
    desc: "Educational and interactive app integrating space facts and visual timelines, designed with custom smooth animations.",
    tags: ["Flutter", "Dart", "Animations"],
    img: "/assets/images/project-space.png",
    github: "https://github.com/howedyy",
    live: "#",
    screenshots: ["/assets/images/project-space.png"]
  }
];

const Projects = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const openLightbox = (projectIndex) => {
    setCurrentProjectIndex(projectIndex);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const totalImages = projectData[currentProjectIndex].screenshots.length;
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const totalImages = projectData[currentProjectIndex].screenshots.length;
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const currentProject = projectData[currentProjectIndex];
  const totalScreenshots = currentProject.screenshots.length;

  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <section id="projects" className="projects-section scroll-reveal" style={{ background: 'transparent' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Case Studies</span>
              <h2 className="section-title">Client Success & Solutions</h2>
            </div>
            <div className="projects-grid">
              {projectData.map((project, index) => (
                <div className="project-card glass-card" key={project.id}>
                  <div className="project-img" onClick={() => openLightbox(index)}>
                    <img src={project.img} alt={project.title} className="project-screenshot" />
                    <div className="project-img-overlay">
                      <span className="view-btn">View Screenshots</span>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.desc}</p>
                    <div className="project-tags">
                      {project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
                    </div>
                    <div className="project-links">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-link">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        Source Code
                      </a>
                      <a href={project.live} className="btn btn-secondary live-link">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Visit Project
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            className="lightbox" 
            style={{ display: 'flex' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div className="lightbox-overlay"></div>
            <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
              <span className="lightbox-close" onClick={closeLightbox}>&times;</span>

              {totalScreenshots > 1 && (
                <button className="lightbox-nav prev-btn" aria-label="Previous image" onClick={prevImage}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
              )}

              <div className="lightbox-main">
                <motion.img 
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="lightbox-content" 
                  src={currentProject.screenshots[currentImageIndex]} 
                  alt={currentProject.title} 
                />
                <div className="lightbox-caption">{currentProject.title}</div>
                {totalScreenshots > 1 && (
                  <div className="lightbox-counter">
                    <span>{currentImageIndex + 1}</span> / <span>{totalScreenshots}</span>
                  </div>
                )}
              </div>

              {totalScreenshots > 1 && (
                <button className="lightbox-nav next-btn" aria-label="Next image" onClick={nextImage}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              )}

              {totalScreenshots > 1 && (
                <div className="lightbox-thumbnails">
                  {currentProject.screenshots.map((src, i) => (
                    <img 
                      key={i} 
                      src={src} 
                      className={`thumbnail ${i === currentImageIndex ? 'active' : ''}`} 
                      onClick={() => setCurrentImageIndex(i)} 
                      alt="" 
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
