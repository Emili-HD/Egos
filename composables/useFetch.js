// useFetch.js
const DOMAIN_URL = 'https://test.clinicaegos.com';
const JSON_URL = `${DOMAIN_URL}/wp-json`;

// ***************************************************************************************************
// Función unificada para obtener una página por ID o slug
// ***************************************************************************************************

export const getPage = async (identifier) => {
    // Determina si el identificador es un slug (string) o un ID (number)
    const isSlug = isNaN(identifier);
    const endpoint = isSlug ? `pages?slug=${identifier}` : `pages/${identifier}`;

    const url = `${JSON_URL}/wp/v2/${endpoint}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            // Lanza un error con el estado de la respuesta para un manejo de errores más específico
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Si el identificador es un slug, la respuesta será un arreglo, así que devuelve el primer elemento
        return isSlug ? data[0] : data;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error; // Propaga el error para manejarlo más adelante
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
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

// ***************************************************************************************************
// Función unificada para obtener clínicas por página o por slug
// ***************************************************************************************************

export const getClinicas = async ({ page = 1, perPage = 100, slug = null } = {}) => {
    let endpoint = 'wp/v2/clinica';
    let queryParameters = `?per_page=${perPage}&page=${page}`;

    // Añade el slug al parámetro de consulta si se proporciona
    if (slug) {
        queryParameters += `&slug=${slug}`;
    }

    const url = `${JSON_URL}/${endpoint}${queryParameters}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            // Lanza un error si la respuesta no es exitosa
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
    // Si se solicitan las categorías de testimonios
    if (categories) {
        endpoint += '/categoria-opinion';
    } else {
        // Para testimonios o un testimonio específico por slug
        endpoint += `/testimonio${slug ? `?slug=${slug}` : `?per_page=${perPage}&page=${page}`}`;
    }

    const url = `${JSON_URL}/${endpoint}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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

export const getTratamiento = async ({ id = null, slug = null } = {}) => {
    if (!id && !slug) {
        throw new Error("Debe proporcionar un ID o un slug para buscar un tratamiento.");
    }

    let endpoint = 'wp/v2/tratamiento';
    let queryParameters = id ? `/${id}` : `?slug=${slug}`;

    const url = `${JSON_URL}/${endpoint}${queryParameters}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Devuelve el primer elemento si se busca por slug, ya que se espera que sea único
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
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

// ***************************************************************************************************
// Función para obtener miembros del equipo, con soporte para paginación
// ***************************************************************************************************

export const getEquipo = async ({ page = 1, perPage = 20, slug = null } = {}) => {
    let endpoint = 'wp/v2/doctor';
    let queryParameters = `?per_page=${perPage}&page=${page}`;

    if (slug) {
        queryParameters += `&slug=${slug}`;
    }

    const url = `${JSON_URL}/${endpoint}${queryParameters}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Devuelve el primer elemento si se busca por slug, ya que se espera que sea único
        return slug ? data[0] : data;
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
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
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