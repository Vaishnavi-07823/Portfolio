const fs = require('fs');
const files = ['about.html', 'skills.html', 'experience.html', 'projects.html', 'certifications.html', 'contact.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<!-- Animated Background -->[\s\S]*?<canvas id="particles"><\/canvas>/, '<!-- Animated Cyber Background -->\n  <div class="bg-vignette"></div>\n  <canvas id="cyber-matrix"></canvas>');
  fs.writeFileSync(file, content);
});
console.log('Background updated globally');
