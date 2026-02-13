/* eslint-disable */
import { createBlock, extractBgImageUrl, addFieldHint } from '../utils.js';

/**
 * Parser: cards-promo
 * Selector: .flex-cards
 * Content: Promotional cards with CSS background images (no img tags)
 * Model fields per card: image, imageAlt (collapsed), content_eyebrow, content_heading,
 *   content_description, content_disclaimer, content_cta (grouped in content cell)
 */
export default function parse(element, { document }) {
  const cardWrappers = element.querySelectorAll('.card-wrapper');
  const cells = [['Cards (Promo)']];

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

    // Content cell — all content_* fields grouped in one column (md2jcr groups by prefix)
    const contentCell = document.createElement('div');

    // content_eyebrow
    const eyebrowP = document.createElement('p');
    if (eyebrow && eyebrow.textContent.trim()) {
      const em = document.createElement('em');
      em.textContent = eyebrow.textContent.trim();
      eyebrowP.append(em);
    }
    contentCell.append(addFieldHint(document, 'content_eyebrow', eyebrowP));

    // content_heading
    const h = document.createElement('h3');
    if (heading) h.innerHTML = heading.innerHTML;
    contentCell.append(addFieldHint(document, 'content_heading', h));

    // content_description
    const descP = document.createElement('p');
    if (body) {
      const paragraphs = [];
      body.querySelectorAll('p').forEach((p) => {
        if (p.textContent.trim()) paragraphs.push(p.innerHTML);
      });
      if (paragraphs.length > 0) descP.innerHTML = paragraphs.join('</p><p>');
    }
    contentCell.append(addFieldHint(document, 'content_description', descP));

    // content_disclaimer
    const disclaimerP = document.createElement('p');
    if (legal && legal.textContent.trim()) {
      disclaimerP.innerHTML = legal.innerHTML;
    }
    contentCell.append(addFieldHint(document, 'content_disclaimer', disclaimerP));

    // content_cta
    const ctaP = document.createElement('p');
    if (ctas.length > 0) {
      const firstCta = Array.from(ctas).find((link) => link.textContent.trim());
      if (firstCta) {
        const a = document.createElement('a');
        a.href = firstCta.href;
        const strong = document.createElement('strong');
        strong.textContent = firstCta.textContent.trim();
        a.append(strong);
        ctaP.append(a);
      }
    }
    contentCell.append(addFieldHint(document, 'content_cta', ctaP));

    cells.push([addFieldHint(document, 'image', imgCell), contentCell]);
  });

  const block = createBlock(document, cells);
  element.replaceWith(block);
}
