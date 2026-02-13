/* eslint-disable */
import { createBlock, addFieldHint } from '../utils.js';

/**
 * Parser: cards-value
 * Selector: .generic-list-value-prop
 * Content: Value proposition items with icon, heading, description, legal, CTA
 * Model fields per item: image, imageAlt (collapsed), content_heading, content_description,
 *   content_disclaimer, content_cta (grouped in content cell)
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('.generic-list-icon-vp');
  const cells = [['Cards (Value)']];

  items.forEach((item) => {
    const icon = item.querySelector('img');
    const heading = item.querySelector('h3, h4, [class*="heading"]');
    const description = item.querySelector('.type-base, .wysiwyg-editor');
    const legal = item.querySelector('.type-legal');
    const cta = item.querySelector('a[class*="att-track"], .cta-container a, a[class*="btn"]');

    // Image cell
    const imgCell = document.createElement('div');
    if (icon) {
      const imgEl = document.createElement('img');
      imgEl.src = icon.src;
      imgEl.alt = icon.alt || '';
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
    if (description) {
      const paragraphs = [];
      description.querySelectorAll('p').forEach((p) => {
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
