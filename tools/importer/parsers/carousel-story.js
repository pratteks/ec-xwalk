/* eslint-disable */
import { createBlock, addFieldHint } from '../utils.js';

/**
 * Parser: carousel-story
 * Selector: .story-stack
 * Content: Industry slides with background images, headings, and descriptions
 * Rows: per slide [imgCell, textCell]
 */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)');
  const cells = [['Carousel (Story)']];

  slides.forEach((slide) => {
    const bgImg = slide.querySelector('.swiper-image');
    const heading = slide.querySelector('[class*="heading-sm"]');
    const description = slide.querySelector('.story-description');

    // Image cell
    const imgCell = document.createElement('div');
    if (bgImg) {
      const imgEl = document.createElement('img');
      imgEl.src = bgImg.src;
      imgEl.alt = bgImg.alt || '';
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

    cells.push([addFieldHint(document, 'media_image', imgCell), addFieldHint(document, 'content_text', textCell)]);
  });

  const block = createBlock(document, cells);
  element.replaceWith(block);
}
