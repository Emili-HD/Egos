// composables/useSinglePlaceData.js
export const useSinglePlaceData = () => {

    const generateSinglePlaceData = (clinica) => {
        // Verifica si `clinica` tiene todos los datos necesarios
        if (!clinica || !clinica.title || !clinica.acf) {
            console.log(clinica);
            
            console.error('Error al cargar los datos de clínica o los datos no están disponibles.');
            return null;
        }

        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "MedicalOrganization",
                    name: "CLÍNICA EGOS",
                    url: "https://www.clinicaegos.com",
                    logo: "https://www.clinicaegos.com/images/logo.svg",
                    image: "https://test.clinicaegos.com/wp-content/uploads/2024/06/desktop_op1.webp",
                    sameAs: [
                        "https://www.instagram.com/clinicaegos/",
                        "https://www.tiktok.com/@clinicaegos",
                        "https://www.pinterest.es/egosclinicas/",
                        "https://www.youtube.com/@clinicaegos",
                        "https://www.facebook.com/clinicaegos",
                    ],
                },
                {
                    "@type": "LocalBusiness",
                    parentOrganization: {
                        name: "CLINICA EGOS",
                    },
                    name: clinica.title.rendered || "Nombre no disponible",
                    address: {
                        "@type": "PostalAddress",
                        addressCountry: clinica.acf.pais || "País no disponible",
                        addressLocality: clinica.acf.localidad || "Localidad no disponible",
                        postalCode: clinica.acf.cp || "Código postal no disponible",
                        streetAddress: clinica.acf.direccion || "Dirección no disponible",
                    },
                    openingHours: clinica.acf.horario || "Horario no disponible",
                    telephone: clinica.acf.telefono || "Teléfono no disponible",
                    image: clinica.featured_image_data?.url || "URL de imagen no disponible",
                    hasMap: clinica.acf.maps || "Mapa no disponible",
                }
            ],
        };
    };

    return { generateSinglePlaceData };
};
