/* global WebImporter */

/**
 * Parser: cards-links
 * Selector: .looking-for-more
 * Content: "Looking for more?" heading with grid of icon-based category links
 * Model fields per card: image (reference), text (richtext)
 */
export default function parse(element, { document }) {
  const linkItems = element.querySelectorAll('a[class*="att-track"], .link-item, li');
  const cells = [['Cards Links']];

  linkItems.forEach((item) => {
    const icon = item.querySelector('img');
    const link = item.tagName === 'A' ? item : item.querySelector('a');
    if (!link || !link.textContent.trim()) return;

    // Image cell
    const imgCell = document.createElement('div');
    imgCell.append(document.createComment(' field:image '));
    if (icon) {
      const imgEl = document.createElement('img');
      imgEl.src = icon.src;
      imgEl.alt = icon.alt || '';
      imgCell.append(imgEl);
    }

    // Text cell
    const textCell = document.createElement('div');
    textCell.append(document.createComment(' field:text '));
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent.trim();
    p.append(a);
    textCell.append(p);

    cells.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, cells);
  element.replaceWith(block);
}
