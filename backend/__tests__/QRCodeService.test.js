describe('QRCodeService', () => {
  let QRCodeService;

  beforeAll(() => {
    QRCodeService = require('../src/services/QRCodeService');
  });

  describe('generateQRCode', () => {
    it('should generate a valid data URL', async () => {
      const qrCode = await QRCodeService.generateQRCode('https://example.com');
      expect(qrCode).toMatch(/^data:image\/png;base64,/);
    });

    it('should accept different URLs', async () => {
      const qrCode1 = await QRCodeService.generateQRCode('https://example.com');
      const qrCode2 = await QRCodeService.generateQRCode('https://google.com');
      expect(qrCode1).not.toEqual(qrCode2);
    });

    it('should throw an error for invalid input', async () => {
      try {
        await QRCodeService.generateQRCode(null);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).toContain('Failed to generate QR code');
      }
    });
  });

  describe('generateQRCodeBuffer', () => {
    it('should generate a valid PNG buffer', async () => {
      const buffer = await QRCodeService.generateQRCodeBuffer('https://example.com');
      expect(Buffer.isBuffer(buffer)).toBe(true);
      // PNG files start with 0x89504E47
      expect(buffer[0]).toBe(0x89);
      expect(buffer[1]).toBe(0x50);
    });
  });
});
