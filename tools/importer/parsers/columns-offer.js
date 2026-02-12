/* global WebImporter */

/**
 * Parser: columns-offer
 * Selector: .offer
 * Content: Two-column: image left, content right (eyebrow, heading, checklist, CTA)
 * Columns block: NO field hinting per library spec
 */
export default function parse(element, { document }) {
  const img = element.querySelector('.imgOffer, .video-content-offer img, .zoomable img');
  const eyebrow = element.querySelector('[class*="eyebrow"]');
  const heading = element.querySelector('h2');
  const body = element.querySelector('.wysiwyg-editor, .type-base');
  const ctaContainer = element.querySelector('.cta-container');

  // Column 1: Image
  const col1 = document.createElement('div');
  if (img) {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt || '';
    col1.append(imgEl);
  }

  // Column 2: Content
  const col2 = document.createElement('div');
  if (eyebrow && eyebrow.textContent.trim()) {
    const p = document.createElement('p');
    const em = document.createElement('em');
    em.textContent = eyebrow.textContent.trim();
    p.append(em);
    col2.append(p);
  }
  if (heading) {
    const h = document.createElement('h2');
    h.innerHTML = heading.innerHTML;
    col2.append(h);
  }
  if (body) {
    // Paragraphs
    body.querySelectorAll(':scope > p').forEach((p) => {
      if (p.textContent.trim()) {
        const newP = document.createElement('p');
        newP.innerHTML = p.innerHTML;
        col2.append(newP);
      }
    });
    // Checklist
    const listItems = body.querySelectorAll('.chkmrk li');
    if (listItems.length > 0) {
      const ul = document.createElement('ul');
      listItems.forEach((li) => {
        const span = li.querySelector('span');
        if (span && span.textContent.trim()) {
          const newLi = document.createElement('li');
          newLi.textContent = span.textContent.trim();
          ul.append(newLi);
        }
      });
      col2.append(ul);
    }
  }
  if (ctaContainer) {
    ctaContainer.querySelectorAll('a').forEach((link) => {
      if (link.textContent.trim()) {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = link.href;
        const strong = document.createElement('strong');
        strong.textContent = link.textContent.trim();
        a.append(strong);
        p.append(a);
        col2.append(p);
      }
    });
  }

  const cells = [['Columns Offer'], [col1, col2]];
  const block = WebImporter.Blocks.createBlock(document, cells);
  element.replaceWith(block);
}
