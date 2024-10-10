export const useAwardsSchema = () => {
    const awards = [
        {
            "@context": "http://schema.org",
            "@type": "CreativeWork",
            "name": "Premio a la Innovación",
            "description": "La EAFPS (European Academy of Facial Plastic Surgery) otorga reconocimientos y acreditaciones en el campo de la cirugía plástica facial a profesionales que han demostrado un alto nivel de formación, experiencia y habilidades en este área. Los cirujanos certificados por la EAFPS cuentan con una especialización en procedimientos estéticos y reconstructivos de la cara, como rinoplastias, lifting faciales y blefaroplastias, entre otros.",
            "award": "Premio a la Innovación",
            "datePublished": "2023-11-15",
            "url": "https://eafps.org/",
            "publisher": {  
                "@type": "Organization",
                "name": "European Academy of Facial Plastic Surgery",
                "url": "https://eafps.org/"
            },
            "creator": {  // Organización que recibe el premio
                "@type": "Organization",
                "name": "Clínica Egos",
                "url": "https://www.clinicaegos.com"
            }
        },
        {
            "@context": "http://schema.org",
            "@type": "CreativeWork",
            "name": "Premio a la Excelencia",
            "description": "La SECPRE (Sociedad Española de Cirugía Plástica, Reparadora y Estética) otorga varios premios y reconocimientos para destacar la labor de cirujanos plásticos y promover la investigación, la innovación y la excelencia clínica.",
            "award": "Premio a la Excelencia",
            "datePublished": "2022-07-01",
            "url": "https://secpre.org/",
            "publisher": {
                "@type": "Organization",
                "name": "Sociedad Española de Cirugía Plástica, Reparadora y Estética",
                "url": "https://secpre.org/"
            },
            "creator": {
                "@type": "Organization",
                "name": "Clínica Egos",
                "url": "https://www.clinicaegos.com"
            }
        },
        {
            "@context": "http://schema.org",
            "@type": "CreativeWork",
            "name": "Premio al Mejor Servicio al Cliente",
            "description": "La SECOMCyC (Sociedad Española de Cirugía Oral y Maxilofacial y de Cabeza y Cuello) otorga reconocimientos y premios que destacan a los profesionales por su excelencia clínica",
            "award": "Premio al Mejor Servicio al Cliente",
            "datePublished": "2021-03-10",
            "url": "https://www.secomcyc.org/",
            "publisher": {
                "@type": "Organization",
                "name": "Sociedad Española de Cirugía Oral y Maxilofacial y de Cabeza y Cuello",
                "url": "https://www.secomcyc.org/"
            },
            "creator": {
                "@type": "Organization",
                "name": "Clínica Egos",
                "url": "https://www.clinicaegos.com"
            }
        },
        {
            "@context": "http://schema.org",
            "@type": "CreativeWork",
            "name": "Premio de Cirugía Estética",
            "description": "Este premio reconoce los esfuerzos por la sostenibilidad ambiental.",
            "award": "Premio a la Sostenibilidad",
            "datePublished": "2020-09-23",
            "url": "https://www.secpf.org/",
            "publisher": {
                "@type": "Organization",
                "name": "Sociedad Española de Cirugía Plástica Facial",
                "url": "https://www.secpf.org/"
            },
            "creator": {
                "@type": "Organization",
                "name": "Clínica Egos",
                "url": "https://www.clinicaegos.com"
            }
        }
    ];

    return { awards };
};
