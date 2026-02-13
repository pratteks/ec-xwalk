/* eslint-disable */
import { createBlock, extractBgImageUrl, addFieldHint } from '../utils.js';

/**
 * Parser: hero-feature
 * Selector: .aem-Grid > .hero:nth-child(4)
 * Content: Eyebrow, heading, body text, legal, 2 CTAs, background image
 * Model fields: image (reference), imageAlt (text), text (richtext)
 */
export default function parse(element, { document }) {
  // Extract background image - prefer CSS background, fallback to img tag
  const bgUrl = extractBgImageUrl(element);
  const fallbackImg = element.querySelector('.hero-panel-image img');

  const eyebrow = element.querySelector('[class*="eyebrow"]');
  const heading = element.querySelector('h1, h2');
  const bodyText = element.querySelector('.wysiwyg-editor, .type-base');
  const legalText = element.querySelector('.type-legal');
  const ctaContainer = element.querySelector('.cta-container');

  const textContent = document.createElement('div');

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

  const cells = [['Hero (Feature)']];

  // Row 1: image
  const imgWrapper = document.createElement('div');
  if (bgUrl) {
    const imgEl = document.createElement('img');
    imgEl.src = bgUrl;
    imgEl.alt = '';
    imgWrapper.append(imgEl);
  } else if (fallbackImg) {
    const imgEl = document.createElement('img');
    imgEl.src = fallbackImg.src;
    imgEl.alt = fallbackImg.alt || '';
    imgWrapper.append(imgEl);
  }
  cells.push([addFieldHint(document, 'image', imgWrapper)]);

  // Row 2: text
  cells.push([addFieldHint(document, 'text', textContent)]);

  const block = createBlock(document, cells);
  element.replaceWith(block);
}
