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
  const cells = [['Cards Value']];

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

    // Content cell with individual field hints
    const contentCell = document.createElement('div');
    if (heading) {
      const h = document.createElement('h3');
      h.textContent = heading.textContent.trim();
      contentCell.append(addFieldHint(document, 'content_heading', h));
    }
    if (description) {
      const descDiv = document.createElement('div');
      description.querySelectorAll('p').forEach((p) => {
        if (p.textContent.trim()) {
          const newP = document.createElement('p');
          newP.innerHTML = p.innerHTML;
          descDiv.append(newP);
        }
      });
      if (descDiv.childNodes.length > 0) {
        contentCell.append(addFieldHint(document, 'content_description', descDiv));
      }
    }
    if (legal && legal.textContent.trim()) {
      const p = document.createElement('p');
      const small = document.createElement('small');
      small.innerHTML = legal.innerHTML;
      p.append(small);
      contentCell.append(addFieldHint(document, 'content_disclaimer', p));
    }
    if (cta && cta.textContent.trim()) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      p.append(a);
      contentCell.append(addFieldHint(document, 'content_cta', p));
    }

    cells.push([addFieldHint(document, 'image', imgCell), contentCell]);
  });

  const block = createBlock(document, cells);
  element.replaceWith(block);
}
