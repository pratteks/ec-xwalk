/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroBannerParser from './parsers/hero-banner.js';
import heroFeatureParser from './parsers/hero-feature.js';
import heroPromoParser from './parsers/hero-promo.js';
import heroStoryParser from './parsers/hero-story.js';
import cardsProductParser from './parsers/cards-product.js';
import cardsPromoParser from './parsers/cards-promo.js';
import cardsValueParser from './parsers/cards-value.js';
import cardsLinksParser from './parsers/cards-links.js';
import carouselBannerParser from './parsers/carousel-banner.js';
import carouselStoryParser from './parsers/carousel-story.js';
import columnsOfferParser from './parsers/columns-offer.js';
import columnsContactParser from './parsers/columns-contact.js';

// TRANSFORMER IMPORTS
import attCleanupTransformer from './transformers/att-cleanup.js';

// PARSER REGISTRY
const parsers = {
  'hero-banner': heroBannerParser,
  'hero-feature': heroFeatureParser,
  'hero-promo': heroPromoParser,
  'hero-story': heroStoryParser,
  'cards-product': cardsProductParser,
  'cards-promo': cardsPromoParser,
  'cards-value': cardsValueParser,
  'cards-links': cardsLinksParser,
  'carousel-banner': carouselBannerParser,
  'carousel-story': carouselStoryParser,
  'columns-offer': columnsOfferParser,
  'columns-contact': columnsContactParser,
};

// TRANSFORMER REGISTRY (cleanup only; section breaks handled inline)
const transformers = [
  attCleanupTransformer,
];

// Section styles keyed by block name (kebab-case)
const SECTION_STYLES = {
  'cards-value': 'neutral',
  'carousel-banner': 'accent',
};

// PAGE TEMPLATE CONFIGURATION
// Selectors use .aem-Grid > .hero:nth-child(N) for hero variants because
// :nth-of-type counts ALL divs (all grid children are divs), not just .hero elements.
// Child positions: hero=1, multi-tile=2, flex=3, hero=4, value=5, micro=6, offer=7, story=8, hero=9, hero=10, rai=11, link=12
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'AT&T Business homepage with hero, product offerings, and promotional content',
  urls: [
    'https://www.business.att.com/',
  ],
  sections: [
    { id: 'section-1', name: 'Hero', selector: '.aem-Grid > .hero:nth-child(1)', style: null, blocks: ['hero-banner'], defaultContent: [] },
    { id: 'section-2', name: 'Product Cards Carousel', selector: '.multi-tile-cards', style: null, blocks: ['cards-product'], defaultContent: [] },
    { id: 'section-3', name: 'Promotional Flex Cards', selector: '.flex-cards', style: null, blocks: ['cards-promo'], defaultContent: [] },
    { id: 'section-4', name: 'Dynamic Defense Hero', selector: '.aem-Grid > .hero:nth-child(4)', style: null, blocks: ['hero-feature'], defaultContent: [] },
    { id: 'section-5', name: 'Value Propositions', selector: '.generic-list-value-prop', style: 'neutral', blocks: ['cards-value'], defaultContent: [] },
    { id: 'section-6', name: 'Micro Banner', selector: '.micro-banner', style: 'accent', blocks: ['carousel-banner'], defaultContent: [] },
    { id: 'section-7', name: 'Switch Offer', selector: '.offer', style: null, blocks: ['columns-offer'], defaultContent: [] },
    { id: 'section-8', name: 'Industry Solutions', selector: '.story-stack', style: null, blocks: ['carousel-story'], defaultContent: [] },
    { id: 'section-9', name: 'AT&T Guarantee Hero', selector: '.aem-Grid > .hero:nth-child(9)', style: null, blocks: ['hero-promo'], defaultContent: [] },
    { id: 'section-10', name: 'Customer Success Stories', selector: '.aem-Grid > .hero:nth-child(10)', style: null, blocks: ['hero-story'], defaultContent: [] },
    { id: 'section-11', name: 'Sales Expert CTA', selector: '.rai-form', style: null, blocks: ['columns-contact'], defaultContent: [] },
    { id: 'section-12', name: 'Looking For More', selector: '.link-farm', style: null, blocks: ['cards-links'], defaultContent: [] },
  ],
  blocks: [
    { name: 'hero-banner', instances: ['.aem-Grid > .hero:nth-child(1)'] },
    { name: 'cards-product', instances: ['.multi-tile-cards'] },
    { name: 'cards-promo', instances: ['.flex-cards'] },
    { name: 'hero-feature', instances: ['.aem-Grid > .hero:nth-child(4)'] },
    { name: 'cards-value', instances: ['.generic-list-value-prop'] },
    { name: 'carousel-banner', instances: ['.micro-banner'] },
    { name: 'columns-offer', instances: ['.offer'] },
    { name: 'carousel-story', instances: ['.story-stack'] },
    { name: 'hero-promo', instances: ['.aem-Grid > .hero:nth-child(9)'] },
    { name: 'hero-story', instances: ['.aem-Grid > .hero:nth-child(10)'] },
    { name: 'columns-contact', instances: ['.rai-form'] },
    { name: 'cards-links', instances: ['.link-farm'] },
  ],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((el) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element: el,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block (parsers replace original elements with block tables)
    const parsedBlocks = [];
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (!parser) {
        console.warn(`No parser found for block: ${block.name}`);
        return;
      }
      try {
        parser(block.element, { document, url, params });
        parsedBlocks.push(block.name);
      } catch (e) {
        console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
      }
    });

    // 4. Execute afterTransform transformers (cleanup)
    executeTransformers('afterTransform', main, payload);

    // 4.5. Flatten DOM: collect block tables, re-assemble at body level with HRs
    // The helix-importer markdown converter needs a flat structure with HRs as
    // direct children of the returned element to create section breaks.
    const allTables = Array.from(main.querySelectorAll('table'));
    const blockTables = [];
    allTables.forEach((table) => {
      const th = table.querySelector('tr:first-child th');
      if (th) blockTables.push({ table, name: th.textContent.trim() });
    });

    // Clear body and re-assemble with section breaks
    while (main.firstChild) main.removeChild(main.firstChild);

    blockTables.forEach(({ table, name }, idx) => {
      // Section-metadata for PREVIOUS block (before HR)
      if (idx > 0) {
        const prevName = blockTables[idx - 1].name;
        const prevKebab = prevName.toLowerCase().replace(/\s+/g, '-');
        const prevStyle = SECTION_STYLES[prevKebab];
        if (prevStyle) {
          const metaTable = document.createElement('table');
          const headerRow = document.createElement('tr');
          const headerCell = document.createElement('th');
          headerCell.textContent = 'Section metadata';
          headerCell.colSpan = 2;
          headerRow.append(headerCell);
          metaTable.append(headerRow);
          const dataRow = document.createElement('tr');
          const keyCell = document.createElement('td');
          keyCell.textContent = 'style';
          const valCell = document.createElement('td');
          valCell.textContent = prevStyle;
          dataRow.append(keyCell, valCell);
          metaTable.append(dataRow);
          main.appendChild(metaTable);
        }
        // HR section break
        main.appendChild(document.createElement('hr'));
      }
      main.appendChild(table);
    });

    // Section-metadata for the last block if needed
    if (blockTables.length > 0) {
      const lastKebab = blockTables[blockTables.length - 1].name.toLowerCase().replace(/\s+/g, '-');
      const lastStyle = SECTION_STYLES[lastKebab];
      if (lastStyle) {
        const metaTable = document.createElement('table');
        const headerRow = document.createElement('tr');
        const headerCell = document.createElement('th');
        headerCell.textContent = 'Section metadata';
        headerCell.colSpan = 2;
        headerRow.append(headerCell);
        metaTable.append(headerRow);
        const dataRow = document.createElement('tr');
        const keyCell = document.createElement('td');
        keyCell.textContent = 'style';
        const valCell = document.createElement('td');
        valCell.textContent = lastStyle;
        dataRow.append(keyCell, valCell);
        metaTable.append(dataRow);
        main.appendChild(metaTable);
      }
    }

    // 5. Apply WebImporter built-in rules (with safety check)
    const hr = document.createElement('hr');
    main.appendChild(hr);
    try {
      if (typeof WebImporter !== 'undefined' && WebImporter.rules) {
        WebImporter.rules.createMetadata(main, document);
        WebImporter.rules.transformBackgroundImages(main, document);
        WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      }
    } catch (e) {
      console.warn('WebImporter rules not available:', e.message);
    }

    // 6. Generate sanitized path
    let path;
    try {
      path = typeof WebImporter !== 'undefined'
        ? WebImporter.FileUtils.sanitizePath(
          new URL(params.originalURL).pathname
            .replace(/\/$/, '')
            .replace(/\.html$/, '') || '/index',
        )
        : new URL(params.originalURL).pathname
          .replace(/\/$/, '')
          .replace(/\.html$/, '') || '/index';
    } catch (e) {
      path = '/index';
    }

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
