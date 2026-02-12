/* global WebImporter */

/**
 * Parser: cards-promo
 * Selector: .flex-cards .flex-card, .flex-cards .flex-card-full
 * Content: Promotional cards with bg images (iPhone 17 Pro, Device Protection, Business Fiber)
 * Model fields per card: image (reference), text (richtext)
 */
export default function parse(element, { document }) {
  const cardWrappers = element.querySelectorAll('.card-wrapper');
  const cells = [['Cards Promo']];

  cardWrappers.forEach((wrapper) => {
    const card = wrapper.querySelector('.flex-card, .card');
    if (!card) return;

    const bgImg = card.querySelector(':scope > img');
    const eyebrow = card.querySelector('[class*="eyebrow"]');
    const heading = card.querySelector('h3');
    const body = card.querySelector('.type-base');
    const legal = card.querySelector('.type-legal');
    const cta = card.querySelector('.flexCardItemCta a, .anchor4-button-link');

    // Image cell
    const imgCell = document.createElement('div');
    imgCell.append(document.createComment(' field:image '));
    if (bgImg) {
      const imgEl = document.createElement('img');
      imgEl.src = bgImg.src;
      imgEl.alt = bgImg.alt || '';
      imgCell.append(imgEl);
    }

    // Text cell
    const textCell = document.createElement('div');
    textCell.append(document.createComment(' field:text '));
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
    if (cta && cta.textContent.trim()) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = cta.href;
      const strong = document.createElement('strong');
      strong.textContent = cta.textContent.trim();
      a.append(strong);
      p.append(a);
      textCell.append(p);
    }

    cells.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, cells);
  element.replaceWith(block);
}
