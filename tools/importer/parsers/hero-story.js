/* eslint-disable */
import { createBlock, extractBgImageUrl, addFieldHint } from '../utils.js';

/**
 * Parser: hero-story
 * Selector: .aem-Grid > .hero:nth-child(10)
 * Content: Heading, CTA, background image
 * Model fields: image (reference), imageAlt (text), text (richtext)
 */
export default function parse(element, { document }) {
  // Extract background image - prefer CSS background, fallback to img tag
  const bgUrl = extractBgImageUrl(element);
  const fallbackImg = element.querySelector('.hero-panel-image img');

  const heading = element.querySelector('h1, h2');
  const ctaContainer = element.querySelector('.cta-container');

  const textContent = document.createElement('div');

  if (heading) {
    const h = document.createElement(heading.tagName.toLowerCase());
    h.innerHTML = heading.innerHTML;
    textContent.append(h);
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

  const cells = [['Hero Story']];

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
