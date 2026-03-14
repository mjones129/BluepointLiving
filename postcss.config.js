const purgecss = require('@fullhuman/postcss-purgecss')({
    content: ['./layouts/**/*.html', './content/**/*.md', './assets/js/**/*.js'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    safelist: {
        standard: ['show', 'active', 'collapsing'] // Classes added by JS
    }
});

module.exports = {
    plugins: [
        ...(process.env.HUGO_ENVIRONMENT === 'production' ? [purgecss] : [])
    ]
};