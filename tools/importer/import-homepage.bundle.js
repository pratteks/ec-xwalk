var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/utils.js
  function createBlock(doc, cells) {
    const table = doc.createElement("table");
    cells.forEach((row, rowIdx) => {
      const tr = doc.createElement("tr");
      const items = Array.isArray(row) ? row : [row];
      items.forEach((cell) => {
        const td = doc.createElement(rowIdx === 0 ? "th" : "td");
        if (typeof cell === "string") {
          td.textContent = cell;
        } else if (cell) {
          td.append(cell);
        }
        tr.append(td);
      });
      table.append(tr);
    });
    return table;
  }
  function extractBgImageUrl(container) {
    const bgPanel = container.querySelector("[data-desktop]");
    if (bgPanel) {
      return bgPanel.getAttribute("data-desktop");
    }
    const styledEl = container.querySelector('[style*="background-image"]');
    if (styledEl) {
      const match = styledEl.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
      if (match) return match[1];
    }
    return null;
  }

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document }) {
    const bgUrl = extractBgImageUrl(element);
    const fallbackImg = element.querySelector(".hero-panel-image img");
    const eyebrow = element.querySelector('[class*="eyebrow"]');
    const heading = element.querySelector("h1, h2");
    const bodyText = element.querySelector(".wysiwyg-editor, .type-base");
    const ctaContainer = element.querySelector(".cta-container");
    const textContent = document.createElement("div");
    if (eyebrow && eyebrow.textContent.trim()) {
      const p = document.createElement("p");
      const em = document.createElement("em");
      em.textContent = eyebrow.textContent.trim();
      p.append(em);
      textContent.append(p);
    }
    if (heading) {
      const h = document.createElement(heading.tagName.toLowerCase());
      h.innerHTML = heading.innerHTML;
      textContent.append(h);
    }
    if (bodyText) {
      const paragraphs = bodyText.querySelectorAll("p");
      paragraphs.forEach((p) => {
        if (p.textContent.trim()) {
          const newP = document.createElement("p");
          newP.innerHTML = p.innerHTML;
          textContent.append(newP);
        }
      });
    }
    if (ctaContainer) {
      const links = ctaContainer.querySelectorAll("a");
      links.forEach((link) => {
        if (link.textContent.trim()) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.href = link.href;
          const strong = document.createElement("strong");
          strong.textContent = link.textContent.trim();
          a.append(strong);
          p.append(a);
          textContent.append(p);
        }
      });
    }
    const cells = [["Hero Banner"]];
    const imgWrapper = document.createElement("div");
    if (bgUrl) {
      const imgEl = document.createElement("img");
      imgEl.src = bgUrl;
      imgEl.alt = "";
      imgWrapper.append(imgEl);
    } else if (fallbackImg) {
      const imgEl = document.createElement("img");
      imgEl.src = fallbackImg.src;
      imgEl.alt = fallbackImg.alt || "";
      imgWrapper.append(imgEl);
    }
    cells.push([imgWrapper]);
    cells.push([textContent]);
    const block = createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-feature.js
  function parse2(element, { document }) {
    const bgUrl = extractBgImageUrl(element);
    const fallbackImg = element.querySelector(".hero-panel-image img");
    const eyebrow = element.querySelector('[class*="eyebrow"]');
    const heading = element.querySelector("h1, h2");
    const bodyText = element.querySelector(".wysiwyg-editor, .type-base");
    const legalText = element.querySelector(".type-legal");
    const ctaContainer = element.querySelector(".cta-container");
    const textContent = document.createElement("div");
    if (eyebrow && eyebrow.textContent.trim()) {
      const p = document.createElement("p");
      const em = document.createElement("em");
      em.textContent = eyebrow.textContent.trim();
      p.append(em);
      textContent.append(p);
    }
    if (heading) {
      const h = document.createElement(heading.tagName.toLowerCase());
      h.innerHTML = heading.innerHTML;
      textContent.append(h);
    }
    if (bodyText) {
      bodyText.querySelectorAll("p").forEach((p) => {
        if (p.textContent.trim()) {
          const newP = document.createElement("p");
          newP.innerHTML = p.innerHTML;
          textContent.append(newP);
        }
      });
    }
    if (legalText && legalText.textContent.trim()) {
      const p = document.createElement("p");
      const small = document.createElement("small");
      small.innerHTML = legalText.innerHTML;
      p.append(small);
      textContent.append(p);
    }
    if (ctaContainer) {
      ctaContainer.querySelectorAll("a").forEach((link) => {
        if (link.textContent.trim()) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.href = link.href;
          const strong = document.createElement("strong");
          strong.textContent = link.textContent.trim();
          a.append(strong);
          p.append(a);
          textContent.append(p);
        }
      });
    }
    const cells = [["Hero Feature"]];
    const imgWrapper = document.createElement("div");
    if (bgUrl) {
      const imgEl = document.createElement("img");
      imgEl.src = bgUrl;
      imgEl.alt = "";
      imgWrapper.append(imgEl);
    } else if (fallbackImg) {
      const imgEl = document.createElement("img");
      imgEl.src = fallbackImg.src;
      imgEl.alt = fallbackImg.alt || "";
      imgWrapper.append(imgEl);
    }
    cells.push([imgWrapper]);
    cells.push([textContent]);
    const block = createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-promo.js
  function parse3(element, { document }) {
    const bgUrl = extractBgImageUrl(element);
    const fallbackImg = element.querySelector(".hero-panel-image img");
    const heading = element.querySelector("h1, h2");
    const bodyText = element.querySelector(".wysiwyg-editor, .type-base");
    const ctaContainer = element.querySelector(".cta-container");
    const textContent = document.createElement("div");
    if (heading) {
      const h = document.createElement(heading.tagName.toLowerCase());
      h.innerHTML = heading.innerHTML;
      textContent.append(h);
    }
    if (bodyText) {
      bodyText.querySelectorAll(":scope > p").forEach((p) => {
        if (p.textContent.trim()) {
          const newP = document.createElement("p");
          newP.innerHTML = p.innerHTML;
          textContent.append(newP);
        }
      });
      const listItems = bodyText.querySelectorAll(".chkmrk li");
      if (listItems.length > 0) {
        const ul = document.createElement("ul");
        listItems.forEach((li) => {
          const spanText = li.querySelector("span");
          const content = spanText ? spanText.textContent.trim() : li.textContent.trim();
          if (content) {
            const newLi = document.createElement("li");
            newLi.textContent = content;
            ul.append(newLi);
          }
        });
        textContent.append(ul);
      }
    }
    if (ctaContainer) {
      ctaContainer.querySelectorAll("a").forEach((link) => {
        if (link.textContent.trim()) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.href = link.href;
          const strong = document.createElement("strong");
          strong.textContent = link.textContent.trim();
          a.append(strong);
          p.append(a);
          textContent.append(p);
        }
      });
    }
    const cells = [["Hero Promo"]];
    const imgWrapper = document.createElement("div");
    if (bgUrl) {
      const imgEl = document.createElement("img");
      imgEl.src = bgUrl;
      imgEl.alt = "";
      imgWrapper.append(imgEl);
    } else if (fallbackImg) {
      const imgEl = document.createElement("img");
      imgEl.src = fallbackImg.src;
      imgEl.alt = fallbackImg.alt || "";
      imgWrapper.append(imgEl);
    }
    cells.push([imgWrapper]);
    cells.push([textContent]);
    const block = createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-story.js
  function parse4(element, { document }) {
    const bgUrl = extractBgImageUrl(element);
    const fallbackImg = element.querySelector(".hero-panel-image img");
    const heading = element.querySelector("h1, h2");
    const ctaContainer = element.querySelector(".cta-container");
    const textContent = document.createElement("div");
    if (heading) {
      const h = document.createElement(heading.tagName.toLowerCase());
      h.innerHTML = heading.innerHTML;
      textContent.append(h);
    }
    if (ctaContainer) {
      ctaContainer.querySelectorAll("a").forEach((link) => {
        if (link.textContent.trim()) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.href = link.href;
          const strong = document.createElement("strong");
          strong.textContent = link.textContent.trim();
          a.append(strong);
          p.append(a);
          textContent.append(p);
        }
      });
    }
    const cells = [["Hero Story"]];
    const imgWrapper = document.createElement("div");
    if (bgUrl) {
      const imgEl = document.createElement("img");
      imgEl.src = bgUrl;
      imgEl.alt = "";
      imgWrapper.append(imgEl);
    } else if (fallbackImg) {
      const imgEl = document.createElement("img");
      imgEl.src = fallbackImg.src;
      imgEl.alt = fallbackImg.alt || "";
      imgWrapper.append(imgEl);
    }
    cells.push([imgWrapper]);
    cells.push([textContent]);
    const block = createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-product.js
  function parse5(element, { document }) {
    const cards = element.querySelectorAll(".tile-card");
    const cells = [["Cards Product"]];
    cards.forEach((card) => {
      const img = card.querySelector(".card-img img");
      const heading = card.querySelector("h3");
      const description = card.querySelector(".tileSubheading");
      const price = card.querySelector(".price-comp");
      const legal = card.querySelector(".cardlegal, .type-legal-wysiwyg-editor");
      const cta = card.querySelector(".cta-container a");
      const imgCell = document.createElement("div");
      if (img) {
        const imgEl = document.createElement("img");
        imgEl.src = img.src;
        imgEl.alt = img.alt || "";
        imgCell.append(imgEl);
      }
      const textCell = document.createElement("div");
      if (heading) {
        const h = document.createElement("h3");
        h.textContent = heading.textContent.trim();
        textCell.append(h);
      }
      if (description) {
        const p = document.createElement("p");
        p.innerHTML = description.innerHTML;
        textCell.append(p);
      }
      if (price && price.textContent.trim()) {
        const p = document.createElement("p");
        const spoken = price.querySelector(".hidden-spoken");
        if (spoken) {
          p.textContent = spoken.textContent.trim();
        } else {
          p.textContent = price.textContent.trim().replace(/\s+/g, " ");
        }
        textCell.append(p);
      }
      if (legal && legal.textContent.trim()) {
        const p = document.createElement("p");
        const small = document.createElement("small");
        small.innerHTML = legal.innerHTML;
        p.append(small);
        textCell.append(p);
      }
      if (cta && cta.textContent.trim()) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = cta.href;
        a.textContent = cta.textContent.trim();
        p.append(a);
        textCell.append(p);
      }
      cells.push([imgCell, textCell]);
    });
    const block = createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-promo.js
  function parse6(element, { document }) {
    const cardWrappers = element.querySelectorAll(".card-wrapper");
    const cells = [["Cards Promo"]];
    cardWrappers.forEach((wrapper) => {
      const card = wrapper.querySelector(".flex-card, .card");
      if (!card) return;
      let bgUrl = extractBgImageUrl(card);
      if (!bgUrl) {
        bgUrl = extractBgImageUrl(wrapper);
      }
      const eyebrow = card.querySelector('[class*="eyebrow"]');
      const heading = card.querySelector("h3");
      const body = card.querySelector(".type-base");
      const legal = card.querySelector(".type-legal");
      const ctas = card.querySelectorAll(".flexCardItemCta a, .anchor4-button-link, .cta-container a");
      const imgCell = document.createElement("div");
      if (bgUrl) {
        const imgEl = document.createElement("img");
        imgEl.src = bgUrl;
        imgEl.alt = "";
        imgCell.append(imgEl);
      }
      const textCell = document.createElement("div");
      if (eyebrow && eyebrow.textContent.trim()) {
        const p = document.createElement("p");
        const em = document.createElement("em");
        em.textContent = eyebrow.textContent.trim();
        p.append(em);
        textCell.append(p);
      }
      if (heading) {
        const h = document.createElement("h3");
        h.innerHTML = heading.innerHTML;
        textCell.append(h);
      }
      if (body) {
        body.querySelectorAll("p").forEach((p) => {
          if (p.textContent.trim()) {
            const newP = document.createElement("p");
            newP.innerHTML = p.innerHTML;
            textCell.append(newP);
          }
        });
      }
      if (legal && legal.textContent.trim()) {
        const p = document.createElement("p");
        const small = document.createElement("small");
        small.innerHTML = legal.innerHTML;
        p.append(small);
        textCell.append(p);
      }
      if (ctas.length > 0) {
        ctas.forEach((link) => {
          if (link.textContent.trim()) {
            const p = document.createElement("p");
            const a = document.createElement("a");
            a.href = link.href;
            const strong = document.createElement("strong");
            strong.textContent = link.textContent.trim();
            a.append(strong);
            p.append(a);
            textCell.append(p);
          }
        });
      }
      cells.push([imgCell, textCell]);
    });
    const block = createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-value.js
  function parse7(element, { document }) {
    const items = element.querySelectorAll(".generic-list-icon-vp");
    const cells = [["Cards Value"]];
    items.forEach((item) => {
      const icon = item.querySelector("img");
      const heading = item.querySelector('h3, h4, [class*="heading"]');
      const description = item.querySelector(".type-base, .wysiwyg-editor");
      const legal = item.querySelector(".type-legal");
      const cta = item.querySelector('a[class*="att-track"], .cta-container a, a[class*="btn"]');
      const imgCell = document.createElement("div");
      if (icon) {
        const imgEl = document.createElement("img");
        imgEl.src = icon.src;
        imgEl.alt = icon.alt || "";
        imgCell.append(imgEl);
      }
      const textCell = document.createElement("div");
      if (heading) {
        const h = document.createElement("h3");
        h.textContent = heading.textContent.trim();
        textCell.append(h);
      }
      if (description) {
        description.querySelectorAll("p").forEach((p) => {
          if (p.textContent.trim()) {
            const newP = document.createElement("p");
            newP.innerHTML = p.innerHTML;
            textCell.append(newP);
          }
        });
      }
      if (legal && legal.textContent.trim()) {
        const p = document.createElement("p");
        const small = document.createElement("small");
        small.innerHTML = legal.innerHTML;
        p.append(small);
        textCell.append(p);
      }
      if (cta && cta.textContent.trim()) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = cta.href;
        a.textContent = cta.textContent.trim();
        p.append(a);
        textCell.append(p);
      }
      cells.push([imgCell, textCell]);
    });
    const block = createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-links.js
  function parse8(element, { document }) {
    const linkItems = element.querySelectorAll("li");
    const cells = [["Cards Links"]];
    linkItems.forEach((li) => {
      const link = li.querySelector("a[href]");
      if (!link || !link.textContent.trim()) return;
      const textCell = document.createElement("div");
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.textContent.trim();
      p.append(a);
      textCell.append(p);
      cells.push([textCell]);
    });
    const block = createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-banner.js
  function parse9(element, { document }) {
    const slides = element.querySelectorAll(".swiper-slide");
    const cells = [["Carousel Banner"]];
    slides.forEach((slide) => {
      const headingSection = slide.querySelector(".heading-section");
      const bodyText = slide.querySelector(".body-text");
      const legalText = slide.querySelector(".legal-text");
      const textCell = document.createElement("div");
      if (headingSection) {
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = headingSection.textContent.trim();
        p.append(strong);
        textCell.append(p);
      }
      if (bodyText && bodyText.textContent.trim()) {
        const p = document.createElement("p");
        p.innerHTML = bodyText.innerHTML;
        textCell.append(p);
      }
      if (legalText && legalText.textContent.trim()) {
        const p = document.createElement("p");
        const small = document.createElement("small");
        small.innerHTML = legalText.innerHTML;
        p.append(small);
        textCell.append(p);
      }
      cells.push([textCell]);
    });
    const block = createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-story.js
  function parse10(element, { document }) {
    const slides = element.querySelectorAll(".swiper-slide:not(.swiper-slide-duplicate)");
    const cells = [["Carousel Story"]];
    slides.forEach((slide) => {
      const bgImg = slide.querySelector(".swiper-image");
      const heading = slide.querySelector('[class*="heading-sm"]');
      const description = slide.querySelector(".story-description");
      const imgCell = document.createElement("div");
      if (bgImg) {
        const imgEl = document.createElement("img");
        imgEl.src = bgImg.src;
        imgEl.alt = bgImg.alt || "";
        imgCell.append(imgEl);
      }
      const textCell = document.createElement("div");
      if (heading) {
        const h = document.createElement("h3");
        h.textContent = heading.textContent.trim();
        textCell.append(h);
      }
      if (description) {
        description.querySelectorAll("p").forEach((p) => {
          if (p.textContent.trim()) {
            const newP = document.createElement("p");
            newP.innerHTML = p.innerHTML;
            textCell.append(newP);
          }
        });
      }
      cells.push([imgCell, textCell]);
    });
    const block = createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-offer.js
  function parse11(element, { document }) {
    const img = element.querySelector(".imgOffer") || element.querySelector("img");
    const eyebrow = element.querySelector('[class*="eyebrow"]');
    const heading = element.querySelector("h2");
    const body = element.querySelector(".wysiwyg-editor, .type-base");
    const cta = element.querySelector(".cta-container a");
    const col1 = document.createElement("div");
    if (img) {
      const imgEl = document.createElement("img");
      imgEl.src = img.src;
      imgEl.alt = img.alt || "";
      col1.append(imgEl);
    }
    const col2 = document.createElement("div");
    if (eyebrow && eyebrow.textContent.trim()) {
      const p = document.createElement("p");
      const em = document.createElement("em");
      em.textContent = eyebrow.textContent.trim();
      p.append(em);
      col2.append(p);
    }
    if (heading) {
      const h = document.createElement("h2");
      h.innerHTML = heading.innerHTML;
      col2.append(h);
    }
    if (body) {
      body.querySelectorAll(":scope > p").forEach((p) => {
        if (p.textContent.trim()) {
          const newP = document.createElement("p");
          newP.innerHTML = p.innerHTML;
          col2.append(newP);
        }
      });
      const listItems = body.querySelectorAll(".chkmrk li");
      if (listItems.length > 0) {
        const ul = document.createElement("ul");
        listItems.forEach((li) => {
          const span = li.querySelector("span");
          const text = span ? span.textContent.trim() : li.textContent.trim();
          if (text) {
            const newLi = document.createElement("li");
            newLi.textContent = text;
            ul.append(newLi);
          }
        });
        col2.append(ul);
      }
    }
    if (cta && cta.textContent.trim()) {
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = cta.href;
      const strong = document.createElement("strong");
      strong.textContent = cta.textContent.trim();
      a.append(strong);
      p.append(a);
      col2.append(p);
    }
    const cells = [["Columns Offer"], [col1, col2]];
    const block = createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-contact.js
  function parse12(element, { document }) {
    const heading = element.querySelector("h2");
    const body = element.querySelector(".multi-cta-body, .type-base");
    const legal = element.querySelector(".multi-cta-legal, .type-legal");
    const col1 = document.createElement("div");
    if (heading) {
      const h = document.createElement("h2");
      h.innerHTML = heading.innerHTML;
      col1.append(h);
    }
    if (body) {
      body.querySelectorAll("p").forEach((p) => {
        if (p.textContent.trim()) {
          const newP = document.createElement("p");
          newP.innerHTML = p.innerHTML;
          col1.append(newP);
        }
      });
    }
    const col2 = document.createElement("div");
    if (legal && legal.textContent.trim()) {
      const p = document.createElement("p");
      const small = document.createElement("small");
      small.innerHTML = legal.innerHTML;
      p.append(small);
      col2.append(p);
    }
    const cells = [["Columns Contact"], [col1, col2]];
    const block = createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/transformers/att-cleanup.js
  var TransformHook = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function beforeTransform(element, payload) {
    const { document } = payload;
    [
      ".cookie-disclaimer-component",
      "#onetrust-banner-sdk",
      "#onetrust-consent-sdk",
      ".optanon-alert-box-wrapper",
      "#gpc-banner-container"
    ].forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => el.remove());
    });
    document.querySelectorAll("iframe").forEach((iframe) => {
      const src = (iframe.getAttribute("src") || "").toLowerCase();
      if (src.includes("doubleclick.net") || src.includes("flashtalking.com") || src.includes("company-target.com") || src.includes("rlcdn.com") || src.includes("bat.bing.com") || src.includes("inqchat") || src === "") {
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
      ".global-navigation",
      ".main-header-wrapper",
      ".segment-wrapper",
      ".subMenu-container",
      ".modal-global-navigation",
      "nav.main-navigation",
      // Search
      "#cludo-search-form",
      "#cludo-mob-search",
      ".search-mobile-view",
      ".search-tablet-view",
      ".global-nav-search-container",
      // Login
      ".login-menu-box",
      ".login-menu-dropdown",
      // Footer
      ".footer",
      ".footer-main",
      ".footer-page-css-includes",
      ".footer-header",
      ".footer-bottom-contents",
      ".footer-social-wrapper",
      ".footer-bottom-logo",
      // Cookie / consent
      ".cookie-disclaimer-component",
      "#onetrust-banner-sdk",
      "#onetrust-consent-sdk",
      "#gpc-banner-container",
      // Chat widgets
      "#nuanMessagingFrame",
      "#nuance-fab-container",
      "#inqChatStage",
      "#inqTestDiv",
      ".nuance-chat-floating-container",
      // Modals
      ".att-modal-container",
      ".modal-popup-container",
      ".video-modal-target",
      // Misc
      ".skip-to-content-link",
      ".cloudservice",
      "#db-sync"
    ];
    removeSelectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => el.remove());
    });
    document.querySelectorAll("iframe").forEach((iframe) => {
      const src = (iframe.getAttribute("src") || "").toLowerCase();
      if (src.includes("doubleclick.net") || src.includes("flashtalking.com") || src.includes("company-target.com") || src.includes("bat.bing.com") || src.includes("inqchat")) {
        iframe.remove();
      }
    });
  }
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      beforeTransform(element, payload);
    }
    if (hookName === TransformHook.afterTransform) {
      afterTransform(element, payload);
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-banner": parse,
    "hero-feature": parse2,
    "hero-promo": parse3,
    "hero-story": parse4,
    "cards-product": parse5,
    "cards-promo": parse6,
    "cards-value": parse7,
    "cards-links": parse8,
    "carousel-banner": parse9,
    "carousel-story": parse10,
    "columns-offer": parse11,
    "columns-contact": parse12
  };
  var transformers = [
    transform
  ];
  var SECTION_STYLES = {
    "cards-value": "neutral",
    "carousel-banner": "accent"
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "AT&T Business homepage with hero, product offerings, and promotional content",
    urls: [
      "https://www.business.att.com/"
    ],
    sections: [
      { id: "section-1", name: "Hero", selector: ".aem-Grid > .hero:nth-child(1)", style: null, blocks: ["hero-banner"], defaultContent: [] },
      { id: "section-2", name: "Product Cards Carousel", selector: ".multi-tile-cards", style: null, blocks: ["cards-product"], defaultContent: [] },
      { id: "section-3", name: "Promotional Flex Cards", selector: ".flex-cards", style: null, blocks: ["cards-promo"], defaultContent: [] },
      { id: "section-4", name: "Dynamic Defense Hero", selector: ".aem-Grid > .hero:nth-child(4)", style: null, blocks: ["hero-feature"], defaultContent: [] },
      { id: "section-5", name: "Value Propositions", selector: ".generic-list-value-prop", style: "neutral", blocks: ["cards-value"], defaultContent: [] },
      { id: "section-6", name: "Micro Banner", selector: ".micro-banner", style: "accent", blocks: ["carousel-banner"], defaultContent: [] },
      { id: "section-7", name: "Switch Offer", selector: ".offer", style: null, blocks: ["columns-offer"], defaultContent: [] },
      { id: "section-8", name: "Industry Solutions", selector: ".story-stack", style: null, blocks: ["carousel-story"], defaultContent: [] },
      { id: "section-9", name: "AT&T Guarantee Hero", selector: ".aem-Grid > .hero:nth-child(9)", style: null, blocks: ["hero-promo"], defaultContent: [] },
      { id: "section-10", name: "Customer Success Stories", selector: ".aem-Grid > .hero:nth-child(10)", style: null, blocks: ["hero-story"], defaultContent: [] },
      { id: "section-11", name: "Sales Expert CTA", selector: ".rai-form", style: null, blocks: ["columns-contact"], defaultContent: [] },
      { id: "section-12", name: "Looking For More", selector: ".link-farm", style: null, blocks: ["cards-links"], defaultContent: [] }
    ],
    blocks: [
      { name: "hero-banner", instances: [".aem-Grid > .hero:nth-child(1)"] },
      { name: "cards-product", instances: [".multi-tile-cards"] },
      { name: "cards-promo", instances: [".flex-cards"] },
      { name: "hero-feature", instances: [".aem-Grid > .hero:nth-child(4)"] },
      { name: "cards-value", instances: [".generic-list-value-prop"] },
      { name: "carousel-banner", instances: [".micro-banner"] },
      { name: "columns-offer", instances: [".offer"] },
      { name: "carousel-story", instances: [".story-stack"] },
      { name: "hero-promo", instances: [".aem-Grid > .hero:nth-child(9)"] },
      { name: "hero-story", instances: [".aem-Grid > .hero:nth-child(10)"] },
      { name: "columns-contact", instances: [".rai-form"] },
      { name: "cards-links", instances: [".link-farm"] }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const allTables = Array.from(main.querySelectorAll("table"));
      const blockTables = [];
      allTables.forEach((table) => {
        const th = table.querySelector("tr:first-child th");
        if (th) blockTables.push({ table, name: th.textContent.trim() });
      });
      while (main.firstChild) main.removeChild(main.firstChild);
      blockTables.forEach(({ table, name }, idx) => {
        if (idx > 0) {
          const prevName = blockTables[idx - 1].name;
          const prevKebab = prevName.toLowerCase().replace(/\s+/g, "-");
          const prevStyle = SECTION_STYLES[prevKebab];
          if (prevStyle) {
            const metaTable = document.createElement("table");
            const headerRow = document.createElement("tr");
            const headerCell = document.createElement("th");
            headerCell.textContent = "Section metadata";
            headerCell.colSpan = 2;
            headerRow.append(headerCell);
            metaTable.append(headerRow);
            const dataRow = document.createElement("tr");
            const keyCell = document.createElement("td");
            keyCell.textContent = "style";
            const valCell = document.createElement("td");
            valCell.textContent = prevStyle;
            dataRow.append(keyCell, valCell);
            metaTable.append(dataRow);
            main.appendChild(metaTable);
          }
          main.appendChild(document.createElement("hr"));
        }
        main.appendChild(table);
      });
      if (blockTables.length > 0) {
        const lastKebab = blockTables[blockTables.length - 1].name.toLowerCase().replace(/\s+/g, "-");
        const lastStyle = SECTION_STYLES[lastKebab];
        if (lastStyle) {
          const metaTable = document.createElement("table");
          const headerRow = document.createElement("tr");
          const headerCell = document.createElement("th");
          headerCell.textContent = "Section metadata";
          headerCell.colSpan = 2;
          headerRow.append(headerCell);
          metaTable.append(headerRow);
          const dataRow = document.createElement("tr");
          const keyCell = document.createElement("td");
          keyCell.textContent = "style";
          const valCell = document.createElement("td");
          valCell.textContent = lastStyle;
          dataRow.append(keyCell, valCell);
          metaTable.append(dataRow);
          main.appendChild(metaTable);
        }
      }
      const hr = document.createElement("hr");
      main.appendChild(hr);
      try {
        if (typeof WebImporter !== "undefined" && WebImporter.rules) {
          WebImporter.rules.createMetadata(main, document);
          WebImporter.rules.transformBackgroundImages(main, document);
          WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
        }
      } catch (e) {
        console.warn("WebImporter rules not available:", e.message);
      }
      let path;
      try {
        path = typeof WebImporter !== "undefined" ? WebImporter.FileUtils.sanitizePath(
          new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
        ) : new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index";
      } catch (e) {
        path = "/index";
      }
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
