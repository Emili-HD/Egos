// composables/usePostFaqJson.js

export const usePostFaqJson = (post_faqs) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post_faqs.preguntas_frecuentes.map(faq => ({
            "@type": "Question",
            "name": faq.faq_subtitle,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.faq_description.replace(/(<([^>]+)>)/gi, "")
            }
        }))
    };

    return jsonLd
};
