import { test, expect } from '@jest/globals';
import { ImageGenerationService } from '../services/ImageGenerationService';

test('create image base 64', () => {
  const imgService = new ImageGenerationService();
  const img = imgService.generateCaptcha('test');
  const imgBase64 = Buffer.from(img).toString('base64');
  console.log(imgBase64);
  expect(imgBase64).toBeDefined();
});
