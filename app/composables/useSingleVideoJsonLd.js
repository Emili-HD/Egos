// composables/useSingleVideoJsonLd.js

export const useSingleVideoJsonLd = async (videoUrl, currentUrl) => {
    const config = useRuntimeConfig();
    const apiKey = config.public.youtubeApiKey;

    // Extrae el ID del video de YouTube
    const videoId = videoUrl.split('/').pop();

    if (!videoId) {
        console.error('No se pudo extraer el ID del video de la URL:', videoUrl);
        return null;
    }

    // Llama a la API de YouTube para obtener detalles del video
    const fetchVideoDetails = async (videoId) => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`
            );
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                const video = data.items[0];
                return {
                    name: video.snippet.title,
                    description: video.snippet.description,
                    uploadDate: video.snippet.publishedAt,
                    thumbnailUrl: video.snippet.thumbnails.high.url,
                    duration: video.contentDetails.duration,
                    embedUrl: `https://www.youtube.com/embed/${videoId}`,
                };
            } else {
                console.error('No se encontraron detalles para este video:', videoId);
                return null;
            }
        } catch (error) {
            console.error('Error al obtener los detalles del video:', error);
            return null;
        }
    };

    const videoDetails = await fetchVideoDetails(videoId);

    if (!videoDetails) {
        return null;
    }

    return {
        "@context": "https://schema.org/",
        "@type": "VideoObject",
        ...videoDetails,
        "contentUrl": currentUrl,
        "publisher": {
            "@type": "Organization",
            "name": "@clinicaegos",
        },
    };
};
