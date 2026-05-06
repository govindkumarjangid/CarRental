/**
 * Utility to generate ImageKit transformation URLs for avatars.
 * @param {string} url - Original ImageKit URL.
 * @param {number} width - Desired width.
 * @param {number} height - Desired height.
 * @returns {string} - Transformed URL.
 */
export const getImageKitUrl = (url, width = 40, height = 40) => {
  if (!url) return '';

  if (!url || url.startsWith('/') || url.startsWith('blob:') || url.startsWith('data:') || url.includes('?tr='))
    return url;

  try {
    const urlObj = new URL(url);
    const transformation = `w-${width},h-${height},c-maintain_ratio,fo-face,q-80,f-webp`;
    urlObj.searchParams.set('tr', transformation);
    return urlObj.toString();
  } catch (e) {
    return url;
  }
};
