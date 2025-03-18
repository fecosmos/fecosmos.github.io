import nextra from 'nextra'

const withNextra = nextra({
  // ... Other Nextra config options
  defaultShowCopyCode: true,
  search: {
    codeblocks: false,
  },
})

// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  distDir: 'dist',
})
