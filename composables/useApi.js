// useApi.js
const DOMAIN_URL = 'https://test.clinicaegos.com';
const JSON_URL = `${DOMAIN_URL}/wp-json`;

// ***************************************************************************************************
// Función unificada para obtener una página por ID o slug
// ***************************************************************************************************

export const getPage = async (identifier) => {
    // Determina si el identificador es un slug (string) o un ID (number)
    const isSlug = isNaN(Number(identifier));
    const endpoint = isSlug ? `pages?slug=${identifier}` : `pages/${identifier}`;

    const url = `${JSON_URL}/wp/v2/${endpoint}`;
    
    try {
        const data = await $fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        // Si el identificador es un slug, la respuesta será un arreglo, así que devuelve el primer elemento
        return isSlug ? (data[0] || null) : (data || null);
    } catch (error) {
        console.error("Fetch error: ", error);
        return null; // Retorna null en caso de error para manejarlo en el uso de la función
    }
};

// ***************************************************************************************************
// Función unificada para obtener posts
// ***************************************************************************************************

export const getPosts = async ({ page = 1, perPage = 100, slug = null, categoryId = null } = {}) => {
    let endpoint = 'wp/v2/posts';
    let queryParameters = `?per_page=${perPage}&page=${page}`;

    if (slug) {
        // Si se proporciona un slug, obtén el post por slug
        queryParameters += `&slug=${slug}`;
    } else if (categoryId) {
        // Si se proporciona un categoryId, obtén los posts por categoría
        queryParameters += `&categories=${categoryId}`;
    }

    const url = `${JSON_URL}/${endpoint}${queryParameters}`;

    try {
        const data = await $fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        // Devuelve el primer elemento si se busca por slug, ya que es único
        return slug ? data[0] : data;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};


// ***************************************************************************************************
// Función unificada para obtener menús
// ***************************************************************************************************

export const getMenu = async (menuName) => {
    const url = `${JSON_URL}/menus/v1/menus/${menuName}`;

    try {
        const response = await $fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

export const getMenuTratamientos = async () => {
    const url = `${JSON_URL}/menus/v1/menu/?nombre=tratamientos`;

    try {
        const response = await $fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

// ***************************************************************************************************
// Función unificada para obtener clínicas por página o por slug
// ***************************************************************************************************

export const getClinicas = async ({ page = 1, perPage = 100, slug = null, id = null, ids = null } = {}) => {
    let endpoint = 'wp/v2/clinica';
    let queryParameters = `?per_page=${perPage}&page=${page}`;

    // Añade el slug o el id al parámetro de consulta si se proporciona
    if (slug) {
        queryParameters += `&slug=${slug}`;
    } else if (id) {
        queryParameters += `/${id}`;
    }

    const url = `${JSON_URL}/${endpoint}${queryParameters}`;

    try {
        const data = await $fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        // Si se proporcionan ids, filtra las clínicas por estos ids
        if (ids && ids.length > 0) {
            return data.filter(clinica => ids.includes(clinica.id));
        }

        // Devuelve el primer elemento si se busca por slug, ya que es único
        return slug ? data[0] : data;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

// ***************************************************************************************************
// Función unificada para obtener testimonios, categorías de testimonios, o un testimonio específico
// ***************************************************************************************************

export const getTestimonios = async ({ page = 1, perPage = 100, slug = null, categories = false } = {}) => {
    let endpoint = 'wp/v2';
    const timestamp = new Date().getTime();

    // Si se solicitan las categorías de testimonios
    if (categories) {
        endpoint += '/categoria-opinion';
    } else {
        // Para testimonios o un testimonio específico por slug
        endpoint += `/testimonio${slug ? `?slug=${slug}` : `?per_page=${perPage}&page=${page}&timestamp=${timestamp}`}`;
    }

    const url = `${JSON_URL}/${endpoint}`;

    try {
        const data = await $fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        // Devuelve el primer elemento si se busca por slug, ya que debería ser único
        return slug ? data[0] : data;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

export const getTestimoniosDestacados = async () => {
    let endpoint = 'custom/v1/testimonios-destacados';
    const url = `${JSON_URL}/${endpoint}`;

    try {
        const data = await $fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return data; // Devuelve todos los testimonios destacados
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};


// ***************************************************************************************************
// Función unificada para obtener noticias o una noticia específica
// ***************************************************************************************************

export const getNoticias = async ({ page = 1, perPage = 100, slug = null } = {}) => {
    let endpoint = 'wp/v2';
    const timestamp = new Date().getTime();

    endpoint += `/noticias${slug ? `?slug=${slug}` : `?per_page=${perPage}&page=${page}&timestamp=${timestamp}`}`;

    const url = `${JSON_URL}/${endpoint}`;

    try {
        const data = await $fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        // Devuelve el primer elemento si se busca por slug, ya que debería ser único
        return slug ? data[0] : data;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

// ***************************************************************************************************
// Función unificada para obtener tratamientos por ID o slug
// ***************************************************************************************************

export const getTratamiento = async ({ id = null, slug = null, getAll = false, perPage = 100 } = {}) => {
    if (!id && !slug && !getAll) {
        throw new Error("Debe proporcionar un ID, un slug o activar la opción 'getAll' para buscar un tratamiento.");
    }

    let endpoint = 'wp/v2/tratamiento';
    const timestamp = new Date().getTime();
    let queryParameters = '';

    if (id) {
        queryParameters = `/${id}`;
    } else if (slug) {
        queryParameters = `?slug=${slug}&timestamp=${timestamp}`;
    } else if (getAll) {
        queryParameters = `?per_page=${perPage}&timestamp=${timestamp}`;
    }

    const url = `${JSON_URL}/${endpoint}${queryParameters}`;

    try {
        const data = await $fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        return slug ? data[0] : data;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};


// ***************************************************************************************************
// Función para obtener especialidades
// ***************************************************************************************************

export const getEspecialidades = async () => {
    const url = `${JSON_URL}/wp/v2/especialidad`;

    try {
        const data = await $fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return data;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

// ***************************************************************************************************
// Función para obtener reseñas de doctores
// ***************************************************************************************************

export const getReviews = async ({ slug }) => {
    const page = 1;
    const perPage = 100;
    let url = `https://test.clinicaegos.com/wp-json/wp/v2/review?page=${page}&per_page=${perPage}`;

    // Si se proporciona un slug, añádelo a la URL como filtro
    if (slug) {
        url += `&publicar_en=${slug}`;
    }

    try {
        const data = await $fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return data;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

// ***************************************************************************************************
// Función para obtener miembros del equipo, con soporte para paginación
// ***************************************************************************************************

export const getEquipo = async ({ page = 1, perPage = 100, slug = null, id = null } = {}) => {
    let endpoint = 'wp/v2/doctor';
    const timestamp = new Date().getTime();
    let queryParameters = `?per_page=${perPage}&page=${page}&timestamp=${timestamp}`;

    if (slug) {
        queryParameters += `&slug=${slug}`;
    }

    // Construir la URL correcta
    const url = id ? `${JSON_URL}/${endpoint}/${id}?timestamp=${timestamp}` : `${JSON_URL}/${endpoint}${queryParameters}`;

    try {
        const data = await $fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        // Manejar la respuesta dependiendo del tipo de data
        if (id || slug) {
            // Si buscamos por id o slug, la API debería devolver un único objeto, no un array
            return Array.isArray(data) ? data[0] : data;
        } else {
            // Si no hay id ni slug, se espera que la API devuelva un array
            return data;
        }
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};



// ***************************************************************************************************
// Función para obtener una landing por slug
// ***************************************************************************************************

export const getLanding = async (slug) => {
    const url = `${JSON_URL}/wp/v2/landing?slug=${slug}`;

    try {
        const data = await $fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return data[0]; // Asume que el slug es único y devuelve el primer elemento
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};


// ***************************************************************************************************
// Función para obtener ajustes de Egos por nombre
// ***************************************************************************************************

export const egosSettings = async (name) => {
    const url = `${JSON_URL}/wp/v1/options/settings?name=${name}`;

    try {
        const data = await $fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return data;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};


// ***************************************************************************************************
// Función para obtener datos de TikTok
// ***************************************************************************************************

export const getTikTok = async () => {
    const url = 'https://data.accentapi.com/feed/25369355.json?no_cache=20240222180929';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error: ", error);
        return error; // Dependiendo de tu manejo de errores, podrías querer lanzar o retornar el error
    }
};
