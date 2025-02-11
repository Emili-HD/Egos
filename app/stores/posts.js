import { defineStore } from 'pinia';
import { getPosts } from '@/composables/useApi';

export const usePostsStore = defineStore('posts', {
    state: () => ({
        posts: {}, // Objeto para almacenar posts por slug o ID
        allPosts: [], // Almacenar todos los posts
    }),
    actions: {
        // Obtener un post específico por slug
        async fetchPost(slug) {
            if (!slug) {
                console.error("⚠️ Se intentó obtener un post sin proporcionar un slug.");
                return null;
            }

            // Si el post ya está en cache, lo devolvemos
            if (this.posts[slug]) {
                console.log(`✅ Post "${slug}" obtenido desde caché.`);
                return this.posts[slug];
            }

            try {
                console.log(`🔍 Buscando post con slug: ${slug}`);
                const postArray = await getPosts({ slug });

                if (!postArray || postArray.length === 0) {
                    console.warn(`⚠️ No se encontró ningún post con el slug "${slug}".`);
                    return null;
                }

                // Asumimos que getPosts devuelve un array y tomamos el primer resultado
                const post = Array.isArray(postArray) ? postArray[0] : postArray;

                if (post) {
                    this.posts[slug] = post;
                    console.log(`✅ Post "${slug}" almacenado en caché.`);
                    return post;
                }

                console.error(`❌ No se pudo obtener el post con slug "${slug}".`);
                return null;
            } catch (error) {
                console.error(`🚨 Error al obtener el post "${slug}":`, error);
                return null;
            }
        },

        // Obtener todos los posts paginados
        async fetchAllPosts({ page = 1, perPage = 100 }) {
            try {
                console.log(`📢 Obteniendo todos los posts. Página: ${page}, Por página: ${perPage}`);
                const posts = await getPosts({ page, perPage });

                if (Array.isArray(posts) && posts.length > 0) {
                    this.allPosts = posts;
                    console.log(`✅ ${posts.length} posts almacenados.`);
                } else {
                    console.warn("⚠️ No se encontraron posts.");
                }
            } catch (error) {
                console.error('🚨 Error al obtener los posts:', error);
            }
        },

        // Obtener posts por categoría
        async fetchPostsByCategory(categoryId) {
            if (!categoryId) {
                console.warn("⚠️ Se intentó obtener posts sin proporcionar un ID de categoría.");
                return [];
            }

            try {
                console.log(`📢 Buscando posts en la categoría ${categoryId}`);
                const posts = await getPosts({ categoryId });

                if (Array.isArray(posts)) {
                    console.log(`✅ Se encontraron ${posts.length} posts en la categoría ${categoryId}.`);
                    return posts;
                } else {
                    console.warn(`⚠️ No se encontraron posts en la categoría ${categoryId}.`);
                    return [];
                }
            } catch (error) {
                console.error(`🚨 Error al obtener posts de la categoría ${categoryId}:`, error);
                return [];
            }
        },
    },
});
