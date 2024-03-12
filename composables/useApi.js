import axios from 'axios';
import axiosRetry from 'axios-retry';

const DOMAIN_URL = 'https://test.clinicaegos.com';
const JSON_URL = DOMAIN_URL + '/wp-json';

const apiClient = axios.create({
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// Configurar axios-retry en la instancia apiClient
axiosRetry(apiClient, {
    retries: 3, // Número de veces que se reintentará la solicitud
    retryDelay: (retryCount) => {
        return retryCount * 1000; // Tiempo en milisegundos antes de reintentar la solicitud
    },
    // Por defecto, solo reintentará en caso de errores de red o 5xx.
    retryCondition: (error) => axiosRetry.isRetryableError(error),
});

apiClient
    .get(JSON_URL)
    .then((response) => {
        // Procesa la respuesta aquí
    })
    .catch((error) => console.log(error));

export const getPosts = (page = 1, perPage = 10) => {
    const url = `${JSON_URL}/wp/v2/posts`;
    const params = {
        per_page: perPage,
        page: page,
    };

    // Usa apiClient para las solicitudes para aprovechar axios-retry
    return apiClient.get(url, { params });
};

// Recoger POSTS
export const getSinglePostBySlug = (slug) => {
    return apiClient.get(`${JSON_URL}/wp/v2/posts?slug=${slug}`)
}

export const getPostByCategoryId = (id) => {
    return apiClient.get(`${JSON_URL}/wp/v2/posts?categories=${id}`)
}

// Recoger Clínicas
export const getClinicas = (page = 1, perPage = 20) => {
    const url = `${JSON_URL}/wp/v2/clinica`
    const params = {
        per_page: perPage,
        page: page,
    }

    return axios.get(url, { params })
}


export const menuTratamientos = () => {
        return apiClient.get(`${JSON_URL}/menus/v1/menus/tratamientos`);
};

export const getSingleClinicaBySlug = (slug) => {
    return apiClient.get(`${JSON_URL}/wp/v2/clinica?slug=${slug}`)
}

// Recoger testimonios
export const getTestimonios = (page = 1, perPage = 20) => {
    const url = `${JSON_URL}/wp/v2/testimonio`
    const params = {
        per_page: perPage,
        page: page,
    }

    return axios.get(url, { params })
}

export const getTestimoniosCategories = () => {
    return apiClient.get(`${JSON_URL}/wp/v2/categoria-opinion`)
}
export const getSingleTestimonioBySlug = (slug) => {
    return apiClient.get(`${JSON_URL}/wp/v2/testimonio?slug=${slug}`)
}

export const getPages = () => {
    return apiClient.get(`${JSON_URL}/wp/v2/pages`)
}

export const getSinglePage = (id) => {
    return apiClient.get(`${JSON_URL}/wp/v2/pages/${id}`)
}

export const getSinglePageBySlug = (slug) => {
    return apiClient.get(`${JSON_URL}/wp/v2/pages?slug=${slug}`)
}

export const getEspecialidades = () => {
    return apiClient.get(`${JSON_URL}/wp/v2/especialidad`)
}

// Recoger Miembros del equipo
export const getEquipo = (page = 1, perPage = 20) => {
    return apiClient.get(
        `${JSON_URL}/wp/v2/doctor?page=${page}&per_page=${perPage}`,
    )
}

export const getSingleDoctorBySlug = (slug) => {
    return apiClient.get(`${JSON_URL}/wp/v2/doctor?slug=${slug}`)
}

// Recoger Tratamientos
export const getSingleTratamientoBySlug = (slug) => {
    return apiClient.get(`${JSON_URL}/wp/v2/tratamiento?slug=${slug}`)
}

export const getSingleTratamientoById = (id) => {
    return apiClient.get(`${JSON_URL}/wp/v2/tratamiento/${id}`)
}

// Recoger Landings
export const getLanding = (slug) => {
    return apiClient.get(`${JSON_URL}/wp/v2/landing?slug=${slug}`)
}

// Recoger Footer
export const getFooter = () => {
    return apiClient.get(`${JSON_URL}/wp/v2/widgets`)
}

export const egosSettings = (name) => {
    return apiClient.get(`${JSON_URL}/wp/v1/options/settings?name=${name}`)
}

// Recoger Imágenes y vídeos
export const getMedia = async (mediaId) => {
    try {
        const response = await apiClient.get(`${JSON_URL}/media/${mediaId}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const tiktok = {
    async getTikTok() {
        let url =
            'https://data.accentapi.com/feed/25369355.json?no_cache=20240222180929'

        let resp = await axios
            .get(url)
            .then((res) => res.data)
            .catch((error) => error)

        return resp
    },
}

export const menuPrincipal = {
    async getMenuPrincipal() {
        let url = JSON_URL + '/menus/v1/menus/menu-principal'

        let resp = await axios
            .get(url)
            .then((res) => res.data)
            .catch((error) => error)

        return resp
    },
}

export const menuSocial = {
    async getMenuSocial() {
        let url = JSON_URL + '/menus/v1/menus/social'

        let resp = await axios
            .get(url)
            .then((res) => res.data)
            .catch((error) => error)

        return resp
    },
}

export const menuLegal = {
    async getMenuLegal() {
        let url = JSON_URL + '/menus/v1/menus/textos-legales'

        let resp = await axios
            .get(url)
            .then((res) => res.data)
            .catch((error) => error)

        return resp
    },
}

export const menuFooter = {
    async getMenuFooter() {
        let url = JSON_URL + '/menus/v1/menus/menu-footer'

        let resp = await axios
            .get(url)
            .then((res) => res.data)
            .catch((error) => error)

        return resp
    },
}
