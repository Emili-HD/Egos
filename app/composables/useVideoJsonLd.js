// composables/useVideoJsonLd.js

export const useVideoJsonLd = async (videos = [], currentUrl = '') => {
    const videoJsonLd = [];
    const config = useRuntimeConfig();
    const apiKey = config.public.youtubeApiKey;

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
                console.error('No se encontraron detalles para este vídeo:', videoId);
                return null;
            }
        } catch (error) {
            console.error('Error al obtener los detalles del vídeo:', error);
            return null;
        }
    };

    for (const video of videos) {
        if (video && video.video) {
            const videoId = video.video.split('/').pop();
            const details = await fetchVideoDetails(videoId);
            if (details) {
                videoJsonLd.push({
                    "@type": "VideoObject",
                    ...details,
                    "contentUrl": currentUrl,
                    "publisher": {
                        "@type": "Organization",
                        "name": "@clinicaegos",
                    },
                });
            }
        }
    }

    return {
        "@context": "https://schema.org/",
        "@type": "ItemList",
        "itemListElement": videoJsonLd,
    };
};
