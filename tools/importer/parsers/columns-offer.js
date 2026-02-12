/* eslint-disable */
import { createBlock } from '../utils.js';

/**
 * Parser: columns-offer
 * Selector: .offer
 * Content: Two-column layout with image left, content right
 * Layout: 2-column row [col1=image, col2=eyebrow+heading+body+checklist+cta]
 */
export default function parse(element, { document }) {
  const img = element.querySelector('.imgOffer') || element.querySelector('img');
  const eyebrow = element.querySelector('[class*="eyebrow"]');
  const heading = element.querySelector('h2');
  const body = element.querySelector('.wysiwyg-editor, .type-base');
  const cta = element.querySelector('.cta-container a');

  // Column 1: Image
  const col1 = document.createElement('div');
  if (img) {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt || '';
    col1.append(imgEl);
  }

  // Column 2: Content
  const col2 = document.createElement('div');
  if (eyebrow && eyebrow.textContent.trim()) {
    const p = document.createElement('p');
    const em = document.createElement('em');
    em.textContent = eyebrow.textContent.trim();
    p.append(em);
    col2.append(p);
  }
  if (heading) {
    const h = document.createElement('h2');
    h.innerHTML = heading.innerHTML;
    col2.append(h);
  }
  if (body) {
    body.querySelectorAll(':scope > p').forEach((p) => {
      if (p.textContent.trim()) {
        const newP = document.createElement('p');
        newP.innerHTML = p.innerHTML;
        col2.append(newP);
      }
    });

    const listItems = body.querySelectorAll('.chkmrk li');
    if (listItems.length > 0) {
      const ul = document.createElement('ul');
      listItems.forEach((li) => {
        const span = li.querySelector('span');
        const text = span ? span.textContent.trim() : li.textContent.trim();
        if (text) {
          const newLi = document.createElement('li');
          newLi.textContent = text;
          ul.append(newLi);
        }
      });
      col2.append(ul);
    }
  }
  if (cta && cta.textContent.trim()) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = cta.href;
    const strong = document.createElement('strong');
    strong.textContent = cta.textContent.trim();
    a.append(strong);
    p.append(a);
    col2.append(p);
  }

  const cells = [['Columns Offer'], [col1, col2]];
  const block = createBlock(document, cells);
  element.replaceWith(block);
}
