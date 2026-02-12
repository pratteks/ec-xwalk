/* global WebImporter */

/**
 * AT&T Business section transformer.
 * Inserts <hr> elements between content sections and adds section-metadata
 * blocks where needed (neutral, accent backgrounds).
 */

const TransformHook = {
  afterTransform: 'afterTransform',
};

function createSectionMetadata(document, style) {
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Section metadata';
  headerCell.colSpan = 2;
  headerRow.append(headerCell);
  table.append(headerRow);

  const row = document.createElement('tr');
  const keyCell = document.createElement('td');
  keyCell.textContent = 'style';
  const valueCell = document.createElement('td');
  valueCell.textContent = style;
  row.append(keyCell, valueCell);
  table.append(row);
  return table;
}

function afterTransform(element, payload) {
  const { document } = payload;

  // Section definitions matching page-templates.json
  const sections = [
    { selector: 'main .hero:first-of-type', style: null },
    { selector: '.multi-tile-cards', style: null },
    { selector: '.flex-cards', style: null },
    { selector: 'main .hero:nth-of-type(2)', style: null },
    { selector: '.generic-list-value-prop', style: 'neutral' },
    { selector: '.micro-banner', style: 'accent' },
    { selector: '.offer', style: null },
    { selector: '.story-stack', style: null },
    { selector: 'main .hero:nth-of-type(3)', style: null },
    { selector: 'main .hero:nth-of-type(4)', style: null },
    { selector: '.rai-form', style: null },
  ];

  const main = document.querySelector('main');
  if (!main) return;

  // Find each section element and insert HR + section-metadata before it
  const sectionElements = [];
  sections.forEach((sec) => {
    const el = main.querySelector(sec.selector) || document.querySelector(sec.selector);
    if (el) {
      sectionElements.push({ el, style: sec.style });
    }
  });

  // Insert HRs between sections (starting from second section)
  for (let i = 1; i < sectionElements.length; i += 1) {
    const { el } = sectionElements[i];
    const hr = document.createElement('hr');
    el.parentNode.insertBefore(hr, el);
  }

  // Add section-metadata blocks where style is needed
  sectionElements.forEach(({ el, style }) => {
    if (style) {
      const metadata = createSectionMetadata(document, style);
      // Insert section-metadata just before the next HR or at end of section
      const nextHr = el.nextElementSibling;
      if (nextHr && nextHr.tagName === 'HR') {
        el.parentNode.insertBefore(metadata, nextHr);
      } else {
        el.parentNode.insertBefore(metadata, el.nextSibling);
      }
    }
  });
}

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    afterTransform(element, payload);
  }
}
