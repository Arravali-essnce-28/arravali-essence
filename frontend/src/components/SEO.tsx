import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    ogType?: string;
    ogImage?: string;
    twitterCard?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    canonical,
    ogType = 'website',
    ogImage = '/og-image.jpg',
    twitterCard = 'summary_large_image',
}) => {
    const siteTitle = 'Arravali Essence';
    const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - Premium Authentic Indian Spices & Herbs`;
    const defaultDescription = 'Discover the finest selection of authentic Indian spices, herbs, and spice blends at Arravali Essence. Delivered across the UK. Premium saffron, traditional masala, and more.';
    const defaultKeywords = 'indian spices uk, authentic spices, premium spices, saffron, cardamom, turmeric, garam masala, biryani masala, buy spices online uk, arravali essence, spice shop london, uk spice delivery';

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords ? `${defaultKeywords}, ${keywords}` : defaultKeywords} />

            {/* Canonical URL */}
            {canonical && <link rel="canonical" href={canonical} />}
            {!canonical && <link rel="canonical" href={window.location.href} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={window.location.href} />

            {/* Twitter */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={ogImage} />
        </Helmet>
    );
};

export default SEO;
