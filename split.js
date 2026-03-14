const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace navs
const oldNav = `<div class="nav-links">
        <a href="#about" class="nav-link">About</a>
        <a href="#skills" class="nav-link">Skills</a>
        <a href="#services" class="nav-link">Services</a>
        <a href="#experience" class="nav-link">Experience</a>
        <a href="#projects" class="nav-link">Projects</a>
        <a href="#contact" class="nav-link btn-nav-contact">Hire Me</a>
      </div>`;
const newNav = `<div class="nav-links">
        <a href="index.html" class="nav-link">Home</a>
        <a href="about.html" class="nav-link">About</a>
        <a href="services.html" class="nav-link">Services</a>
        <a href="projects.html" class="nav-link">Case Studies</a>
        <a href="contact.html" class="nav-link btn-nav-contact">Hire Me</a>
      </div>`;
html = html.replace(oldNav, newNav);

const oldMobile = `<div class="mobile-menu" id="mobile-menu">
    <a href="#about" class="mobile-link">About</a>
    <a href="#skills" class="mobile-link">Skills</a>
    <a href="#services" class="mobile-link">Services</a>
    <a href="#experience" class="mobile-link">Experience</a>
    <a href="#projects" class="mobile-link">Projects</a>
    <a href="#contact" class="mobile-link">Hire Me</a>
  </div>`;
const newMobile = `<div class="mobile-menu" id="mobile-menu">
    <a href="index.html" class="mobile-link">Home</a>
    <a href="about.html" class="mobile-link">About</a>
    <a href="services.html" class="mobile-link">Services</a>
    <a href="projects.html" class="mobile-link">Case Studies</a>
    <a href="contact.html" class="mobile-link">Hire Me</a>
  </div>`;
html = html.replace(oldMobile, newMobile);

const heroActions = `<a href="#contact" class="btn btn-primary">Let's Discuss Your Project</a>
            <a href="#projects" class="btn btn-secondary">View Case Studies</a>`;
const newHeroActions = `<a href="contact.html" class="btn btn-primary">Let's Discuss Your Project</a>
            <a href="projects.html" class="btn btn-secondary">View Case Studies</a>`;
html = html.replace(heroActions, newHeroActions);

html = html.replace('<a href="#about" class="scroll-down-btn" aria-label="Scroll Down">', '<a href="about.html" class="scroll-down-btn" aria-label="Scroll Down">');
html = html.replace('<a href="#hero" class="logo-link">M.H.</a>', '<a href="index.html" class="logo-link">M.H.</a>');

const extractSection = (htmlStr, id) => {
    const regex = new RegExp(`<!-- ${id}[\\s\\S]*?</section>`, 'g');
    const match = htmlStr.match(regex);
    return match ? match[0] : '';
};

const getBase = (content) => {
    return html.replace(/<main>[\s\S]*<\/main>/, `<main>\n${content}\n  </main>`);
};
   
const hero = extractSection(html, 'Hero Section');
const about = extractSection(html, 'About Me Section');
const skills = extractSection(html, 'Skills Section');
const services = extractSection(html, 'Services Section');
const experience = extractSection(html, 'Experience Timeline');
const projects = extractSection(html, 'Projects Section');
const contact = extractSection(html, 'Contact Section');

fs.writeFileSync('index.html', getBase('    ' + hero + '\n\n    ' + services));
fs.writeFileSync('about.html', getBase('    ' + about + '\n\n    ' + skills + '\n\n    ' + experience));
fs.writeFileSync('services.html', getBase('    ' + services));
fs.writeFileSync('projects.html', getBase('    ' + projects));
fs.writeFileSync('contact.html', getBase('    ' + contact));

console.log("Split successful");
