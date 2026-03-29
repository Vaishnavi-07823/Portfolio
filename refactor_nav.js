const fs = require('fs');
const path = require('path');

// Rename projects.html to labs.html first
if (fs.existsSync('projects.html')) {
  fs.renameSync('projects.html', 'labs.html');
}

// All HTML files including the newly renamed labs.html
const files = ['index.html', 'about.html', 'skills.html', 'experience.html', 'labs.html', 'certifications.html', 'contact.html'];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Update navbar layout
  const oldNav = '<li><a href="projects.html">Lab</a></li>';
  const newNav = `<li><a href="labs.html">Labs</a></li>\n        <li><a href="projects.html">Projects</a></li>`;
  
  // This check ensures it's not run twice accidentally
  if (html.includes(oldNav)) {
    html = html.replace(oldNav, newNav);
  }

  // Inject Page Transition overlay
  if (!html.includes('id="page-transition"')) {
    html = html.replace('<body>', '<body>\n  <div id="page-transition"></div>');
  }

  // Rewrite file
  fs.writeFileSync(file, html);
});

console.log('Nav and Transition overlays added successfully!');
