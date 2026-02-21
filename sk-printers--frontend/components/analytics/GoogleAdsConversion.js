// components/GoogleAdsConversion.js
import { useEffect } from 'react';

export const trackConversion = (conversionId, conversionLabel, value = 0) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${conversionId}/${conversionLabel}`,
      value: value,
      currency: 'INR',
    });
  }
};

// Track Quote Request Conversion
export const trackQuoteConversion = (quoteValue = 0) => {
  trackConversion(
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
    process.env.NEXT_PUBLIC_QUOTE_CONVERSION_LABEL,
    quoteValue
  );
};

// Track Contact Form Conversion
export const trackContactConversion = () => {
  trackConversion(
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
    process.env.NEXT_PUBLIC_CONTACT_CONVERSION_LABEL
  );
};

// Google Ads Remarketing Tag
export const GoogleAdsRemarketingTag = () => {
  const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  useEffect(() => {
    if (typeof window !== 'undefined' && ADS_ID) {
      window.gtag('config', ADS_ID);
    }
  }, []);

  return null;
};

export default GoogleAdsRemarketingTag;
