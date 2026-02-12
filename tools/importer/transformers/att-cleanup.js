/* global WebImporter */

/**
 * AT&T Business cleanup transformer.
 * Removes non-authorable chrome (header, footer, navigation, cookie banners,
 * chat widgets, tracking pixels, modals) so the importer only processes
 * actual page content.
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

function beforeTransform(element, payload) {
  const { document } = payload;

  // Cookie / consent banners
  [
    '.cookie-disclaimer-component',
    '#onetrust-banner-sdk',
    '#onetrust-consent-sdk',
    '.optanon-alert-box-wrapper',
    '#gpc-banner-container',
  ].forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => el.remove());
  });

  // Tracking iframes and pixels
  document.querySelectorAll('iframe').forEach((iframe) => {
    const src = (iframe.getAttribute('src') || '').toLowerCase();
    if (
      src.includes('doubleclick.net')
      || src.includes('flashtalking.com')
      || src.includes('company-target.com')
      || src.includes('rlcdn.com')
      || src.includes('bat.bing.com')
      || src.includes('inqchat')
      || src === ''
    ) {
      iframe.remove();
    }
  });

  document.querySelectorAll('img[id^="batBeacon"], img[id^="db_lr_pixel"], div[id^="batBeacon"]').forEach((el) => el.remove());
  document.querySelectorAll('input[type="hidden"]').forEach((el) => el.remove());
}

function afterTransform(element, payload) {
  const { document } = payload;

  const removeSelectors = [
    // Header / navigation
    '.global-navigation',
    '.main-header-wrapper',
    '.segment-wrapper',
    '.subMenu-container',
    '.modal-global-navigation',
    'nav.main-navigation',
    // Search
    '#cludo-search-form',
    '#cludo-mob-search',
    '.search-mobile-view',
    '.search-tablet-view',
    '.global-nav-search-container',
    // Login
    '.login-menu-box',
    '.login-menu-dropdown',
    // Footer
    '.footer',
    '.footer-main',
    '.footer-page-css-includes',
    '.footer-header',
    '.footer-bottom-contents',
    '.footer-social-wrapper',
    '.footer-bottom-logo',
    // Cookie / consent
    '.cookie-disclaimer-component',
    '#onetrust-banner-sdk',
    '#onetrust-consent-sdk',
    '#gpc-banner-container',
    // Chat widgets
    '#nuanMessagingFrame',
    '#nuance-fab-container',
    '#inqChatStage',
    '#inqTestDiv',
    '.nuance-chat-floating-container',
    // Modals
    '.att-modal-container',
    '.modal-popup-container',
    '.video-modal-target',
    // Misc
    '.skip-to-content-link',
    '.cloudservice',
    '#db-sync',
  ];

  removeSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => el.remove());
  });

  // Remove remaining tracking iframes
  document.querySelectorAll('iframe').forEach((iframe) => {
    const src = (iframe.getAttribute('src') || '').toLowerCase();
    if (
      src.includes('doubleclick.net')
      || src.includes('flashtalking.com')
      || src.includes('company-target.com')
      || src.includes('bat.bing.com')
      || src.includes('inqchat')
    ) {
      iframe.remove();
    }
  });
}

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    beforeTransform(element, payload);
  }
  if (hookName === TransformHook.afterTransform) {
    afterTransform(element, payload);
  }
}
