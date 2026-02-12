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

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document }) {
    const bgImg = element.querySelector(".bg-hero-panel img, .bg-art img");
    const sideImg = element.querySelector(".hero-panel-image img");
    const img = bgImg || sideImg;
    const eyebrow = element.querySelector('[class*="eyebrow"]');
    const heading = element.querySelector("h1, h2");
    const bodyText = element.querySelector(".wysiwyg-editor, .type-base");
    const ctaContainer = element.querySelector(".cta-container");
    const textContent = document.createElement("div");
    textContent.append(document.createComment(" field:text "));
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
    if (img) {
      const imgEl = document.createElement("img");
      imgEl.src = img.src;
      imgEl.alt = img.alt || "";
      const imgWrapper = document.createElement("div");
      imgWrapper.append(document.createComment(" field:image "));
      imgWrapper.append(imgEl);
      imgWrapper.append(document.createComment(" field:imageAlt "));
      cells.push([imgWrapper]);
    }
    cells.push([textContent]);
    const block = WebImporter.Blocks.createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-feature.js
  function parse2(element, { document }) {
    const bgImg = element.querySelector(".bg-hero-panel img, .bg-art img");
    const sideImg = element.querySelector(".hero-panel-image img");
    const img = bgImg || sideImg;
    const eyebrow = element.querySelector('[class*="eyebrow"]');
    const heading = element.querySelector("h1, h2");
    const bodyText = element.querySelector(".wysiwyg-editor, .type-base");
    const legalText = element.querySelector(".type-legal");
    const ctaContainer = element.querySelector(".cta-container");
    const textContent = document.createElement("div");
    textContent.append(document.createComment(" field:text "));
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
    if (img) {
      const imgEl = document.createElement("img");
      imgEl.src = img.src;
      imgEl.alt = img.alt || "";
      const imgWrapper = document.createElement("div");
      imgWrapper.append(document.createComment(" field:image "));
      imgWrapper.append(imgEl);
      imgWrapper.append(document.createComment(" field:imageAlt "));
      cells.push([imgWrapper]);
    }
    cells.push([textContent]);
    const block = WebImporter.Blocks.createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-promo.js
  function parse3(element, { document }) {
    const bgImg = element.querySelector(".bg-hero-panel img, .bg-art img");
    const sideImg = element.querySelector(".hero-panel-image img");
    const img = bgImg || sideImg;
    const heading = element.querySelector("h1, h2");
    const bodyText = element.querySelector(".wysiwyg-editor, .type-base");
    const ctaContainer = element.querySelector(".cta-container");
    const textContent = document.createElement("div");
    textContent.append(document.createComment(" field:text "));
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
          const text = li.querySelector("span");
          if (text && text.textContent.trim()) {
            const newLi = document.createElement("li");
            newLi.textContent = text.textContent.trim();
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
    if (img) {
      const imgEl = document.createElement("img");
      imgEl.src = img.src;
      imgEl.alt = img.alt || "";
      const imgWrapper = document.createElement("div");
      imgWrapper.append(document.createComment(" field:image "));
      imgWrapper.append(imgEl);
      imgWrapper.append(document.createComment(" field:imageAlt "));
      cells.push([imgWrapper]);
    }
    cells.push([textContent]);
    const block = WebImporter.Blocks.createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-story.js
  function parse4(element, { document }) {
    const bgImg = element.querySelector(".bg-hero-panel img, .bg-art img");
    const sideImg = element.querySelector(".hero-panel-image img");
    const img = bgImg || sideImg;
    const heading = element.querySelector("h1, h2");
    const ctaContainer = element.querySelector(".cta-container");
    const textContent = document.createElement("div");
    textContent.append(document.createComment(" field:text "));
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
    if (img) {
      const imgEl = document.createElement("img");
      imgEl.src = img.src;
      imgEl.alt = img.alt || "";
      const imgWrapper = document.createElement("div");
      imgWrapper.append(document.createComment(" field:image "));
      imgWrapper.append(imgEl);
      imgWrapper.append(document.createComment(" field:imageAlt "));
      cells.push([imgWrapper]);
    }
    cells.push([textContent]);
    const block = WebImporter.Blocks.createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-product.js
  function parse5(element, { document }) {
    const cards = element.querySelectorAll(".tile-card");
    const cells = [["Cards Product"]];
    cards.forEach((card) => {
      const img = card.querySelector(".card-img img");
      const heading = card.querySelector("h3, .js-heading-section");
      const description = card.querySelector(".tileSubheading, .js-textBody-section");
      const price = card.querySelector(".price-comp");
      const legal = card.querySelector(".cardlegal, .type-legal-wysiwyg-editor");
      const cta = card.querySelector(".cta-container a");
      const imgCell = document.createElement("div");
      imgCell.append(document.createComment(" field:image "));
      if (img) {
        const imgEl = document.createElement("img");
        imgEl.src = img.src;
        imgEl.alt = img.alt || "";
        imgCell.append(imgEl);
      }
      const textCell = document.createElement("div");
      textCell.append(document.createComment(" field:text "));
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
    const block = WebImporter.Blocks.createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-promo.js
  function parse6(element, { document }) {
    const cardWrappers = element.querySelectorAll(".card-wrapper");
    const cells = [["Cards Promo"]];
    cardWrappers.forEach((wrapper) => {
      const card = wrapper.querySelector(".flex-card, .card");
      if (!card) return;
      const bgImg = card.querySelector(":scope > img");
      const eyebrow = card.querySelector('[class*="eyebrow"]');
      const heading = card.querySelector("h3");
      const body = card.querySelector(".type-base");
      const legal = card.querySelector(".type-legal");
      const cta = card.querySelector(".flexCardItemCta a, .anchor4-button-link");
      const imgCell = document.createElement("div");
      imgCell.append(document.createComment(" field:image "));
      if (bgImg) {
        const imgEl = document.createElement("img");
        imgEl.src = bgImg.src;
        imgEl.alt = bgImg.alt || "";
        imgCell.append(imgEl);
      }
      const textCell = document.createElement("div");
      textCell.append(document.createComment(" field:text "));
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
      if (cta && cta.textContent.trim()) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = cta.href;
        const strong = document.createElement("strong");
        strong.textContent = cta.textContent.trim();
        a.append(strong);
        p.append(a);
        textCell.append(p);
      }
      cells.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-value.js
  function parse7(element, { document }) {
    const items = element.querySelectorAll(".value-prop-item, .value-prop-wrapper");
    const cells = [["Cards Value"]];
    items.forEach((item) => {
      const icon = item.querySelector(".icon-img img, .value-prop-icon img, img");
      const heading = item.querySelector('h3, h4, .heading-sm, [class*="heading"]');
      const description = item.querySelector(".type-base, .wysiwyg-editor");
      const legal = item.querySelector(".type-legal");
      const cta = item.querySelector('a.att-track, .cta-container a, a[class*="btn"]');
      const imgCell = document.createElement("div");
      imgCell.append(document.createComment(" field:image "));
      if (icon) {
        const imgEl = document.createElement("img");
        imgEl.src = icon.src;
        imgEl.alt = icon.alt || "";
        imgCell.append(imgEl);
      }
      const textCell = document.createElement("div");
      textCell.append(document.createComment(" field:text "));
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
    const block = WebImporter.Blocks.createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-links.js
  function parse8(element, { document }) {
    const linkItems = element.querySelectorAll('a[class*="att-track"], .link-item, li');
    const cells = [["Cards Links"]];
    linkItems.forEach((item) => {
      const icon = item.querySelector("img");
      const link = item.tagName === "A" ? item : item.querySelector("a");
      if (!link || !link.textContent.trim()) return;
      const imgCell = document.createElement("div");
      imgCell.append(document.createComment(" field:image "));
      if (icon) {
        const imgEl = document.createElement("img");
        imgEl.src = icon.src;
        imgEl.alt = icon.alt || "";
        imgCell.append(imgEl);
      }
      const textCell = document.createElement("div");
      textCell.append(document.createComment(" field:text "));
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.textContent.trim();
      p.append(a);
      textCell.append(p);
      cells.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, cells);
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
      const imgCell = document.createElement("div");
      imgCell.append(document.createComment(" field:media_image "));
      imgCell.append(document.createComment(" field:media_imageAlt "));
      const textCell = document.createElement("div");
      textCell.append(document.createComment(" field:content_text "));
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
      cells.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-story.js
  function parse10(element, { document }) {
    const slides = element.querySelectorAll(".swiper-slide");
    const cells = [["Carousel Story"]];
    slides.forEach((slide) => {
      const bgImg = slide.querySelector(".swiper-image");
      const heading = slide.querySelector('[class*="heading-sm"]');
      const description = slide.querySelector(".story-description, .wysiwyg-editor");
      const imgCell = document.createElement("div");
      imgCell.append(document.createComment(" field:media_image "));
      if (bgImg) {
        const imgEl = document.createElement("img");
        imgEl.src = bgImg.src;
        imgEl.alt = bgImg.alt || "";
        imgCell.append(imgEl);
      }
      imgCell.append(document.createComment(" field:media_imageAlt "));
      const textCell = document.createElement("div");
      textCell.append(document.createComment(" field:content_text "));
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
    const block = WebImporter.Blocks.createBlock(document, cells);
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-offer.js
  function parse11(element, { document }) {
    const img = element.querySelector(".imgOffer, .video-content-offer img, .zoomable img");
    const eyebrow = element.querySelector('[class*="eyebrow"]');
    const heading = element.querySelector("h2");
    const body = element.querySelector(".wysiwyg-editor, .type-base");
    const ctaContainer = element.querySelector(".cta-container");
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
          if (span && span.textContent.trim()) {
            const newLi = document.createElement("li");
            newLi.textContent = span.textContent.trim();
            ul.append(newLi);
          }
        });
        col2.append(ul);
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
          col2.append(p);
        }
      });
    }
    const cells = [["Columns Offer"], [col1, col2]];
    const block = WebImporter.Blocks.createBlock(document, cells);
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
    const block = WebImporter.Blocks.createBlock(document, cells);
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

  // tools/importer/transformers/att-sections.js
  var TransformHook2 = {
    afterTransform: "afterTransform"
  };
  function createSectionMetadata(document, style) {
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    const headerCell = document.createElement("th");
    headerCell.textContent = "Section metadata";
    headerCell.colSpan = 2;
    headerRow.append(headerCell);
    table.append(headerRow);
    const row = document.createElement("tr");
    const keyCell = document.createElement("td");
    keyCell.textContent = "style";
    const valueCell = document.createElement("td");
    valueCell.textContent = style;
    row.append(keyCell, valueCell);
    table.append(row);
    return table;
  }
  function afterTransform2(element, payload) {
    const { document } = payload;
    const sections = [
      { selector: "main .hero:first-of-type", style: null },
      { selector: ".multi-tile-cards", style: null },
      { selector: ".flex-cards", style: null },
      { selector: "main .hero:nth-of-type(2)", style: null },
      { selector: ".generic-list-value-prop", style: "neutral" },
      { selector: ".micro-banner", style: "accent" },
      { selector: ".offer", style: null },
      { selector: ".story-stack", style: null },
      { selector: "main .hero:nth-of-type(3)", style: null },
      { selector: "main .hero:nth-of-type(4)", style: null },
      { selector: ".rai-form", style: null }
    ];
    const main = document.querySelector("main");
    if (!main) return;
    const sectionElements = [];
    sections.forEach((sec) => {
      const el = main.querySelector(sec.selector) || document.querySelector(sec.selector);
      if (el) {
        sectionElements.push({ el, style: sec.style });
      }
    });
    for (let i = 1; i < sectionElements.length; i += 1) {
      const { el } = sectionElements[i];
      const hr = document.createElement("hr");
      el.parentNode.insertBefore(hr, el);
    }
    sectionElements.forEach(({ el, style }) => {
      if (style) {
        const metadata = createSectionMetadata(document, style);
        const nextHr = el.nextElementSibling;
        if (nextHr && nextHr.tagName === "HR") {
          el.parentNode.insertBefore(metadata, nextHr);
        } else {
          el.parentNode.insertBefore(metadata, el.nextSibling);
        }
      }
    });
  }
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      afterTransform2(element, payload);
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
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "AT&T Business homepage with hero, product offerings, and promotional content",
    urls: [
      "https://www.business.att.com/"
    ],
    sections: [
      { id: "section-1", name: "Hero", selector: "main .hero:first-of-type", style: null, blocks: ["hero-banner"], defaultContent: [] },
      { id: "section-2", name: "Product Cards Carousel", selector: ".multi-tile-cards", style: null, blocks: ["cards-product"], defaultContent: [] },
      { id: "section-3", name: "Promotional Flex Cards", selector: ".flex-cards", style: null, blocks: ["cards-promo"], defaultContent: [] },
      { id: "section-4", name: "Dynamic Defense Hero", selector: "main .hero:nth-of-type(2)", style: null, blocks: ["hero-feature"], defaultContent: [] },
      { id: "section-5", name: "Value Propositions", selector: ".generic-list-value-prop", style: "neutral", blocks: ["cards-value"], defaultContent: [] },
      { id: "section-6", name: "Micro Banner", selector: ".micro-banner", style: "accent", blocks: ["carousel-banner"], defaultContent: [] },
      { id: "section-7", name: "Switch Offer", selector: ".offer", style: null, blocks: ["columns-offer"], defaultContent: [] },
      { id: "section-8", name: "Industry Solutions", selector: ".story-stack", style: null, blocks: ["carousel-story"], defaultContent: [] },
      { id: "section-9", name: "AT&T Guarantee Hero", selector: "main .hero:nth-of-type(3)", style: null, blocks: ["hero-promo"], defaultContent: [] },
      { id: "section-10", name: "Customer Success Stories", selector: "main .hero:nth-of-type(4)", style: null, blocks: ["hero-story"], defaultContent: [] },
      { id: "section-11", name: "Sales Expert CTA", selector: ".rai-form", style: null, blocks: ["columns-contact"], defaultContent: [] },
      { id: "section-12", name: "Looking For More", selector: ".looking-for-more", style: null, blocks: ["cards-links"], defaultContent: [] }
    ],
    blocks: [
      { name: "hero-banner", instances: ["main .hero:first-of-type"] },
      { name: "cards-product", instances: [".multi-tile-cards .tile-card-list"] },
      { name: "cards-promo", instances: [".flex-cards"] },
      { name: "hero-feature", instances: ["main .hero:nth-of-type(2)"] },
      { name: "cards-value", instances: [".generic-list-value-prop .value-prop-list"] },
      { name: "carousel-banner", instances: [".micro-banner"] },
      { name: "columns-offer", instances: [".offer"] },
      { name: "carousel-story", instances: [".story-stack"] },
      { name: "hero-promo", instances: ["main .hero:nth-of-type(3)"] },
      { name: "hero-story", instances: ["main .hero:nth-of-type(4)"] },
      { name: "columns-contact", instances: [".rai-form"] },
      { name: "cards-links", instances: [".looking-for-more"] }
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
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
