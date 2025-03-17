// composables/useBreadcrumbData.js

export const useBreadcrumbData = (tratamiento) => {
    const route = useRoute();
    const url = `https://www.clinicaegos.com${route.fullPath}`;

    const generateBreadcrumbData = () => {
        // Desglosamos la URL en segmentos
        const pathSegments = route.fullPath.split('/').filter(segment => segment);

        // Creamos la base de la URL
        const baseUrl = 'https://www.clinicaegos.com';

        // Generamos los elementos de la lista
        const itemListElement = pathSegments.map((segment, index) => {
            const itemUrl = `${baseUrl}/${pathSegments.slice(0, index + 1).join('/')}/`;
            return {
                "@type": "ListItem",
                "position": index + 1,
                "name": tratamiento[index] || segment.replace(/-/g, ' '),
                "item": itemUrl
            };
        });

        // Añadimos el elemento inicial (Portada)
        itemListElement.unshift({
            "@type": "ListItem",
            "position": 1,
            "name": "Portada",
            "item": baseUrl + '/'
        });

        // Ajustamos las posiciones de los demás elementos
        itemListElement.forEach((item, index) => item.position = index + 1);

        // Estructura del JSON-LD
        const breadcrumbData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            "itemListElement": itemListElement
        };

        return breadcrumbData;
    };

    return {
        generateBreadcrumbData
    };
};
