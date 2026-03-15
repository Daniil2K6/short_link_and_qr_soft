const { nanoid } = require('nanoid');

class ShortCodeService {
  static generateShortCode(length = process.env.SHORT_CODE_LENGTH || 7) {
    return nanoid(parseInt(length));
  }

  static isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = ShortCodeService;
