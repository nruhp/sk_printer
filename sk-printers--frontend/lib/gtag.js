// lib/gtag.js - Google Analytics Setup

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formType) => {
  event({
    action: 'form_submission',
    category: 'Forms',
    label: formType,
  });
};

// Track quote requests
export const trackQuoteRequest = (boxType, quantity) => {
  event({
    action: 'quote_request',
    category: 'Conversions',
    label: boxType,
    value: parseInt(quantity) || 0,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName) => {
  event({
    action: 'button_click',
    category: 'Engagement',
    label: buttonName,
  });
};

// Track phone calls (Click to Call)
export const trackPhoneClick = () => {
  event({
    action: 'phone_click',
    category: 'Contact',
    label: 'Phone Number Clicked',
  });
};

// Track email clicks
export const trackEmailClick = () => {
  event({
    action: 'email_click',
    category: 'Contact',
    label: 'Email Clicked',
  });
};

// Facebook Pixel
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageviewFB = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

export const eventFB = (name, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
  }
};

export const trackLeadFB = () => {
  eventFB('Lead');
};

export const trackQuoteFB = (value) => {
  eventFB('InitiateCheckout', { value: value, currency: 'INR' });
};
