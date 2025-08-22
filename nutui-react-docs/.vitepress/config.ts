import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/nutui-all-in-one/',
  title: "NutUI React Docs",
  themeConfig: {
    sidebar: [
      {
        items: [
          { text: 'issue#3333', link: '/issue_3333' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/holyfata/nutui-all-in-one' }
    ]
  }
})
