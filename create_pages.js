const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const headMatch = indexHtml.match(/([\s\S]*?)<!-- ===== NAVBAR ===== -->/);
const header = headMatch[1];

const navMatch = indexHtml.match(/(<!-- ===== NAVBAR ===== -->[\s\S]*?<!-- ===== HERO ===== -->)/);
let nav = navMatch[1];

// Update nav links to point to actual pages
nav = nav.replace(/href="#about"/g, 'href="about.html"');
nav = nav.replace(/href="#skills"/g, 'href="skills.html"');
nav = nav.replace(/href="#experience"/g, 'href="experience.html"');
nav = nav.replace(/href="#projects"/g, 'href="projects.html"');
nav = nav.replace(/href="#certifications"/g, 'href="certifications.html"');
nav = nav.replace(/href="#contact"/g, 'href="contact.html"');
nav = nav.replace(/href="#hero"/g, 'href="index.html"');

const footerMatch = indexHtml.match(/(<!-- ===== FOOTER ===== -->[\s\S]*?<\/html>)/);
const footer = footerMatch[1];

function extractSection(id, html) {
    const regex = new RegExp(`<!-- ===== ${id.toUpperCase()} ===== -->[\\s\\S]*?<section id="${id}"[^>]*>([\\s\\S]*?)</section>`);
    const match = html.match(regex);
    if (!match) return '';
    return `<section id="${id}" class="section">\n${match[1]}\n</section>`;
}

const buildPage = (sectionHtml) => `${header}\n${nav}\n${sectionHtml}\n${footer}`;

const pages = ['about', 'skills', 'experience', 'projects', 'certifications', 'contact'];

pages.forEach(page => {
    let sectionContent = extractSection(page, indexHtml);
    // adjust scrolling for separate page
    sectionContent = sectionContent.replace('padding-top: var(--nav-height);', ''); 
    fs.writeFileSync(`${page}.html`, buildPage(sectionContent));
});

console.log('Pages generated successfully!');
