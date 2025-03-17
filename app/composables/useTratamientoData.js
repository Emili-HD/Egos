// composables/useTratamientoData.js

export const useTratamientoData = (tratamiento, clinicasData) => {
    const route = useRoute();

    // Debug: Verificar el estado de clinicasData y clinicasError
    // console.log('clinicasData:', clinicasData.value);

    const generateStructuredData = () => {
        // Verifica si hay error o si los datos no están disponibles
        if (!clinicasData.value) {
            console.error('Error al cargar los datos de clínicas o los datos no están disponibles.');
            return null;
        }

        // Crear una lista de elementos del catálogo de ofertas basada en las clínicas
        const itemListElement = clinicasData.value.map(clinica => {
            return {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "serviceType": tratamiento.value.acf.datos.alternatename,
                    "provider": {
                        "@type": "MedicalOrganization",
                        "name": clinica.title.rendered,
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": clinica.acf.direccion,
                            "addressLocality": clinica.acf.localidad,
                            "addressRegion": clinica.acf.region,
                            "postalCode": clinica.acf.cp,
                            "addressCountry": clinica.acf.pais,
                        }
                    }
                }
            };
        });

        return {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": tratamiento.value.acf.datos.servicetype,
            "alternateName": tratamiento.value.acf.datos.alternatename,
            "description": tratamiento.value.acf.datos.description,
            "provider": {
                "@type": "MedicalOrganization",
                "name": "Egos",
                "medicalSpecialty": "Cirugía Plástica y Estética"
            },
            "areaServed": {
                "@type": "Place",
                "name": "España"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Ubicaciones disponibles",
                "itemListElement": itemListElement
            },
            "url": `https://www.clinicaegos.com${route.fullPath}`,
        };
    };

    return { generateStructuredData };
};
