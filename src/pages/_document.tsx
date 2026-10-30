import { Html, Head, Main, NextScript } from 'next/document'

const SITE_URL = 'https://vann-seavlong.vercel.app'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="google-site-verification" content="4Eq45U774Op8r1O-a0BIrlx73jEG9xsxpwQI9m0miPM" />
        <meta name="description" content="VANN Seavlong - Software Engineer & Full Stack Developer Portfolio" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" type="image/png" href="/images/Me-logo-New.png" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VANN Seavlong Portfolio" />
        <meta property="og:title" content="VANN Seavlong - Software Engineer & Full Stack Developer" />
        <meta property="og:description" content="VANN Seavlong - Software Engineer & Full Stack Developer Portfolio" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/images/Me-logo-New.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VANN Seavlong - Software Engineer & Full Stack Developer" />
        <meta name="twitter:description" content="VANN Seavlong - Software Engineer & Full Stack Developer Portfolio" />
        <meta name="twitter:image" content={`${SITE_URL}/images/Me-logo-New.png`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
