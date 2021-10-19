// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "My Dev Stories",
  tagline: "개발 이야기",
  url: "https://danwsc09.github.io/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "danwsc09", // Usually your GitHub org/user name.
  projectName: "danwsc09.github.io", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "blogs",
          routeBasePath: "blogs",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/danwsc09",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/danwsc09/danwsc09.github.io",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "My Dev Stories",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "hi",
            position: "left",
            label: "Blog",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/danwsc09",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Blogs",
            items: [
              {
                label: "Blog Home",
                to: "/blogs/hi",
              },
            ],
          },
          {
            title: "SNS",
            items: [
              {
                label: "Coming soon",
                href: "https://google.ca",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/danwsc09",
              },
            ],
          },
        ],
        copyright: `Copyright © 2021 My Dev Stories, Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
