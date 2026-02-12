/* eslint-disable */
import { createBlock } from '../utils.js';

/**
 * Parser: carousel-banner
 * Selector: .micro-banner
 * Content: Rotating promotional slides with heading, body, and legal text
 * Rows: per slide [textCell] - single column with heading+body+legal
 */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll('.swiper-slide');
  const cells = [['Carousel Banner']];

  slides.forEach((slide) => {
    const headingSection = slide.querySelector('.heading-section');
    const bodyText = slide.querySelector('.body-text');
    const legalText = slide.querySelector('.legal-text');

    // Text cell
    const textCell = document.createElement('div');

    if (headingSection) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = headingSection.textContent.trim();
      p.append(strong);
      textCell.append(p);
    }
    if (bodyText && bodyText.textContent.trim()) {
      const p = document.createElement('p');
      p.innerHTML = bodyText.innerHTML;
      textCell.append(p);
    }
    if (legalText && legalText.textContent.trim()) {
      const p = document.createElement('p');
      const small = document.createElement('small');
      small.innerHTML = legalText.innerHTML;
      p.append(small);
      textCell.append(p);
    }

    cells.push([textCell]);
  });

  const block = createBlock(document, cells);
  element.replaceWith(block);
}
