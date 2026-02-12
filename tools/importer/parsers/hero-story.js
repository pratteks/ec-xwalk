/* global WebImporter */

/**
 * Parser: hero-story
 * Selector: main .hero:nth-of-type(4)
 * Content: "Success stories" heading, CTA, background image
 * Model fields: image (reference), imageAlt (text), text (richtext)
 */
export default function parse(element, { document }) {
  const bgImg = element.querySelector('.bg-hero-panel img, .bg-art img');
  const sideImg = element.querySelector('.hero-panel-image img');
  const img = bgImg || sideImg;

  const heading = element.querySelector('h1, h2');
  const ctaContainer = element.querySelector('.cta-container');

  const textContent = document.createElement('div');
  textContent.append(document.createComment(' field:text '));

  if (heading) {
    const h = document.createElement(heading.tagName.toLowerCase());
    h.innerHTML = heading.innerHTML;
    textContent.append(h);
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

  const cells = [['Hero Story']];

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
