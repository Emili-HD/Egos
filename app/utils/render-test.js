import puppeteer from 'puppeteer';

// Define un array con las URLs de tu aplicación
const urls = [
    // 'http://localhost:3000',
    // 'http://localhost:3000/cirugia-de-pechos/',
    'http://localhost:3000/cirugia-de-pechos/aumento-de-pecho/',
    // 'http://localhost:3000/promocion/cirugia-de-pechos/',
    // 'http://localhost:3000/ubicacion/liposuccion-en-manresa/',
];

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= document.body.scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

async function captureScreenshots() {
    const browser = await puppeteer.launch({ headless: true });

    for (const url of urls) {
        const page = await browser.newPage();
        console.log(`Accediendo a: ${url}`);

        try {
            await page.goto(url, { waitUntil: 'networkidle2' });

            // Activa el desplazamiento automático para cargar imágenes con lazy loading
            // await autoScroll(page);

            const fileName = `screenshot-${url.replace(/https?:\/\//, '').replace(/\//g, '-')}.png`;
            await page.screenshot({ path: fileName, fullPage: true });
            console.log(`Captura completa guardada: ${fileName}`);
        } catch (error) {
            console.error(`Error accediendo a ${url}:`, error);
        } finally {
            await page.close();
        }
    }

    await browser.close();
    console.log('Capturas de pantalla completadas.');
}

(async () => {
    try {
        await captureScreenshots();
    } catch (error) {
        console.error('Error en el proceso:', error);
    } finally {
        console.log('Servidor de Nuxt detenido.');
    }
})();
