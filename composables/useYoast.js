// composables/useYoastHead.js

export const useYoastHead = (page) => {
    const yoast = computed(() => page.value?.yoast_head_json || null);

    const generateYoastHead = () => {
        if (!yoast.value) {
            return {
                title: 'Cargando...',
            };
        }

        const link = [
            {
                rel: 'canonical',
                href: (() => {
                    let canonical = yoast.value.canonical.startsWith('https://www.')
                        ? yoast.value.canonical
                        : yoast.value.canonical.startsWith('https://')
                        ? `https://www.${yoast.value.canonical.substring(8)}`
                        : yoast.value.canonical;
                    canonical = canonical.endsWith('/') ? canonical : `${canonical}/`;
                    return canonical;
                })()
            }
        ];

        const metaTags = [
            { name: 'description', content: yoast.value.og_description || 'Egos | Clínica de cirugía y medicina estética' },
            { property: 'og:title', content: yoast.value.og_title },
            { property: 'og:description', content: yoast.value.og_description },
            { property: 'og:url', content: yoast.value.og_url },
            { property: 'og:type', content: yoast.value.og_type },
            { property: 'og:locale', content: yoast.value.og_locale },
            { property: 'og:site_name', content: yoast.value.og_site_name },
            { property: 'article:publisher', content: yoast.value.article_publisher },
            { name: 'twitter:card', content: yoast.value.twitter_card },
            { name: 'twitter:data1', content: yoast.value.twitter_misc?.['Tiempo de lectura'] || '' },
            {
                name: 'robots',
                content: `index=${yoast.value.robots.index}, follow=${yoast.value.robots.follow}, max-snippet=${yoast.value.robots['max-snippet']}, max-image-preview=${yoast.value.robots['max-image-preview']}, max-video-preview=${yoast.value.robots['max-video-preview']}`
            },
        ];

        if (yoast.value.og_image && yoast.value.og_image.length > 0) {
            yoast.value.og_image.forEach((image) => {
                metaTags.push({ property: 'og:image', content: image.url });
                metaTags.push({ property: 'og:image:width', content: image.width.toString() });
                metaTags.push({ property: 'og:image:height', content: image.height.toString() });
            });
        }

        return {
            title: yoast.value.title,
            link: link,
            meta: metaTags,
        };
    };

    return { generateYoastHead };
};
