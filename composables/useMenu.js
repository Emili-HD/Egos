import { ref, onMounted } from 'vue';
import { useFetch } from '#app';

export const useMenu = () => {
    const menuData = ref(null);
    const menuError = ref(null);

    const fetchMenu = async () => {
        const { data, error } = await useFetch(`${process.env.NUXT_API_WP_URL}/menus/v1/menus/${menuName}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        menuData.value = data.value;
        menuError.value = error.value;
    };

    onMounted(fetchMenu);

    return { menuData, menuError, fetchMenu };
};
