/* eslint-disable */
import { createBlock } from '../utils.js';

/**
 * Parser: cards-value
 * Selector: .generic-list-value-prop
 * Content: Value proposition items with icon, heading, description, legal, CTA
 * Rows: per item [imgCell, textCell]
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

    // Text cell
    const textCell = document.createElement('div');
    if (heading) {
      const h = document.createElement('h3');
      h.textContent = heading.textContent.trim();
      textCell.append(h);
    }
    if (description) {
      description.querySelectorAll('p').forEach((p) => {
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
    if (cta && cta.textContent.trim()) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      p.append(a);
      textCell.append(p);
    }

    cells.push([imgCell, textCell]);
  });

  const block = createBlock(document, cells);
  element.replaceWith(block);
}
