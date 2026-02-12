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
import attSectionsTransformer from './transformers/att-sections.js';

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

// TRANSFORMER REGISTRY
const transformers = [
  attCleanupTransformer,
  attSectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'AT&T Business homepage with hero, product offerings, and promotional content',
  urls: [
    'https://www.business.att.com/',
  ],
  sections: [
    { id: 'section-1', name: 'Hero', selector: 'main .hero:first-of-type', style: null, blocks: ['hero-banner'], defaultContent: [] },
    { id: 'section-2', name: 'Product Cards Carousel', selector: '.multi-tile-cards', style: null, blocks: ['cards-product'], defaultContent: [] },
    { id: 'section-3', name: 'Promotional Flex Cards', selector: '.flex-cards', style: null, blocks: ['cards-promo'], defaultContent: [] },
    { id: 'section-4', name: 'Dynamic Defense Hero', selector: 'main .hero:nth-of-type(2)', style: null, blocks: ['hero-feature'], defaultContent: [] },
    { id: 'section-5', name: 'Value Propositions', selector: '.generic-list-value-prop', style: 'neutral', blocks: ['cards-value'], defaultContent: [] },
    { id: 'section-6', name: 'Micro Banner', selector: '.micro-banner', style: 'accent', blocks: ['carousel-banner'], defaultContent: [] },
    { id: 'section-7', name: 'Switch Offer', selector: '.offer', style: null, blocks: ['columns-offer'], defaultContent: [] },
    { id: 'section-8', name: 'Industry Solutions', selector: '.story-stack', style: null, blocks: ['carousel-story'], defaultContent: [] },
    { id: 'section-9', name: 'AT&T Guarantee Hero', selector: 'main .hero:nth-of-type(3)', style: null, blocks: ['hero-promo'], defaultContent: [] },
    { id: 'section-10', name: 'Customer Success Stories', selector: 'main .hero:nth-of-type(4)', style: null, blocks: ['hero-story'], defaultContent: [] },
    { id: 'section-11', name: 'Sales Expert CTA', selector: '.rai-form', style: null, blocks: ['columns-contact'], defaultContent: [] },
    { id: 'section-12', name: 'Looking For More', selector: '.looking-for-more', style: null, blocks: ['cards-links'], defaultContent: [] },
  ],
  blocks: [
    { name: 'hero-banner', instances: ['main .hero:first-of-type'] },
    { name: 'cards-product', instances: ['.multi-tile-cards .tile-card-list'] },
    { name: 'cards-promo', instances: ['.flex-cards'] },
    { name: 'hero-feature', instances: ['main .hero:nth-of-type(2)'] },
    { name: 'cards-value', instances: ['.generic-list-value-prop .value-prop-list'] },
    { name: 'carousel-banner', instances: ['.micro-banner'] },
    { name: 'columns-offer', instances: ['.offer'] },
    { name: 'carousel-story', instances: ['.story-stack'] },
    { name: 'hero-promo', instances: ['main .hero:nth-of-type(3)'] },
    { name: 'hero-story', instances: ['main .hero:nth-of-type(4)'] },
    { name: 'columns-contact', instances: ['.rai-form'] },
    { name: 'cards-links', instances: ['.looking-for-more'] },
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

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname
        .replace(/\/$/, '')
        .replace(/\.html$/, '') || '/index',
    );

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
