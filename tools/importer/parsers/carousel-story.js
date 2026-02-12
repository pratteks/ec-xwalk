/* global WebImporter */

/**
 * Parser: carousel-story
 * Selector: .story-stack .story-stack-carousel
 * Content: Industry slides (Small Business, FirstNet, Public Sector, etc.) with icons and images
 * Model fields per slide: media_image (reference), media_imageAlt (text), content_text (richtext)
 */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll('.swiper-slide');
  const cells = [['Carousel Story']];

  slides.forEach((slide) => {
    const bgImg = slide.querySelector('.swiper-image');
    const heading = slide.querySelector('[class*="heading-sm"]');
    const description = slide.querySelector('.story-description, .wysiwyg-editor');

    // Image cell
    const imgCell = document.createElement('div');
    imgCell.append(document.createComment(' field:media_image '));
    if (bgImg) {
      const imgEl = document.createElement('img');
      imgEl.src = bgImg.src;
      imgEl.alt = bgImg.alt || '';
      imgCell.append(imgEl);
    }
    imgCell.append(document.createComment(' field:media_imageAlt '));

    // Text cell
    const textCell = document.createElement('div');
    textCell.append(document.createComment(' field:content_text '));
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

    cells.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, cells);
  element.replaceWith(block);
}
