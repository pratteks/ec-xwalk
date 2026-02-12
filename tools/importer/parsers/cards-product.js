/* global WebImporter */

/**
 * Parser: cards-product
 * Selector: .multi-tile-cards .tile-card-list
 * Content: 6 product tiles (Mobile, Internet, Voice, Security, Network, Specialty)
 * Model fields per card: image (reference), text (richtext)
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.tile-card');
  const cells = [['Cards Product']];

  cards.forEach((card) => {
    const img = card.querySelector('.card-img img');
    const heading = card.querySelector('h3, .js-heading-section');
    const description = card.querySelector('.tileSubheading, .js-textBody-section');
    const price = card.querySelector('.price-comp');
    const legal = card.querySelector('.cardlegal, .type-legal-wysiwyg-editor');
    const cta = card.querySelector('.cta-container a');

    // Image cell
    const imgCell = document.createElement('div');
    imgCell.append(document.createComment(' field:image '));
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      imgCell.append(imgEl);
    }

    // Text cell
    const textCell = document.createElement('div');
    textCell.append(document.createComment(' field:text '));
    if (heading) {
      const h = document.createElement('h3');
      h.textContent = heading.textContent.trim();
      textCell.append(h);
    }
    if (description) {
      const p = document.createElement('p');
      p.innerHTML = description.innerHTML;
      textCell.append(p);
    }
    if (price && price.textContent.trim()) {
      const p = document.createElement('p');
      const spoken = price.querySelector('.hidden-spoken');
      if (spoken) {
        p.textContent = spoken.textContent.trim();
      } else {
        p.textContent = price.textContent.trim().replace(/\s+/g, ' ');
      }
      textCell.append(p);
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

  const block = WebImporter.Blocks.createBlock(document, cells);
  element.replaceWith(block);
}
