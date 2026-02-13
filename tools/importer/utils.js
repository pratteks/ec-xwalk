/**
 * Shared utility: creates a block table element from cells array.
 * Replaces dependency on WebImporter.Blocks.createBlock.
 *
 * @param {Document} doc - The document to create elements in
 * @param {Array} cells - Array of rows; cells[0] = [blockName], cells[1..n] = [cell1, cell2, ...]
 * @returns {HTMLTableElement} The block table element
 */
export function createBlock(doc, cells) {
  const table = doc.createElement('table');
  cells.forEach((row, rowIdx) => {
    const tr = doc.createElement('tr');
    const items = Array.isArray(row) ? row : [row];
    items.forEach((cell) => {
      const td = doc.createElement(rowIdx === 0 ? 'th' : 'td');
      if (typeof cell === 'string') {
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

/**
 * Create a document fragment with a field hint comment before content.
 * Used for xwalk Universal Editor field binding.
 *
 * @param {Document} doc - The document to create elements in
 * @param {string} fieldName - The model field name (e.g., 'image', 'text')
 * @param {Node} content - The content node to place after the hint
 * @returns {DocumentFragment} Fragment with hint comment + content
 */
export function addFieldHint(doc, fieldName, content) {
  const frag = doc.createDocumentFragment();
  frag.appendChild(doc.createComment(` field:${fieldName} `));
  if (content) {
    frag.appendChild(content);
  }
  return frag;
}

/**
 * Extract background image URL from an element's data attributes or inline style.
 * AT&T site uses data-desktop/data-tablet/data-mobile attributes and inline background-image.
 *
 * @param {Element} container - The element to search within
 * @returns {string|null} The image URL or null
 */
export function extractBgImageUrl(container) {
  // Try data-desktop attribute first
  const bgPanel = container.querySelector('[data-desktop]');
  if (bgPanel) {
    return bgPanel.getAttribute('data-desktop');
  }
  // Try inline background-image style
  const styledEl = container.querySelector('[style*="background-image"]');
  if (styledEl) {
    const match = styledEl.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
    if (match) return match[1];
  }
  return null;
}
