const readline = require('readline');
const Link = require('../models/Link');
const { pool } = require('../database/db');

class AdminConsole {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  question(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, resolve);
    });
  }

  truncateUrl(url, maxLength = 50) {
    if (url.length <= maxLength) {
      return url;
    }
    return url.substring(0, maxLength) + '...';
  }

  async start() {
    console.log('\n╔═══════════════════════════════════════════╗');
    console.log('║   Short Link & QR Code Admin Console      ║');
    console.log('╚═══════════════════════════════════════════╝\n');
    await this.showMenu();
  }

  async showMenu() {
    console.log('\n--- ADMIN MENU ---');
    console.log('1. View all links');
    console.log('2. Search links');
    console.log('3. View link statistics');
    console.log('4. Block a link');
    console.log('5. Delete a link (by ID or short code)');
    console.log('6. List all short codes with IDs');
    console.log('7. Exit');

    const choice = await this.question('\nSelect an option (1-7): ');

    try {
      switch (choice.trim()) {
        case '1':
          await this.viewAllLinks();
          break;
        case '2':
          await this.searchLinks();
          break;
        case '3':
          await this.viewStatistics();
          break;
        case '4':
          await this.blockLink();
          break;
        case '5':
          await this.deleteLink();
          break;
        case '6':
          await this.listShortCodesWithIds();
          break;
        case '7':
          await this.exit();
          return;
        default:
          console.log('Invalid option. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }

    await this.showMenu();
  }

  async viewAllLinks() {
    try {
      const links = await Link.getAll(50, 0);

      if (links.length === 0) {
        console.log('\nNo links found.');
        return;
      }

      console.log('\n--- ALL LINKS ---');
      console.log(`Total: ${links.length} links\n`);

      links.forEach((link, index) => {
        console.log(`${index + 1}. [ID: ${link.id}] ${link.short_code}`);
        console.log(`   URL: ${this.truncateUrl(link.original_url)}`);
        console.log(`   Clicks: ${link.click_count} | Status: ${link.status}\n`);
      });
    } catch (error) {
      console.error('Error retrieving links:', error.message);
    }
  }

  async searchLinks() {
    const query = await this.question('Enter search query: ');
    try {
      const results = await Link.search(query);

      if (results.length === 0) {
        console.log('\nNo results found.');
        return;
      }

      console.log(`\n--- SEARCH RESULTS (${results.length} found) ---\n`);

      results.forEach((link, index) => {
        console.log(`${index + 1}. [ID: ${link.id}] ${link.short_code}`);
        console.log(`   URL: ${this.truncateUrl(link.original_url)}`);
        console.log(`   Clicks: ${link.click_count} | Status: ${link.status}\n`);
      });
    } catch (error) {
      console.error('Error searching links:', error.message);
    }
  }

  async viewStatistics() {
    const linkId = await this.question('Enter link ID: ');
    try {
      const stats = await Link.getStats(linkId);

      if (!stats.link) {
        console.log('\nLink not found.');
        return;
      }

      console.log('\n--- LINK STATISTICS ---');
      console.log(`Short Code: ${stats.link.short_code}`);
      console.log(`Original URL: ${this.truncateUrl(stats.link.original_url)}`);
      console.log(`Total Clicks: ${stats.link.click_count}`);
      console.log(`Status: ${stats.link.status}`);
      console.log(`Created: ${new Date(stats.link.created_at).toLocaleString()}\n`);

      if (stats.sourceStats && stats.sourceStats.length > 0) {
        console.log('--- CLICKS BY SOURCE ---');
        stats.sourceStats.forEach(source => {
          console.log(`${source.source.toUpperCase()}: ${source.count} clicks`);
        });
        console.log('');
      }

      if (stats.clicks && stats.clicks.length > 0) {
        console.log('--- CLICKS BY DATE ---');
        stats.clicks.forEach(click => {
          console.log(`${click.click_date}: ${click.total_clicks} clicks (${click.unique_visitors} unique)`);
        });
      } else {
        console.log('No clicks recorded yet.');
      }
    } catch (error) {
      console.error('Error retrieving statistics:', error.message);
    }
  }

  async blockLink() {
    const linkId = await this.question('Enter link ID to block: ');
    try {
      const link = await Link.updateStatus(linkId, 'blocked');

      if (!link) {
        console.log('\nLink not found.');
        return;
      }

      console.log(`\n✓ Link ${link.short_code} has been blocked.`);
    } catch (error) {
      console.error('Error blocking link:', error.message);
    }
  }

  async deleteLink() {
    const query = await this.question('Enter link ID or short code to delete: ');
    const confirm = await this.question('Are you sure? (yes/no): ');

    if (confirm.toLowerCase() !== 'yes') {
      console.log('Cancelled.');
      return;
    }

    try {
      let link;

      if (!isNaN(query)) {
        link = await Link.delete(query);
      } else {
        const foundLink = await Link.findByShortCode(query);
        if (foundLink) {
          link = await Link.delete(foundLink.id);
        }
      }

      if (!link) {
        console.log('\nLink not found.');
        return;
      }

      console.log(`\n✓ Link ${link.short_code} (ID: ${link.id}) has been deleted.`);
    } catch (error) {
      console.error('Error deleting link:', error.message);
    }
  }

  async listShortCodesWithIds() {
    try {
      const links = await Link.getAll(100, 0);

      if (links.length === 0) {
        console.log('\nNo links found.');
        return;
      }

      console.log('\n--- SHORT CODES WITH IDS ---');
      console.log(`Total: ${links.length} links\n`);
      console.log('ID   | Short Code   | Status');
      console.log('-----|--------------|--------');

      links.forEach((link) => {
        const id = String(link.id).padEnd(4);
        const shortCode = link.short_code.padEnd(12);
        const status = link.status;
        console.log(`${id} | ${shortCode} | ${status}`);
      });

      console.log('\n');
    } catch (error) {
      console.error('Error retrieving links:', error.message);
    }
  }

  async exit() {
    console.log('\nGoodbye!');
    this.rl.close();
    await pool.end();
    process.exit(0);
  }
}

(async () => {
  try {
    const admin = new AdminConsole();
    await admin.start();
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
})();

module.exports = AdminConsole;
