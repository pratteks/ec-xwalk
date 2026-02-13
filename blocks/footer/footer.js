import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // strip button classes from footer links
  footer.querySelectorAll('.button').forEach((button) => {
    button.className = '';
    const buttonContainer = button.closest('.button-container');
    if (buttonContainer) {
      buttonContainer.className = '';
    }
  });

  // add accordion behavior for link category headings
  const linkCategories = footer.children[1];
  if (linkCategories) {
    linkCategories.querySelectorAll(':scope > .default-content-wrapper > ul > li > strong').forEach((strong) => {
      const li = strong.parentElement;
      const nestedUl = li.querySelector('ul');
      if (!nestedUl) return;

      const btn = document.createElement('button');
      btn.className = 'footer-accordion-toggle';
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = strong.textContent;
      strong.replaceWith(btn);

      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      });
    });
  }

  block.append(footer);
}
