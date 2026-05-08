/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.kaydyachaanifaydyach.com',
    generateRobotsTxt: true, // (optional)
    exclude: ['/auth/*', '/dashboard/*', '/api/*'],
    // ...other options
}
