/* global WebImporter */

/**
 * Parser: hero-feature
 * Selector: main .hero:nth-of-type(2)
 * Content: "AT&T Dynamic Defense" eyebrow, heading, description, legal, 2 CTAs, side image, dark bg
 * Model fields: image (reference), imageAlt (text), text (richtext)
 */
export default function parse(element, { document }) {
  const bgImg = element.querySelector('.bg-hero-panel img, .bg-art img');
  const sideImg = element.querySelector('.hero-panel-image img');
  const img = bgImg || sideImg;

  const eyebrow = element.querySelector('[class*="eyebrow"]');
  const heading = element.querySelector('h1, h2');
  const bodyText = element.querySelector('.wysiwyg-editor, .type-base');
  const legalText = element.querySelector('.type-legal');
  const ctaContainer = element.querySelector('.cta-container');

  const textContent = document.createElement('div');
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
    bodyText.querySelectorAll('p').forEach((p) => {
      if (p.textContent.trim()) {
        const newP = document.createElement('p');
        newP.innerHTML = p.innerHTML;
        textContent.append(newP);
      }
    });
  }
  if (legalText && legalText.textContent.trim()) {
    const p = document.createElement('p');
    const small = document.createElement('small');
    small.innerHTML = legalText.innerHTML;
    p.append(small);
    textContent.append(p);
  }
  if (ctaContainer) {
    ctaContainer.querySelectorAll('a').forEach((link) => {
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

  const cells = [['Hero Feature']];

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

  cells.push([textContent]);

  const block = WebImporter.Blocks.createBlock(document, cells);
  element.replaceWith(block);
}
