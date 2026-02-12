/* eslint-disable */
import { createBlock } from '../utils.js';

/**
 * Parser: cards-links
 * Selector: .link-farm
 * Content: "Looking for more?" section with lists of links
 * Rows: per link item [textCell] - single column with link paragraph
 */
export default function parse(element, { document }) {
  const linkItems = element.querySelectorAll('li');
  const cells = [['Cards Links']];

  linkItems.forEach((li) => {
    const link = li.querySelector('a[href]');
    if (!link || !link.textContent.trim()) return;

    // Text cell - single column with link
    const textCell = document.createElement('div');
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent.trim();
    p.append(a);
    textCell.append(p);

    cells.push([textCell]);
  });

  const block = createBlock(document, cells);
  element.replaceWith(block);
}
