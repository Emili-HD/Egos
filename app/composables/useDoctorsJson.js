// composables/useDoctorsJson.js
import { useRoute } from 'vue-router';

export const useDoctorsJson = (doctor) => {
    const route = useRoute();

    const injectDoctorData = () => {
        // Asegúrate de que el doctor tiene los datos necesarios
        if (!doctor || !doctor.post_title || !doctor.acf) {
            return { doctorData: null };
        }

        const acf = doctor.acf?.microdatos || {};

        // Crear el objeto JSON-LD para el Physician
        const doctorData = {
            "@context": "http://schema.org",
            "@type": "Physician",
            "name": doctor.post_title || '',
            "description": acf.description || doctor.post_content || '',
            "image": doctor.featured_image_data?.url || '',
            "medicalSpecialty": acf.medicalspecialty || doctor.acf?.trayectoria?.especialidad || '',
            "address": {
                "@type": "PostalAddress",
                "streetAddress": acf.streetaddress || doctor.acf?.trayectoria?.localización || '',
                "addressLocality": acf.addresslocality || '',
                "addressRegion": "España",
                "postalCode": acf.postalcode || '',
                "addressCountry": "ES"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+34 633 696 383",
                "contactType": "Consultation",
                "availableLanguage": ["Spanish"]
            },
            "memberOf": Array.isArray(acf.memberof) ? acf.memberof.map(member => ({
                "@type": "MedicalOrganization",
                "name": member.name || ''
            })) : [],
            "award": Array.isArray(acf.awards) ? acf.awards.map(award => award.award || '') : [],
            "sameAs": Array.isArray(acf.rrss) ? acf.rrss.map(social => social.social_url || '') : [],
            "potentialAction": {
                "@type": "ReserveAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": doctor.permalink || '',
                    "inLanguage": "es",
                }
            }
        };

        // Publicaciones si existen
        const publications = Array.isArray(acf.publications) ? acf.publications : [];
        const publicationElements = publications.map(publication => ({
            "@context": "http://schema.org",
            "@type": "MedicalScholarlyArticle",
            "headline": publication.title || '',
            "author": {
                "@type": "Physician",
                "name": doctor.post_title || ''
            },
            "datePublished": publication.datepublished || '',
            "journalName": publication.journalname || '',
            "url": publication.url || ''
        }));

        // Retornar ambos JSON-LD para inyectarlos con useHead
        return {
            doctorData,
            publicationElements
        };
    };

    return { injectDoctorData };
};
