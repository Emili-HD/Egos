// composables/useBusinessData.js

export const useBusinessData = () => {

    const generateBusinessData = (clinicasData) => {
        // Verifica si hay error o si los datos no están disponibles
        if (!clinicasData || clinicasData.length === 0) {
            console.error('Error al cargar los datos de clínicas o los datos no están disponibles.');
            return null;
        }

        // Crear una lista de elementos del catálogo de ofertas basada en las clínicas
        const itemListElement = clinicasData.map((clinica) => {
            return {
                "@type": "LocalBusiness",
                parentOrganization: {
                    name: "CLINICA EGOS",
                },
                name: clinica.title.rendered,
                address: {
                    "@type": "PostalAddress",
                    addressCountry: clinica.acf.pais,
                    addressLocality: clinica.acf.localidad,
                    postalCode: clinica.acf.cp,
                    streetAddress: clinica.acf.direccion,
                },
                openingHours: clinica.acf.horario, // Si es un string o array, asignarlo directamente
                telephone: clinica.acf.telefono,
                image: clinica.featured_image_data.url,
                hasMap: clinica.acf.maps,
            };
        });

        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "MedicalOrganization",
                    name: "CLÍNICA EGOS",
                    url: "https://www.clinicaegos.com",
                    logo: "https://www.clinicaegos.com/images/logo.svg",
                    image:
                        "https://test.clinicaegos.com/wp-content/uploads/2024/06/desktop_op1.webp",
                    sameAs: [
                        "https://www.instagram.com/clinicaegos/",
                        "https://www.tiktok.com/@clinicaegos",
                        "https://www.pinterest.es/egosclinicas/",
                        "https://www.youtube.com/@clinicaegos",
                        "https://www.facebook.com/clinicaegos",
                    ],
                },
                ...itemListElement, // Esparcir los elementos dentro del array "@graph"
            ],
        };
    };

    return { generateBusinessData };
};
