/**
 * Optimizes image URLs by adding ImageKit transformation parameters.
 * @param {string} url - The original image URL.
 * @param {object} options - Optimization options.
 * @param {number} options.width - The desired width.
 * @param {number} options.height - The desired height.
 * @param {number} options.quality - Quality (1-100).
 * @param {string} options.format - Output format (e.g., 'webp').
 * @returns {string} - The optimized image URL.
 */
export const optimizeImage = (url, { width, height, quality = 'auto', format = 'webp' } = {}) => {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);

    // Check if it's already optimized or has parameters
    if (urlObj.searchParams.has('tr'))
        return url;

    const tr = [];
    if (width) tr.push(`w-${width}`);
    if (height) tr.push(`h-${height}`);
    if (quality) tr.push(`q-${quality}`);
    if (format) tr.push(`f-${format}`);

    if (tr.length > 0) {
      urlObj.searchParams.set('tr', tr.join(','));
    }

    return urlObj.toString();
  } catch (e) {
    // If URL is invalid or relative, return as is
    return url;
  }
};
