// composables/useCirugiasdata.js
export const useCirugiaServiceSchema = (cirugias) => {
    const generateSchema = () => {
        if (!cirugias.value || cirugias.value.length === 0) {
            console.error('No hay cirugías disponibles para generar el JSON-LD.');
            return null;
        }

        const schemas = cirugias.value.map((cirugia) => {
            const datos = cirugia.acf?.datos; // Datos personalizados de la cirugía
            if (!datos) {
                console.warn(`La cirugía con ID ${cirugia.id} no tiene datos disponibles.`);
                return null;
            }

            return {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": datos.servicetype || "Servicio no especificado",
                "alternateName": datos.alternatename || "Nombre alternativo no especificado",
                "description": datos.description || "Descripción no disponible",
                "provider": {
                    "@type": "MedicalOrganization",
                    "name": "Egos",
                    "medicalSpecialty": "Cirugía Plástica y Estética",
                },
                "areaServed": {
                    "@type": "Place",
                    "name": "España",
                },
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Ubicaciones disponibles",
                    "itemListElement": {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "serviceType": datos.alternatename,
                            "provider": {
                                "@type": "MedicalOrganization",
                                "name": "Clinica Egos",
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "C/Balmes, 268, Sarrià-Sant Gervasi",
                                    "addressLocality": "Barcelona",
                                    "addressRegion": "Barcelona",
                                    "postalCode": "08006",
                                    "addressCountry": {
                                        "@type": "Country",
                                        "name": "España"
                                    }
                                }
                            }
                        }
                    },
                },
            };
        }).filter(Boolean); // Filtra cualquier entrada nula o indefinida

        return schemas;
    };

    return { generateSchema };
};
