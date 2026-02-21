// next-seo.config.js
export default {
  titleTemplate: '%s | SK Printers - Premium Corrugated Box Manufacturer',
  defaultTitle: 'SK Printers - ISO Certified Corrugated Box Manufacturer in India',
  description: 'Leading manufacturer of eco-friendly corrugated boxes in India. ISO 2045 certified. 3-ply, 5-ply, 7-ply packaging solutions. Custom printing available. 48-hour delivery. Serving 500+ businesses.',
  canonical: 'https://www.skprinters.com',
  
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.skprinters.com',
    siteName: 'SK Printers',
    title: 'SK Printers - Premium Corrugated Box Manufacturer',
    description: 'ISO certified manufacturer of 3-ply, 5-ply, 7-ply corrugated boxes. Custom printing, eco-friendly materials, 48-hour delivery across India.',
    images: [
      {
        url: 'https://www.skprinters.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SK Printers - Corrugated Box Manufacturing',
        type: 'image/jpeg',
      },
    ],
  },
  
  twitter: {
    handle: '@skprinters',
    site: '@skprinters',
    cardType: 'summary_large_image',
  },
  
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'corrugated boxes, cardboard boxes manufacturer, 3-ply boxes, 5-ply boxes, 7-ply boxes, custom box printing, eco-friendly packaging, ISO certified packaging, corrugated packaging India, bulk cardboard boxes, e-commerce packaging, industrial packaging, export packaging boxes',
    },
    {
      name: 'author',
      content: 'SK Printers',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    {
      name: 'googlebot',
      content: 'index, follow',
    },
    {
      name: 'bingbot',
      content: 'index, follow',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:locale',
      content: 'en_IN',
    },
    {
      name: 'language',
      content: 'English',
    },
    {
      name: 'geo.region',
      content: 'IN-TN',
    },
    {
      name: 'geo.placename',
      content: 'Tamil Nadu',
    },
    {
      name: 'geo.position',
      content: '12.9716;77.5946',
    },
  ],
  
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
};
