/* eslint-disable */
import { createBlock, addFieldHint } from '../utils.js';

/**
 * Parser: cards-product
 * Selector: .multi-tile-cards
 * Content: 6 product tiles (Mobile, Internet, Voice, Security, Network, Specialty)
 * Model fields per card: image, imageAlt (implicit), content_heading, content_description,
 *   content_pricing, content_disclaimer, content_cta (grouped in content cell)
 *
 * IMPORTANT: All field hints must always be emitted, even when the source
 * element is missing, so that every model field aligns to a column.
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.tile-card');
  const cells = [['Cards (Product)']];

  cards.forEach((card) => {
    const img = card.querySelector('.card-img img');
    const heading = card.querySelector('h3');
    const description = card.querySelector('.tileSubheading');
    const price = card.querySelector('.price-comp');
    const legal = card.querySelector('.cardlegal, .type-legal-wysiwyg-editor');
    const cta = card.querySelector('.cta-container a');

    // Image cell
    const imgCell = document.createElement('div');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      imgCell.append(imgEl);
    }

    // Content cell — all content_* fields grouped in one column (md2jcr groups by prefix)
    const contentCell = document.createElement('div');

    // content_heading
    const h = document.createElement('h3');
    if (heading) h.textContent = heading.textContent.trim();
    contentCell.append(addFieldHint(document, 'content_heading', h));

    // content_description
    const descP = document.createElement('p');
    if (description) descP.innerHTML = description.innerHTML;
    contentCell.append(addFieldHint(document, 'content_description', descP));

    // content_pricing
    const priceP = document.createElement('p');
    if (price && price.textContent.trim()) {
      const spoken = price.querySelector('.hidden-spoken');
      if (spoken) {
        priceP.textContent = spoken.textContent.trim();
      } else {
        priceP.textContent = price.textContent.trim().replace(/\s+/g, ' ');
      }
    }
    contentCell.append(addFieldHint(document, 'content_pricing', priceP));

    // content_disclaimer
    const disclaimerP = document.createElement('p');
    if (legal && legal.textContent.trim()) {
      disclaimerP.innerHTML = legal.innerHTML;
    }
    contentCell.append(addFieldHint(document, 'content_disclaimer', disclaimerP));

    // content_cta
    const ctaP = document.createElement('p');
    if (cta && cta.textContent.trim()) {
      const a = document.createElement('a');
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      ctaP.append(a);
    }
    contentCell.append(addFieldHint(document, 'content_cta', ctaP));

    cells.push([addFieldHint(document, 'image', imgCell), contentCell]);
  });

  const block = createBlock(document, cells);
  element.replaceWith(block);
}
