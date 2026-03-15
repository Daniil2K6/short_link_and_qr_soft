describe('ShortCodeService', () => {
  let ShortCodeService;
  
  beforeAll(() => {
    ShortCodeService = require('../src/services/ShortCodeService');
  });

  describe('isValidUrl', () => {
    it('should accept valid URLs', () => {
      expect(ShortCodeService.isValidUrl('http://example.com')).toBe(true);
      expect(ShortCodeService.isValidUrl('https://google.com')).toBe(true);
      expect(ShortCodeService.isValidUrl('https://sub.example.com/path?query=1')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(ShortCodeService.isValidUrl('not a url')).toBe(false);
      expect(ShortCodeService.isValidUrl('example.com')).toBe(false);
      expect(ShortCodeService.isValidUrl('')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(ShortCodeService.isValidUrl(null)).toBe(false);
      expect(ShortCodeService.isValidUrl(undefined)).toBe(false);
    });
  });
});
