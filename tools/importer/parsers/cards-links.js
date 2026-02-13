/* eslint-disable */
import { createBlock, addFieldHint } from '../utils.js';

/**
 * Parser: cards-links
 * Selector: .link-farm
 * Content: "Looking for more?" section with lists of links
 * Model fields per item: image (empty), imageAlt (collapsed), content_link
 */
export default function parse(element, { document }) {
  // Exclude .mobile-view duplicates — original site renders desktop + mobile copies
  element.querySelectorAll('.mobile-view').forEach((el) => el.remove());
  const linkItems = element.querySelectorAll('li');
  const cells = [['Cards Links']];

  linkItems.forEach((li) => {
    const link = li.querySelector('a[href]');
    if (!link || !link.textContent.trim()) return;

    // Content cell with link field hint
    const contentCell = document.createElement('div');
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent.trim();
    p.append(a);
    contentCell.append(addFieldHint(document, 'content_link', p));

    // Image cell is empty for links
    const imgCell = document.createElement('div');
    cells.push([imgCell, contentCell]);
  });

  const block = createBlock(document, cells);
  element.replaceWith(block);
}
