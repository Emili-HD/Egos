// composables/useFaqJsonLd.js

export const useFaqJsonLd = (faqs) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.heading_faq,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.content_faq.replace(/(<([^>]+)>)/gi, "") // Remover etiquetas HTML
            }
        }))
    };

    return jsonLd
};
