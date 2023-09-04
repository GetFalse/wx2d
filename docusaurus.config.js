// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'WX2D',
  tagline: '微信开发，轻松上手',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://wx2d.cn',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'GetFalse', // Usually your GitHub org/user name.
  projectName: 'wx2d', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['en','zh-cn'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/GetFalse/wx2d/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/GetFalse/wx2d/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/wx2dlogo.png',
      navbar: {
        title: 'WX2D',
        logo: {
          alt: 'WX2D',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '微信教程',
          },
          {to: '/blog', label: '记录点滴', position: 'left'},
          {
            to: '/about-me',
            label: '我的自述',
            position: 'right',
          }
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '微信教程',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: '微信公众号',
                href: 'https://oss.iaigc.run/wx2d/dyh.jpg',
              },
              {
                label: '微信交流群',
                href: 'https://oss.iaigc.run/wx2d/wx.jpg',
              },
              {
                label: 'QQ群',
                href: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=ii3FkCvFkmbSEfv2XNZlyvnkveb0P_zD&authKey=wkjz5DUUPgv%2BrPgfgVF7AmDTGIpuF3aUSapkuKU%2FDZ7sBW%2FDEpe13JUUaGZOInsT&noverify=0&group_code=916895299',
              },
              {
                label: '上报问题',
                href: 'https://github.com/GetFalse/wx2d/issues',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '记录点滴',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/GetFalse/wx2d',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://wx2d.cn" >wx2d.cn</a>  Built with Docusaurus･<a href="http://beian.miit.gov.cn" target="_blank">鄂ICP备2023010553号</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      metadata: [{name: 'keywords', content: '微信开发,微信支付,微信小程序支付,微信公众号支付,微信H5支付,微信公众号开发,微信开发者平台文档,微信开放平台,微信开发者工具,微信开发教程,微信开发帮助中心,企业微信'}],
    }),
};

module.exports = config;
