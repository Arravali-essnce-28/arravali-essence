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
    const fullTitle = title ? `${title} | ${siteTitle}` : `Best Spices in UK | Buy Indian Spices Online | ${siteTitle}`;
    const defaultDescription = 'Arravali Essence – the best spices website in the UK. Buy authentic Indian spices online with fast UK delivery to London, Birmingham, Leicester, Manchester & more.';
    const defaultKeywords = 'best spices in uk, spices in uk, spices website uk, buy spices uk, spices online uk, best spices in london, spice shop uk, indian spices uk, spices london, spices birmingham, spices leicester, spices manchester, uk spice delivery, authentic indian spices, premium spices uk, arravali essence, spice shop london, garam masala uk, turmeric uk, saffron uk';

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
