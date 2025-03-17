export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("app:head", (head) => {
        head.script = head.script || [];
        head.script.push({
            type: "application/ld+json",
            children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "MedicalOrganization",
                "name": "EGOS Cirugía Plástica y Reparadora",
                "url": "https://www.clinicaegos.com/",
                "logo": "https://test.clinicaegos.com/wp-content/uploads/2023/12/logo-egos.svg",
                "sameAs": [
                    "https://www.facebook.com/clinicaegos",
                    "https://www.tiktok.com/@clinicaegos",
                    "https://www.youtube.com/@clinicaegos",
                    "https://www.instagram.com/clinicaegos/"
                ],
                "location": [
                    {
                        "@type": "Place",
                        "name": "EGOS Barcelona Balmes",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "C/Balmes, 268",
                            "addressLocality": "Barcelona",
                            "addressRegion": "Sarrià-Sant Gervasi",
                            "postalCode": "08006",
                            "addressCountry": "ES"
                        },
                        "telephone": "+34 616987740"
                    },
                    {
                        "@type": "Place",
                        "name": "EGOS Barcelona Aribau",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "C/Carrer d'Aribau, 192",
                            "addressLocality": "Barcelona",
                            "addressRegion": "L'Eixample",
                            "postalCode": "08036",
                            "addressCountry": "ES"
                        },
                        "telephone": "+34 633696383"
                    },
                    {
                        "@type": "Place",
                        "name": "EGOS Barcelona Gràcia",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "C/ de Sardenya, 515",
                            "addressLocality": "Barcelona",
                            "addressRegion": "Gràcia",
                            "postalCode": "08024",
                            "addressCountry": "ES"
                        },
                        "telephone": "+34 681332374"
                    },
                    {
                        "@type": "Place",
                        "name": "EGOS Badalona",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Plaça de l'Alcalde Xifré, 14",
                            "addressLocality": "Badalona",
                            "postalCode": "08912",
                            "addressCountry": "ES"
                        },
                        "telephone": "+34 699263162"
                    },
                    {
                        "@type": "Place",
                        "name": "EGOS Hospitalet de Llobregat",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Rambla Just Oliveras, 63",
                            "addressLocality": "Hospitalet de Llobregat",
                            "postalCode": "08901",
                            "addressCountry": "ES"
                        },
                        "telephone": "+34 618276235"
                    },
                    {
                        "@type": "Place",
                        "name": "EGOS Sabadell",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "C/ Prat de la Riba, 49",
                            "addressLocality": "Sabadell",
                            "postalCode": "08206",
                            "addressCountry": "ES"
                        },
                        "telephone": "+34 722591166"
                    },
                    {
                        "@type": "Place",
                        "name": "EGOS Mataró",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Carrer d'Argentona, 33",
                            "addressLocality": "Mataró",
                            "postalCode": "08302",
                            "addressCountry": "ES"
                        },
                        "telephone": "+34 650166593"
                    },
                    {
                        "@type": "Place",
                        "name": "EGOS Manresa",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Ctra. de Vic, 149",
                            "addressLocality": "Manresa",
                            "postalCode": "08243",
                            "addressCountry": "ES"
                        },
                        "telephone": "+34 622804365"
                    },
                    {
                        "@type": "Place",
                        "name": "EGOS Tarragona",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Rambla President Francesc Macià 10 C",
                            "addressLocality": "Tarragona",
                            "postalCode": "43002",
                            "addressCountry": "ES"
                        },
                        "telephone": "+34 622406576"
                    },
                    {
                        "@type": "Place",
                        "name": "EGOS Girona",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Plaça Poeta Marquina, 6",
                            "addressLocality": "Girona",
                            "postalCode": "17001",
                            "addressCountry": "ES"
                        },
                        "telephone": "+34 682881842"
                    },
                    {
                        "@type": "Place",
                        "name": "EGOS Reus",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Carrer de Castellvell, 7",
                            "addressLocality": "Reus",
                            "postalCode": "43202",
                            "addressCountry": "ES"
                        },
                        "telephone": "+34 977327327"
                    },
                    {
                        "@type": "Place",
                        "name": "EGOS Lleida",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Rambla de Ferran, 54, bajo",
                            "addressLocality": "Lleida",
                            "postalCode": "25007",
                            "addressCountry": "ES"
                        },
                        "telephone": "+34 676381890"
                    },
                    {
                        "@type": "Place",
                        "name": "EGOS Andorra",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Plaça Coprínceps, Carrer Santa Anna, 1. Edifici",
                            "addressLocality": "Escaldes-Engordany",
                            "addressCountry": "AD"
                        },
                        "telephone": "+376 6668856"
                    },
                    {
                        "@type": "Place",
                        "name": "EGOS Madrid",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "C. de Sagasta, 3",
                            "addressLocality": "Madrid",
                            "postalCode": "28004",
                            "addressCountry": "ES"
                        },
                        "telephone": "+34 636026433"
                    }
                ]
            })
        });
    });
});
