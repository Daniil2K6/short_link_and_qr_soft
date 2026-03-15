const qrcode = require('qrcode');

class QRCodeService {
  static async generateQRCode(url) {
    try {
      return await qrcode.toDataURL(url);
    } catch (error) {
      throw new Error('Failed to generate QR code: ' + error.message);
    }
  }

  static async generateQRCodeBuffer(url) {
    try {
      return await qrcode.toBuffer(url);
    } catch (error) {
      throw new Error('Failed to generate QR code: ' + error.message);
    }
  }
}

module.exports = QRCodeService;
