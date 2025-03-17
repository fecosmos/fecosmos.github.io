import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import { ReactNode } from 'react';
import './globals.css'
export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}
 
const banner = <Banner storageKey="some-key">Nextra 4.0 is released 🎉</Banner>
const navbar = (
  <Navbar
    logo={
      <>
  
        <span className='font-bold text-xl'>
        Fecosmos
        </span>
      </>
    }
    projectLink="https://github.com/shuding/nextra"

    // ... Your additional navbar options
  />
)
const footer = <Footer>MIT {new Date().getFullYear()} © Shibin.</Footer>
 

export default async function RootLayout({ children }: { children: ReactNode }) {
  const pageMap = await getPageMap()
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 1 }}

          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}