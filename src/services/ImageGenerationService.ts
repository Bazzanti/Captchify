import { createCanvas } from 'canvas';

/**
 *
 * This service is responsible for generating images.
 * For checking images,use https://base64.guru/converter/decode/image
 */
export class ImageGenerationService {
  width = 150;
  height = 70;
  font = '48px sans-serif';
  backgroundColor = '#ffffff'; // white
  textColor = '#000000'; // black

  /**
   * Generate a captcha image
   * TOFIX - Add more options to customize the image
   * TOFIX - 1 and I are hard to distinguish
   * @param text The text to display in the image
   * @returns The generated image
   */
  generateCaptcha(text: string) {
    // Increase the width of the image if the text is too long
    // TODO can be done better
    const width = this.width + (text.length > 5 ? (text.length - 5) * 20 : 0);
    const canvas = createCanvas(width, this.height);
    const ctx = canvas.getContext('2d');

    // Fill the background with a color
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, width, this.height);

    // Add some noise
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() / 2})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * width,
        Math.random() * this.height,
        Math.random() * 10,
        0,
        Math.PI * 2,
        true,
      );
      ctx.fill();
    }

    // Draw the text
    ctx.font = this.font;
    ctx.fillStyle = this.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, this.height / 2);

    const imageData = ctx.getImageData(0, 0, width, this.height);

    // Apply more distortion functions here if needed

    ctx.putImageData(imageData, 0, 0);

    return canvas.toBuffer('image/png');
  }
}
