/* eslint-disable */
import { createBlock, extractBgImageUrl } from '../utils.js';

/**
 * Parser: cards-promo
 * Selector: .flex-cards
 * Content: Promotional cards with CSS background images (no img tags)
 * Model fields per card: image (reference), text (richtext)
 */
export default function parse(element, { document }) {
  const cardWrappers = element.querySelectorAll('.card-wrapper');
  const cells = [['Cards Promo']];

  cardWrappers.forEach((wrapper) => {
    const card = wrapper.querySelector('.flex-card, .card');
    if (!card) return;

    // Images are CSS backgrounds, not img tags
    let bgUrl = extractBgImageUrl(card);
    if (!bgUrl) {
      bgUrl = extractBgImageUrl(wrapper);
    }

    const eyebrow = card.querySelector('[class*="eyebrow"]');
    const heading = card.querySelector('h3');
    const body = card.querySelector('.type-base');
    const legal = card.querySelector('.type-legal');
    const ctas = card.querySelectorAll('.flexCardItemCta a, .anchor4-button-link, .cta-container a');

    // Image cell
    const imgCell = document.createElement('div');
    if (bgUrl) {
      const imgEl = document.createElement('img');
      imgEl.src = bgUrl;
      imgEl.alt = '';
      imgCell.append(imgEl);
    }

    // Text cell
    const textCell = document.createElement('div');
    if (eyebrow && eyebrow.textContent.trim()) {
      const p = document.createElement('p');
      const em = document.createElement('em');
      em.textContent = eyebrow.textContent.trim();
      p.append(em);
      textCell.append(p);
    }
    if (heading) {
      const h = document.createElement('h3');
      h.innerHTML = heading.innerHTML;
      textCell.append(h);
    }
    if (body) {
      body.querySelectorAll('p').forEach((p) => {
        if (p.textContent.trim()) {
          const newP = document.createElement('p');
          newP.innerHTML = p.innerHTML;
          textCell.append(newP);
        }
      });
    }
    if (legal && legal.textContent.trim()) {
      const p = document.createElement('p');
      const small = document.createElement('small');
      small.innerHTML = legal.innerHTML;
      p.append(small);
      textCell.append(p);
    }
    if (ctas.length > 0) {
      ctas.forEach((link) => {
        if (link.textContent.trim()) {
          const p = document.createElement('p');
          const a = document.createElement('a');
          a.href = link.href;
          const strong = document.createElement('strong');
          strong.textContent = link.textContent.trim();
          a.append(strong);
          p.append(a);
          textCell.append(p);
        }
      });
    }

    cells.push([imgCell, textCell]);
  });

  const block = createBlock(document, cells);
  element.replaceWith(block);
}
