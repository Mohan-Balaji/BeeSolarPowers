import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
}

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  ogImage,
  ogType = "website"
}: SEOHeadProps) {
  const siteUrl = window.location.origin; // Gets the base URL dynamically
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl || window.location.href} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl || window.location.href} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage || `${siteUrl}/logo.png`} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || `${siteUrl}/logo.png`} />
    </Helmet>
  );
}