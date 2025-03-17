// composables/blogPostingSchema.js

export const usePostData = (post) => {
    const cleanHTML = (html) => {
        if (import.meta.client) {
            const div = document.createElement('div');
            div.innerHTML = html;
            return div.textContent || div.innerText || '';
        }
        return ''; // En el servidor, simplemente devolvemos una cadena vacía
    };

    const concatenateContent = (areas) => {
        return areas
            .map(area => `${area.titulo_area || ''}: ${(area.contenido_area || '')}`)
            .join('\n\n');
    };

    const generatePostData = () => {
        const route = useRoute();

        // Verifica si hay error o si los datos no están disponibles
        if (!post.value) {
            console.error('Error al cargar los datos del post o los datos no están disponibles.');
            return null;
        }

        // Concatena y limpia el contenido de las áreas
        const extraContent = post.value.acf.areas_de_contenido
            ? concatenateContent(post.value.acf.areas_de_contenido)
            : '';

        return {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            "@id": `https://www.clinicaegos.com${route.fullPath}#BlogPosting`,
            "url": `https://www.clinicaegos.com${route.fullPath}`,
            "inLanguage": "es",
            "mainEntityOfPage": `https://www.clinicaegos.com${route.fullPath}`,
            "headline": post.value.title.rendered,
            "description": post.value.excerpt.rendered.replace(/(<([^>]+)>)/gi, ""),
            "articleBody": `${post.value.content.rendered.replace(/(<([^>]+)>)/gi, "")}\n\n${extraContent.replace(/(<([^>]+)>)/gi, "") }`, // Concatenar el contenido principal y las áreas
            "keywords": post.value.acf.keywords,
            "datePublished": post.value.date_gmt,
            "dateModified": post.value.modified_gmt,
            "author": {
                "@type": "Person",
                "name": "Clínica Egos",
                "description": "EGOS | Clínica de cirugía y medicina estética",
                "url": "https://www.clinicaegos.com/",
                "sameAs": [
                    "https://www.clinicaegos.com/",
                    "admin"
                ],
                "image": {
                    "@type": "ImageObject",
                    "url": "https://test.clinicaegos.com/wp-content/uploads/2023/11/Persona-31-2048x1368.webp",
                    "height": 1748,
                    "width": 1168
                }
            },
            "editor": {
                "@type": "Person",
                "name": "Clínica Egos",
                "description": "Clínica de medicina y cirugía estética en Barcelona con 50 años de reconocida trayectoria internacional e innovación. Clínica Egos es confianza y seguridad.",
                "url": "https://www.clinicaegos.com/blog/author/admin/",
                "sameAs": [
                    "https://www.clinicaegos.com/",
                    "admin"
                ],
                "image": {
                    "@type": "ImageObject",
                    "url": "https://test.clinicaegos.com/wp-content/uploads/2023/11/Persona-31-2048x1368.webp",
                    "height": 1748,
                    "width": 1168
                }
            },
            "publisher": {
                "@type": "Organization",
                "name": "Clínica EGOS",
                "url": "https://www.clinicaegos.com/",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://test.clinicaegos.com/wp-content/uploads/2023/12/logo-egos.svg",
                    "width": 1024,
                    "height": 1024
                }
            },
            "image": {
                "@type": "ImageObject",
                "inLanguage": "es",
                "url": post.value.featured_image_data.url,
                "contentUrl": post.value.featured_image_data.url,
                "height": post.value.featured_image_data.height,
                "width": post.value.featured_image_data.width,
                "caption": post.value.featured_image_data.alt,
            }
        };
    };

    return { generatePostData };
};

// {
//     "@context": "http://schema.org",
//     "@type": "BlogPosting",
//     "headline": "¿Cuánto duran los implantes de pecho?",
//     "url": "https://www.clinicaegos.com/blog/2021/09/14/duracion-implantes-pecho/",
//     "articleBody": "La duración de los implantes de pecho es una de las cuestiones que más preocupan a las pacientes de aumento mamario con prótesis. Existen muchos mitos alrededor de este tema, pero la clave...",
//     "datePublished": "2021-09-14",
//     "dateModified": "2024-05-08",
//     "author": {
//         "@type": "Person",
//         "name": "Clínica Egos",
//         "url": "https://www.clinicaegos.com/blog/author/admin/"
//     }
// };
