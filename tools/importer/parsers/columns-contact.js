/* global WebImporter */

/**
 * Parser: columns-contact
 * Selector: .rai-form
 * Content: "Talk to an AT&T Business sales expert" heading, phone, legal
 * Columns block: NO field hinting per library spec
 */
export default function parse(element, { document }) {
  const heading = element.querySelector('h2');
  const body = element.querySelector('.multi-cta-body, .type-base');
  const legal = element.querySelector('.multi-cta-legal, .type-legal');

  // Column 1: Heading and phone info
  const col1 = document.createElement('div');
  if (heading) {
    const h = document.createElement('h2');
    h.innerHTML = heading.innerHTML;
    col1.append(h);
  }
  if (body) {
    body.querySelectorAll('p').forEach((p) => {
      if (p.textContent.trim()) {
        const newP = document.createElement('p');
        newP.innerHTML = p.innerHTML;
        col1.append(newP);
      }
    });
  }

  // Column 2: Legal text
  const col2 = document.createElement('div');
  if (legal && legal.textContent.trim()) {
    const p = document.createElement('p');
    const small = document.createElement('small');
    small.innerHTML = legal.innerHTML;
    p.append(small);
    col2.append(p);
  }

  const cells = [['Columns Contact'], [col1, col2]];
  const block = WebImporter.Blocks.createBlock(document, cells);
  element.replaceWith(block);
}
