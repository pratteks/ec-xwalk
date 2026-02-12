/* global WebImporter */

/**
 * Parser: hero-promo
 * Selector: main .hero:nth-of-type(3)
 * Content: "AT&T Guarantee" heading, description with checklist, 2 CTAs, dark bg
 * Model fields: image (reference), imageAlt (text), text (richtext)
 */
export default function parse(element, { document }) {
  const bgImg = element.querySelector('.bg-hero-panel img, .bg-art img');
  const sideImg = element.querySelector('.hero-panel-image img');
  const img = bgImg || sideImg;

  const heading = element.querySelector('h1, h2');
  const bodyText = element.querySelector('.wysiwyg-editor, .type-base');
  const ctaContainer = element.querySelector('.cta-container');

  const textContent = document.createElement('div');
  textContent.append(document.createComment(' field:text '));

  if (heading) {
    const h = document.createElement(heading.tagName.toLowerCase());
    h.innerHTML = heading.innerHTML;
    textContent.append(h);
  }
  if (bodyText) {
    // Extract paragraph text
    bodyText.querySelectorAll(':scope > p').forEach((p) => {
      if (p.textContent.trim()) {
        const newP = document.createElement('p');
        newP.innerHTML = p.innerHTML;
        textContent.append(newP);
      }
    });
    // Extract checklist items
    const listItems = bodyText.querySelectorAll('.chkmrk li');
    if (listItems.length > 0) {
      const ul = document.createElement('ul');
      listItems.forEach((li) => {
        const text = li.querySelector('span');
        if (text && text.textContent.trim()) {
          const newLi = document.createElement('li');
          newLi.textContent = text.textContent.trim();
          ul.append(newLi);
        }
      });
      textContent.append(ul);
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
        textContent.append(p);
      }
    });
  }

  const cells = [['Hero Promo']];

  if (img) {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt || '';
    const imgWrapper = document.createElement('div');
    imgWrapper.append(document.createComment(' field:image '));
    imgWrapper.append(imgEl);
    imgWrapper.append(document.createComment(' field:imageAlt '));
    cells.push([imgWrapper]);
  }

  cells.push([textContent]);

  const block = WebImporter.Blocks.createBlock(document, cells);
  element.replaceWith(block);
}
