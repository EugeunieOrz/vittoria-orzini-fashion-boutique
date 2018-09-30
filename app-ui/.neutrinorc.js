const path = require('path');

module.exports = {
  use: [
    ['@neutrinojs/react', {
      // http://discourse.silhouette.rocks/t/hot-module-replacement-for-silhouette-play-react-seed-template-doesnt-work/193/4
      devServer: {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      },
      babel: {
        presets: [
          'lingui-react',
        ],
      },
    }],
    ['@neutrinojs/html-template', {
      title: 'Vittoria Orzini Fashion Boutique & Online Store',
      mobile: true,
      links: [
        'https://fonts.googleapis.com/css?family=Roboto:400,500,700',
        'https://fonts.googleapis.com/css?family=Acme',
        'https://fonts.googleapis.com/css?family=Philosopher:700i',
        {
          href: '/static/favicon.ico',
          rel: 'shortcut icon',
          type: 'image/x-icon'
        },
        {
          href: '/static/fonts/ScriptinaPro.woff',
          href: '/static/fonts/ADAM-CGPRO.woff',
          href: '/static/fonts/Audrey-Bold.woff',
          href: '/static/fonts/Audrey-BoldOblique.woff',
          href: '/static/fonts/Audrey-Medium.woff',
          href: '/static/fonts/Audrey-MediumOblique.woff',
          href: '/static/fonts/Audrey-Normal.woff',
          href: '/static/fonts/Audrey-NormalOblique.woff',
        },
      ],
    }],
    '@neutrinojs/karma',
    'neutrino-webpack.js',
    'neutrino-sass.js',
    (neutrino) => neutrino.config.node.set('Buffer', true),
  ],
  options: {
    output: path.resolve(__dirname, '../target/npm/dist/ui')
  }
};
