import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import sharp from 'sharp';
import { Locator } from '@playwright/test';

/**
 * Compare screenshot of a given locator with an existing image
 * @param element - Playwright Locator to take screenshot from
 * @param existingPath - Path to the existing screenshot for comparison
 * @param options - Optional settings:
 *   - tempPath: path to store temporary screenshot (default: 'temp_screenshot/temp.png')
 *   - diffPath: path to store diff image (default: 'diff.png')
 *   - threshold: pixelmatch threshold (default: 0.1)
 *   - resizeExisting: whether to resize existing screenshot to match current screenshot (default: true)
 */
export async function compareScreenshot(
  element: Locator,
  existingPath: string,
  options?: { tempPath?: string; diffPath?: string; threshold?: number; resizeExisting?: boolean }
): Promise<number> {
  const tempPath = options?.tempPath || 'temp_screenshot/temp.png';
  const diffPath = options?.diffPath || 'diff.png';
  const threshold = options?.threshold ?? 0.1;
  const resizeExisting = options?.resizeExisting ?? true;

  // Ensure temp folder exists
  const tempDir = tempPath.substring(0, tempPath.lastIndexOf('/'));
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  // Fix size & scroll
  await element.evaluate((el: HTMLElement) => {
    el.style.width = '800px';
    el.style.height = '600px';
    el.style.overflow = 'hidden';
  });
  await element.scrollIntoViewIfNeeded();

  // Take current screenshot
  const currentScreenshot = await element.screenshot({ path: tempPath });

  //Store the screenshot
  const storeScreenshot = await element.screenshot({ path : existingPath}); 

  // Read existing screenshot
  let existingScreenshot = fs.readFileSync(existingPath);

  // Ensure same dimensions if resizing is enabled
  let img1 = PNG.sync.read(currentScreenshot);
  let img2 = PNG.sync.read(existingScreenshot);

  if (resizeExisting && (img1.width !== img2.width || img1.height !== img2.height)) {
    console.warn(`⚠️ Resizing existing screenshot from ${img2.width}x${img2.height} to ${img1.width}x${img1.height}`);
    const resized = await sharp(existingScreenshot).resize(img1.width, img1.height).toBuffer();
    img2 = PNG.sync.read(resized);
  }

  // Compare
  const diff = new PNG({ width: img1.width, height: img1.height });
  const diffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold });

  if (diffPixels > 0) {
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    console.log(`❌ Screenshots differ by ${diffPixels} pixels`);
  } else {
    console.log('✅ Screenshots match visually!');
  }

  // Cleanup
  fs.unlinkSync(tempPath);

  return diffPixels;
}
