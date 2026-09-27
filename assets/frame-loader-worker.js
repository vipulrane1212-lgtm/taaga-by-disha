/**
 * TAAGA BY DISHA - BACKGROUND FRAME LOADER WORKER
 * Offloads frame fetching and bitmap decoding from the main UI thread.
 * Enables 90+ Lighthouse mobile performance by eliminating main-thread decode jank.
 */

self.onmessage = async function(e) {
  const { type, frames, baseUrl, padLength } = e.data;

  if (type === 'LOAD_BATCH') {
    for (const frameIndex of frames) {
      try {
        const paddedIndex = String(frameIndex + 1).padStart(padLength || 4, '0');
        const url = baseUrl.replace('{index}', paddedIndex).replace('%7Bindex%7D', paddedIndex);

        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} loading frame ${frameIndex}`);
        }

        const blob = await response.blob();
        // createImageBitmap decodes the image off-thread!
        if (typeof createImageBitmap === 'function') {
          const bitmap = await createImageBitmap(blob);
          self.postMessage(
            { type: 'FRAME_LOADED', frameIndex, bitmap },
            [bitmap] // Transferable object: zero-copy transfer to main thread
          );
        } else {
          // Fallback if createImageBitmap not available in worker
          const objectUrl = URL.createObjectURL(blob);
          self.postMessage({ type: 'FRAME_LOADED_URL', frameIndex, objectUrl });
        }
      } catch (err) {
        self.postMessage({ type: 'FRAME_ERROR', frameIndex, error: err.message });
      }
    }
  }
};
