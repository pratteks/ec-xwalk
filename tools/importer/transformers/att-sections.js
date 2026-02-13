/* eslint-disable */

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

function findBlockTable(root, blockName) {
  const tables = root.querySelectorAll('table');
  for (const table of tables) {
    const th = table.querySelector('tr:first-child th');
    if (th && th.textContent.trim().toLowerCase() === blockName.toLowerCase()) {
      return table;
    }
  }
  return null;
}

function afterTransform(element, payload) {
  const { document } = payload;

  // After parsers run, original elements are replaced with <table> blocks.
  // Find block tables by their header text (first <th> content).
  const sections = [
    { blockName: 'Hero Banner', style: null },
    { blockName: 'Cards Product', style: null },
    { blockName: 'Cards Promo', style: null },
    { blockName: 'Hero Feature', style: null },
    { blockName: 'Cards Value', style: 'neutral' },
    { blockName: 'Carousel Banner', style: 'accent' },
    { blockName: 'Columns Offer', style: null },
    { blockName: 'Carousel Story', style: null },
    { blockName: 'Hero Promo', style: null },
    { blockName: 'Hero Story', style: null },
    { blockName: 'Columns Contact', style: null },
    { blockName: 'Cards Links', style: null },
  ];

  const main = document.querySelector('main') || document.body;
  if (!main) {
    console.warn('[att-sections] No main or body found');
    return;
  }

  const allTables = main.querySelectorAll('table');
  console.log(`[att-sections] Found ${allTables.length} tables in DOM`);
  allTables.forEach((t, i) => {
    const th = t.querySelector('tr:first-child th');
    console.log(`[att-sections]   table[${i}] th="${th ? th.textContent.trim() : 'NONE'}"`);
  });

  // Find each block table element
  const sectionElements = [];
  sections.forEach((sec) => {
    const el = findBlockTable(main, sec.blockName);
    if (el) {
      sectionElements.push({ el, style: sec.style });
    } else {
      console.warn(`[att-sections] Block table NOT found: "${sec.blockName}"`);
    }
  });
  console.log(`[att-sections] Matched ${sectionElements.length}/${sections.length} sections`);

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
