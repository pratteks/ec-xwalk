/* global WebImporter */

/**
 * Parser: carousel-banner
 * Selector: .micro-banner
 * Content: Rotating promotional slides (30-day trial, J.D. Power award)
 * Model fields per slide: media_image (reference), media_imageAlt (text), content_text (richtext)
 */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll('.swiper-slide');
  const cells = [['Carousel Banner']];

  slides.forEach((slide) => {
    const headingSection = slide.querySelector('.heading-section');
    const bodyText = slide.querySelector('.body-text');
    const legalText = slide.querySelector('.legal-text');

    // Image cell (no images in this text-only carousel)
    const imgCell = document.createElement('div');
    imgCell.append(document.createComment(' field:media_image '));
    imgCell.append(document.createComment(' field:media_imageAlt '));

    // Text cell
    const textCell = document.createElement('div');
    textCell.append(document.createComment(' field:content_text '));

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

    cells.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, cells);
  element.replaceWith(block);
}
