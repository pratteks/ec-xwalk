/* global WebImporter */

/**
 * Parser: hero-banner
 * Selector: main .hero:first-of-type
 * Content: Eyebrow "AT&T Business", heading "Give your team an edge", paragraph, background image
 * Model fields: image (reference), imageAlt (text), text (richtext)
 */
export default function parse(element, { document }) {
  // Extract background image
  const bgImg = element.querySelector('.bg-hero-panel img, .bg-art img');
  const sideImg = element.querySelector('.hero-panel-image img');
  const img = bgImg || sideImg;

  // Extract text content
  const eyebrow = element.querySelector('[class*="eyebrow"]');
  const heading = element.querySelector('h1, h2');
  const bodyText = element.querySelector('.wysiwyg-editor, .type-base');
  const ctaContainer = element.querySelector('.cta-container');

  // Build richtext content
  const textContent = document.createElement('div');
  // <!-- field:text -->
  textContent.append(document.createComment(' field:text '));
  if (eyebrow && eyebrow.textContent.trim()) {
    const p = document.createElement('p');
    const em = document.createElement('em');
    em.textContent = eyebrow.textContent.trim();
    p.append(em);
    textContent.append(p);
  }
  if (heading) {
    const h = document.createElement(heading.tagName.toLowerCase());
    h.innerHTML = heading.innerHTML;
    textContent.append(h);
  }
  if (bodyText) {
    const paragraphs = bodyText.querySelectorAll('p');
    paragraphs.forEach((p) => {
      if (p.textContent.trim()) {
        const newP = document.createElement('p');
        newP.innerHTML = p.innerHTML;
        textContent.append(newP);
      }
    });
  }
  if (ctaContainer) {
    const links = ctaContainer.querySelectorAll('a');
    links.forEach((link) => {
      if (link.textContent.trim()) {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = link.href;
        const strong = document.createElement('strong');
        strong.textContent = link.textContent.trim();
        a.append(strong);
        p.append(a);
        textContent.append(p);
      }
    });
  }

  // Build block cells
  const cells = [['Hero Banner']];

  // Row 1: image
  if (img) {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt || '';
    const imgWrapper = document.createElement('div');
    imgWrapper.append(document.createComment(' field:image '));
    imgWrapper.append(imgEl);
    imgWrapper.append(document.createComment(' field:imageAlt '));
    cells.push([imgWrapper]);
  }

  // Row 2: text
  cells.push([textContent]);

  const block = WebImporter.Blocks.createBlock(document, cells);
  element.replaceWith(block);
}
