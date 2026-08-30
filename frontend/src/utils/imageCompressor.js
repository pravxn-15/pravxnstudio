/**
 * Compresses and resizes image files before uploading to avoid Vercel 4.5MB payload limits.
 * @param {File} file - Original file from input
 * @param {number} maxWidth - Max width in pixels (default: 1920)
 * @param {number} maxHeight - Max height in pixels (default: 1920)
 * @param {number} quality - JPEG compression quality (0 to 1, default: 0.82)
 * @returns {Promise<File>} Compressed File object
 */
export const compressImage = (file, maxWidth = 1920, maxHeight = 1920, quality = 0.82) => {
  return new Promise((resolve) => {
    // If not an image or SVG, return as is
    if (!file || !file.type || !file.type.startsWith('image/') || file.type === 'image/svg+xml') {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio while fitting within maxWidth and maxHeight
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve(file);
            }
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '') + '.jpg', {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => resolve(file);
    };

    reader.onerror = () => resolve(file);
  });
};
